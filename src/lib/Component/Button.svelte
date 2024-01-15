<script lang="ts">
    export let name = "btn name";
    export let loader = false;
    export let loader_name = "loader name";
    export let style = "p-2 bg-[#00B500] text-white rounded-lg";

</script>

<button class="{style} w-full transition-all active:bg-opacity-50 {loader ? "cursor-progress" : ""}"
disabled={loader}
on:click
>
    {#if loader}
        <div class="flex items-center gap-2 justify-center">
            <p>{loader_name}</p>
            <div class="w-4 h-4 border-2 rounded-full border-b-green-500 animate-spin"></div>
        </div>
    {:else}
        <p>{name}</p>
    {/if}
</button>

