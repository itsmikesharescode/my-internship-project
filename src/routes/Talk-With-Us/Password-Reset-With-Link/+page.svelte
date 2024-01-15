<script lang="ts">
	import { enhance } from "$app/forms";
    import Button from "$lib/Component/Button.svelte";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import type { SubmitFunction } from "@sveltejs/kit";
    import { fly } from "svelte/transition";

    import annapIcon from "$lib/Images/Nav/annapIcon.webp";
	import { goto } from "$app/navigation";

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

    const dsComp = {
        loader: false,
    }

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;

        return async ({result, update}) =>
        {
            const {status, data:{msg} } = result as {status: number, type: string, data:{msg: string}};

            if(status === 402){
                createToast(msg, true);
                dsComp.loader = false;
            }else if(status === 200){
                createToast(msg, false);
                dsComp.loader = false;
                goto("/Talk-With-Us/Login");
            }

            update();
        }
    }

</script>

<div class="flex flex-col mt-[20vh] p-4 text-black" in:fly={{x:-100, duration: 500}}>
    <img loading="lazy" src={annapIcon} alt="" class="w-[100px] mx-auto" />
    <h2 class="h2 text-center">Update Password</h2>
    <small class="text-center opacity-50">Password Recovery Solution for Annapolis Finance</small>
    
    <div class="sm:max-w-xl flex flex-col gap-2 mx-auto">
        <small class="text-orange-500 text-center">Note: Reloading this page may lose your chance updating your password.</small>
        <form method="POST" use:enhance={submitFunc} class="flex flex-col gap-2">
            <label>
                <small>New Password:</small>
                <input name="newPws" type="password" class="input rounded-lg" />
            </label>

            <label>
                <small>Confirm New Password:</small>
                <input name="confirmNewPws" type="password" class="input rounded-lg" />
            </label>

            <div class="mt-2">
                <Button  name="Update Password" loader={dsComp.loader} loader_name="Updating."/>
            </div>
        </form>

    </div>
</div> 