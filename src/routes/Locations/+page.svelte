<script lang="ts">
	import { goto } from "$app/navigation";
	import { activeItem, branches, sessionStore } from "$lib";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData;

    onMount( async () => {
        $activeItem = "/Locations";
        
        if(data.status === 402){
            $branches = data.data;
        }else if(data.status === 200){
            $branches = data.data;
        }
    })


</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Locations</title>
</svelte:head>

<div class="text-black p-2 mx-auto sm:max-w-[80%] flex flex-col gap-5 min-h-screen">

    {#if $sessionStore?.user.user_metadata.whoareyou === "admin"}
        <p class="p-2 ">Go to <a href="/Locations/Admin" class="underline text-blue-500 transition-all hover:text-red-500">/Locations/Admin</a></p>
    {/if}
    
    <h3 class="h3 text-center mt-5">Browse to Annapolis Finance Inc. Locations</h3>

    {#each $branches ?? [] as branch}
        
    <a href="/Locations/{branch.branch_url}" class="w-full card p-4 text-left flex flex-col gap-2 rounded-xl transition-all hover:shadow-sm hover:shadow-black active:scale-95 
        "
        title="Navigate to {branch.branch_row_one_header_name}"
        >
            <h4 class="h4">{branch.branch_row_one_header_name}</h4>
            <div class="flex flex-col h-full justify-center">
                <p>
                    {branch.branch_address}
                </p>
            </div>
        </a>
        
    {/each}
    
</div>