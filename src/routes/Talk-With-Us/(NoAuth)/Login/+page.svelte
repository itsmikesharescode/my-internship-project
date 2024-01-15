<script lang="ts">

	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
    import fb from "$lib/Images/NoAuth/fb.svg";
    import google from "$lib/Images/NoAuth/google.svg";
    import twitter from "$lib/Images/NoAuth/twitter.svg";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { fly, scale } from "svelte/transition";
    import { onMount, tick } from "svelte";
    import Button from "$lib/Component/Button.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";
	import type { Session } from "@supabase/supabase-js";
	import { sessionStore } from "$lib";


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

    const signInwith = [{name: "Twitter", img: twitter}, {name: "Google", img: google}, {name: "Facebook", img:fb}];

    const dsComp = {
        loader: false,
    }

    const submitFunc: SubmitFunction = async () =>
    {   
        dsComp.loader = true;
        return async ({result, update}) =>
        {
            
            const {status, data:{msg, session}} = result as {status: number, type: string, data:{msg: string, session: Session | null}};

            if(status === 402){
                createToast(msg, true);
                dsComp.loader = false;
            }else if(status === 200){
                $sessionStore = session;
                createToast(msg, false);
                dsComp.loader = false;
                goto("/Talk-With-Us/User");
            }

            update();
            

        }
    }

</script>
<svelte:head>
	<title>Annapolis Finance Inc. - Login Chat System</title>
</svelte:head>

<div class="flex flex-col sm:max-w-xs mx-auto" in:fly={{x:-100, duration: 500}}>
    
    <h2 class="h2 text-center">Login</h2>
    <small class="text-center opacity-50">Login to Annapolis Finance</small>
    
    <div class="sm:max-w-xl flex flex-col gap-2">
        
        <form method="POST" use:enhance={submitFunc} class="flex flex-col gap-2">
            <label>
                <small>Email:</small>
                <input name="email" type="email" class="input rounded-lg" />
            </label>
    
            <label>
                <small>Password:</small>
                <input name="password" type="password" class="input rounded-lg" />
            </label>
    
            <div class="mt-2">
                <Button loader={dsComp.loader} loader_name="Logging." name="Sign in" />
            </div>
        </form>
       

        <div class="text-center mt-2">
            <a title="Forgot your password? you can recover it via email in this link. " href="/Talk-With-Us/Forgot-Password" class="underline text-blue-500">Forgot password?</a>
        </div>

        <div class="mt-5 flex flex-col gap-2">
            <p class="text-center">Or sign in with</p>

            {#each signInwith as values }
                <button class="flex gap-2 justify-center items-center w-full bg-slate-300 border-blue-500 text-blue-500 p-2 rounded-lg transition-all hover:shadow-sm hover:shadow-black active:scale-95"
                on:click={() => alert( `${values.name} Login comming soon! for now create your account.`)}
                >
                    <img loading="lazy" src={values.img} alt="" class="w-4" />
                    {values.name}
                </button>
            {/each}
            
            <p class="mt-5 text-center">New to Annapolis Finance? <a title="Don't have an account yet? come join us sign up / register in this link." href="/Talk-With-Us/SignUp" class="text-blue-500 underline"> Sign up here</a></p>
        </div>
    </div>
</div> 