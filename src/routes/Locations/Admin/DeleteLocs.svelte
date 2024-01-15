<script lang="ts">
	import { branches, supabaseStore } from "$lib";
	import Button from "$lib/Component/Button.svelte";
	import type { Branches } from "$lib/types";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

    const toastStore = getToastStore();

    const createToast = (msg: string, hasErr: boolean) =>
    {
        const t: ToastSettings = {
            message: `
                <p class="${hasErr ? "text-red-500" : "text-[#00B500]"}"><b>${hasErr ? "There is a problem" : "Success"}</b></p>
                <small>${msg}</small>
            
            `,
            background: "bg-white"
        };
        toastStore.trigger(t);
    }

    export let branch: Branches;

    const dsComp = {
        loader: false,
    }

    const handleDelete = async () => 
    {
        dsComp.loader = true;

        const {data, error:err} = await $supabaseStore.storage.from("annapolis_bucket").remove([`branch/${branch.uid}`]);

        if(data){
            const {error:inErr} = await $supabaseStore.from("branch_tb").delete().eq("uid", branch.uid);
            if(inErr){
                createToast(inErr.message, true);
                dsComp.loader = false;
            }else{
                const {data:bData, error:bErr} = await $supabaseStore.from("branch_tb").select("*");
                if(bData){
                    $branches = bData;
                    createToast(`Location ${branch.branch_row_one_header_name} successfully deleted.`, false);
                    dsComp.loader = false;
                }
            }

        }else if(err){
            createToast(err.message, true);
            dsComp.loader = false;
        }

    }

</script>

<div class="">
    <Button style="px-2 bg-red-500 text-white rounded-lg" loader={dsComp.loader} loader_name="Deleting Evidence" name="Delete" on:click={handleDelete} />
</div>