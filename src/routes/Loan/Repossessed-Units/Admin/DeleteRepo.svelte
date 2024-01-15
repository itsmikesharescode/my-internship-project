<script lang="ts">
	import { repos, supabaseStore } from "$lib";
    import Button from "$lib/Component/Button.svelte";
	import type { Repos } from "$lib/types";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

    const toastStore = getToastStore();

    let loader = false;

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

    export let repo: Repos;

    

    const deleteProfile = async () =>
    {
        loader = true;
        const {data, error:err} = await $supabaseStore.storage.from("annapolis_bucket").remove([`repos/${repo.uid}`]);
        if(data){
            console.log(data);
            const { error:inErr } = await $supabaseStore.from("repo_tb").delete().eq("uid", repo.uid);
            if(!inErr){
                const {data:sData, error:sErr} = await $supabaseStore.from("repo_tb").select("*");
                if(sData){
                    $repos = sData;
                    createToast(`${repo.unit_name} profile has been deleted.`, false);
                    loader = false;
                }else if(sErr){
                    createToast(sErr.message, true);
                    loader = false;
                }

                
            }

        }else if(err){
            createToast(err.message, true);
        }
    }

</script>

<Button {loader} loader_name="Deleting" style="bg-red-500 p-2 rounded-lg text-white" name="Delete" on:click={deleteProfile}/>   