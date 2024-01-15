<script lang="ts">
    import { page } from "$app/stores";
	import { activeItem } from "$lib";

	import { onMount } from "svelte";

    onMount(() => $activeItem = "/")
   
</script>

<div class="min-h-screen flex flex-col gap-5 items-center justify-center">
    
    {#if $page.url.pathname.startsWith("/Talk-With-Us")}
        <p class="text-center">Why reloading? you don't have to! <a href="/Talk-With-Us/Login" class="text-blue-500 underline">Go back</a></p>
    {:else}
    <h1 class="h1 text-red-500">Error Page not found</h1>
        <p class="text-center">It seems the page you visiting is not available in Annapolis Finance Inc. index. <a href="/" class="text-blue-500 underline">Go back</a></p>
    {/if}
</div>