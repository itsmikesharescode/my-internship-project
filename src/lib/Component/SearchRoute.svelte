<script lang="ts">
    import searchIcon from "$lib/Images/Nav/search.svg";
    import docIcon from "$lib/Images/Nav/document.svg";
	import { showSeachRoute } from "$lib";
	import { fly, scale } from "svelte/transition";

    import { createSearchStore, searchHandler, websiteStore} from "$lib";
	import type { WebPages } from "$lib/types";
	import { onDestroy, onMount } from "svelte";

	const searchPattern: WebPages[] = websiteStore.map( (item) => ({...item, searchPattern: `${item.title} ${item.url} ${item.content} ${item.documentInfo}`}));
	
	const searchStore = createSearchStore(searchPattern);

	const unsubscribe = searchStore.subscribe( (model) => searchHandler(model));

	
    onDestroy(() => unsubscribe());
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed left-0 right-0 top-0 bottom-0 bg-[#000000b3] min-h-screen p-2 z-10"

on:keydown={()=>{}}
on:click|self={() => showSeachRoute.set(false)}
>
    <div class=" bg-[#425181] mt-[10vh] sm:max-w-2xl mx-auto " in:fly={{x:-600, duration:500}} out:fly={{x:600, duration:500}}>
        <div class="flex items-center bg-[#425181] border-b-2 ">
            <img loading="lazy" src={searchIcon} alt="" class="w-10 p-2" />
            <input title="Search any terms you like" type="search" class="text-base input bg-[#425181] border-none " placeholder="Search any terms" bind:value={$searchStore.search}
            />
            
        </div>

        <!--Search results here-->
        <div class="min-h-[50vh] max-h-[60vh] sm:max-h-[60vh] overflow-auto p-2">

            {#each $searchStore.filtered as data }
                <div title="Search result" class="p-2 flex flex-col gap-2 bg-slate-500 rounded-xl mt-2">
                    <a title="Goto {data.title} With directory of {data.url}" href={data.url} class="flex gap-2 underline max-w-fit transition-all hover:text-red-500 active:scale-95"
                    on:click={() => showSeachRoute.set(false)}
                    >
                        <img loading="lazy" src={docIcon} alt="" class="w-6" />
                        <p>{data.title}</p>
                    </a>
        
                    <small title="Route Details" class="p-2">{data.documentInfo}</small>
                </div>
            {/each}   

            {#if !$searchStore.filtered.length}
                <div class="flex flex-col justify-center items-center h-[50vh]" in:scale>
                    <p>No records found</p>
                    <small class="text-center">Found bugs? directy mail me at <a title="Thatzz ma email!!!" href="mailto:eviotamikejohnb@gmail.com" class="text-blue-500 underline">eviotamikejohnb@gmail.com</a></small>
                </div>
            {/if}
        </div>

        <div class="p-2 border-t-2 hidden lg:block">
            <p class="text-center">Press <b class="px-2 border-[0.1rem] rounded-lg shadow-white shadow-sm">Esc</b> to close</p>
        </div>
    </div>
    
</div>

<style>

::placeholder {
    color: rgba(255, 255, 255, 0.748);
    opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12 -18 */
    color: rgba(255, 255, 255, 0.748);
}

</style>