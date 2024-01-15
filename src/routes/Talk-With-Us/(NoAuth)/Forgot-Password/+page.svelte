<script lang="ts">
    import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { fly } from "svelte/transition";
    import Button from "$lib/Component/Button.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";


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
        email: "",
    }

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;
        return async ({update, result}) =>
        {
            const {status, data:{msg}} = result as {status: number, type: string, data:{msg: string}};
            if(status === 402){
                createToast(msg, true);
                dsComp.loader = false;
            }else if(status === 200){
                createToast(msg, false);
                dsComp.loader = false;
            }

            update();
        }
    }
   

</script>
<svelte:head>
	<title>Annapolis Finance Inc. - Forgot Password Chat System</title>
</svelte:head>

<div class="flex flex-col gap-2 sm:max-w-xs mx-auto" in:fly={{x:-100, duration: 500}}>
    
    <h2 class="h2 text-center">Forgot Password</h2>
    <small class="text-center opacity-50">Recover Password to Annapolis Finance</small>
    
    <div class=" flex flex-col gap-2 sm:max-w-xs mx-auto">
        <small class="text-orange-500 text-center">An email containing a password reset link will be sent to your email.</small>
        
        <form method="POST" use:enhance={submitFunc} class="flex flex-col gap-2">
            <label>
                <small>Email:</small>
                <input name="email" type="email" class="input rounded-lg" bind:value={dsComp.email}/>
            </label>

            <div class="mt-2">
                <Button  name="Send Reset Link" loader={dsComp.loader} loader_name="Sending."/>
            </div>
        </form>
       
        <p class="mt-5 text-center">Already recovered? <a title="Already recovered? you can log in / sign in, in this link." href="/Talk-With-Us/Login" class="text-blue-500 underline"> Sign in here</a></p>

    </div>
</div> 