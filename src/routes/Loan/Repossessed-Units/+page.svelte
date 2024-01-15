<script lang="ts">
	import { activeItem, repos, searchRepos, sessionStore } from "$lib";
	import { onMount } from "svelte";
	import ConditionRate from "./ConditionRate.svelte";
	import Button from "$lib/Component/Button.svelte";
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Repos } from "$lib/types";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

    const toastStore = getToastStore();

    const createToast = (msg: string, hasErr: boolean) =>
    {
        const t: ToastSettings = {
            message: `
                <p class="${hasErr ? "text-red-500" : "text-[#00B500]"}"><b>${hasErr ? "Problem Searching Database" : "Success"}</b></p>
                <small>${msg}</small>
            
            `,
            background: "bg-white"
        };
        toastStore.trigger(t);
    }


    export let data: PageServerData;

    const dsComp = {
        loader: false,
        searchVal: "",
    }


    onMount( () => {
        $activeItem = "/Loan";
        if(data.status === 200){
            $repos = data.data;
        }else if (data.status === 402){
            $repos = data.data;
        }

    });

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;

        return async ({result, update}) =>
        {
            const {status, data} = result as {status: number, type: string, data:{msg: string, data: Repos[] | null}}
            
            if(status === 200){
                if(data.data?.length === 0){
                    createToast(`No records for ${dsComp.searchVal}.`, true);
                    dsComp.loader = false;
                }else{
                    $searchRepos = data.data;
                    dsComp.loader = false;
                }                
            }else if(status === 402){
                createToast(data.msg, true);
                dsComp.loader = false;
            }

            update();
        }
    }

    const detectInputs = () => dsComp.searchVal.trim().length === 0 ? $searchRepos = null : "";
   
    
</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Repossessed Units</title>
</svelte:head>

<div class="p-2 text-black sm:max-w-[80%] mx-auto min-h-screen">
    <div class="flex flex-col p-5">
        <p class="p-2 ">Back to <a href="/Loan" class="underline text-blue-500 transition-all hover:text-red-500">/Loan</a></p>
        {#if $sessionStore?.user.user_metadata.whoareyou === "admin"}
            <p class="p-2 ">Go to <a href="/Loan/Repossessed-Units/Admin" class="underline text-blue-500 transition-all hover:text-red-500">/Loan/Repossessed-Units/Admin</a></p>
        {/if}
    </div>

    <h1 class="h1 text-center p-4">Repossessed Units</h1>
    <div class="flex flex-col">
        <form method="POST" use:enhance={submitFunc} class="flex flex-col">
            <input on:keyup={detectInputs} name="search" type="search" class="input rounded-xl sm:max-w-xl mx-auto" placeholder="Search by unit name" bind:value={dsComp.searchVal} />
        </form>
    </div>

    <div class="flex flex-col gap-2 sm:flex-row justify-center flex-wrap mt-10">

        {#if dsComp.loader}
            <div class="flex items-center gap-2 justify-center">
                <p>Searching for {dsComp.searchVal}..</p>
                <div class="w-4 h-4 border-2 border-b-black rounded-full animate-spin"></div>
            </div>
        {:else}
            {#each $searchRepos ?? $repos ?? [] as repo }
                <div class="p-4 bg-slate-100 rounded-xl">
                    <img loading="lazy" src={repo.unit_img} alt="" class="w-[400px] h-[300px] rounded-lg" />
                    <div class="p-2 flex flex-col gap-2">
                        <p class="font-bold">Name: {repo.unit_name}</p>
                        <p class="font-bold">Contact Number: {repo.seller_contact_num}</p>
                        <ConditionRate condition={repo.unit_condition}/>
                    </div>

                    <div class="mt-5 flex gap-2">
                        <Button name="Buy Now"/>
                        <Button style="bg-blue-500 p-2 rounded-lg text-white" name="Contact"/>
                    </div>
                </div>
            {/each}
        {/if}
        
    </div>
</div>