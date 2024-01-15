<script lang="ts">
	import { activeItem } from "$lib";
    import annapolIcon from "$lib/Images/Nav/annapIcon.webp";
	import { onMount } from "svelte";

    onMount( () => $activeItem = "/Talk-With-Us/Login");

</script>

<div class="p-4 flex flex-col gap-2 text-black">
    
    <div class="mt-[10vh]">
        <img loading="lazy" src={annapolIcon} alt="" class="mx-auto w-[150px]" />
    </div>

    <div class="">
        <slot />
    </div>

</div>