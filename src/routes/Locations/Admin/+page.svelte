<script lang="ts">
	import { branches, showLocUpload } from "$lib";
	import Button from "$lib/Component/Button.svelte";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
	import UploadLocs from "./UploadLocs.svelte";
	import DeleteLocs from "./DeleteLocs.svelte";

    export let data: PageServerData;

    onMount( async () => {
        if(data.status === 402){
            $branches = data.data;
            
        }else if(data.status === 200){
            $branches = data.data;
        }
    })
</script>

<div class="mx-auto sm:max-w-[80%] text-black flex flex-col gap-10 p-4">
    <p class="p-2 ">Go back to <a href="/Locations" class="underline text-blue-500 transition-all hover:text-red-500">/Locations</a></p>

    <div class=" flex flex-col gap-2">

        <h1 class="h1 text-center">Upload Locations</h1>
        <p class="text-center font-bold text-red-500">Only admin can access this page accessing this page without proper permission is punishable by law under <a target="_blank" href="https://www.officialgazette.gov.ph/2012/09/12/republic-act-no-10175/" class="text-blue-500 underline">Cybercrime Prevention Act of 2012</a></p>
        
        
        <div class="mx-auto sm:max-w-xl">
            <Button name="Upload Locations" on:click={() => showLocUpload.set(true)}/>
        </div>

        {#if $showLocUpload}
            <UploadLocs />
        {/if}
    
    </div>

    <div class="flex flex-col gap-2">
        {#each $branches ?? [] as branch}
        
            <div class="w-full card p-4 text-left gap-2 rounded-xl shadow-sm break-words">
                
                <div class="flex justify-end">
                    <DeleteLocs {branch}/>
                </div>
                
                <div class="p-2 flex flex-col">
                    <h6 class="h6 ">{branch.branch_row_one_header_name}</h6>
                    <small>{branch.branch_address}</small>

                    <small><a href="/Locations/{branch.branch_url}" class="underline text-blue-500">Visit the branch</a></small>
                </div>
            </div>
            
        {/each}

        <small class="text-center text-red-500">Notice: This webpage are still in experimental stage but it is working already and ready to use. Huge or minor changes will not interfere the main functionality of this page. -Mikey</small>
    </div>
</div>