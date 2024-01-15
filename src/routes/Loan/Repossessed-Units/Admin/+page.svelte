<script lang="ts">
	import { activeItem, repos, searchRepos, sessionStore, showUpdate, showUpload } from "$lib";
	import { onMount } from "svelte";
	import ConditionRate from "../ConditionRate.svelte";
	import Button from "$lib/Component/Button.svelte";
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Repos } from "$lib/types";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import UploadRepo from "./UploadRepo.svelte";
	import UpdateRepo from "./UpdateRepo.svelte";
	import DeleteRepo from "./DeleteRepo.svelte";

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


    export let data: PageServerData ;
    

    const dsComp = {
        loader: false,
        searchVal: "",
        searchRepos:<Repos[] | null> null
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
                    dsComp.searchRepos = data.data;
                    dsComp.loader = false;
                }                
            }else if(status === 402){
                createToast(data.msg, true);
                dsComp.loader = false;
            }

            update();
        }
    }

    const detectInputs = () => dsComp.searchVal.trim().length === 0 ? dsComp.searchRepos = null : "";
   
    
</script>

<div class="p-2 text-black sm:max-w-[80%] mx-auto min-h-screen">
    <div class="flex flex-col p-5">
        <p class="p-2 ">Back to <a href="/Loan/Repossessed-Units" class="underline text-blue-500 transition-all hover:text-red-500">/Loan/Repossessed-Units</a></p>
        
    </div>

    <div class="mx-auto sm:max-w-xl flex flex-col items-center gap-4 p-5">
        <small class="text-red-500">Notice: Only Admins can access this page!</small>
        <h1 class="h1">Repossessed Units</h1>
        <p class="font-bold">For Admins</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-2 sm:max-w-xl mx-auto items-center ">
        <form method="POST" use:enhance={submitFunc} class="flex flex-col w-full">
            <input on:change={detectInputs} on:keyup={detectInputs} name="search" type="search" class="input rounded-xl" placeholder="Search by unit name" bind:value={dsComp.searchVal} />
        </form>

        <!--UPDATE UI HERE-->
        {#if $showUpload}
            <UploadRepo />
        {/if}
        
        <div class="w-[25%]">
            <Button name="Upload" on:click={() => showUpload.set(true)}/>
        </div>
    </div>

    <div class="flex flex-col gap-2 sm:flex-row justify-center flex-wrap mt-10">

        {#if dsComp.loader}
            <div class="flex items-center gap-2 justify-center">
                <p>Searching for {dsComp.searchVal}..</p>
                <div class="w-4 h-4 border-2 border-b-black rounded-full animate-spin"></div>
            </div>
        {:else}
            {#each dsComp.searchRepos ?? $repos ?? [] as repo, index }
                <div class="p-4 bg-slate-100 rounded-xl">
                    <img loading="lazy" src={repo.unit_img} alt="" class="w-[400px] h-[300px] rounded-lg" />
                    <div class="p-2 flex flex-col gap-2">
                        <p class="font-bold">Name: {repo.unit_name}</p>
                        <p class="font-bold">Contact Number: {repo.seller_contact_num}</p>
                        <ConditionRate condition={repo.unit_condition}/>
                    </div>


                    <!--Update UI-->
                    {#if $showUpdate === index}
                        <UpdateRepo {repo}/>
                    {/if}

                    <div class="mt-5 flex gap-2">                      
                        <Button name="Update" on:click={() => $showUpdate = index}/>
                        <DeleteRepo {repo} />           
                    </div>
                </div>
            {/each}
        {/if}
        
    </div>
</div>