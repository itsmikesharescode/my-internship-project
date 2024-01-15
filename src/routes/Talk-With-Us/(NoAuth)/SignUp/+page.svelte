<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Button from "$lib/Component/Button.svelte";
    import checkIcon from "$lib/Images/NoAuth/check.svg";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { fly } from "svelte/transition";


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
        domMsg: "",
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        password: "",
        confirmPassword: "",
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
                dsComp.domMsg = msg;
                dsComp.loader = false;
            }

            update();
        }
    }

</script>

<div class="flex flex-col sm:max-w-xs mx-auto" in:fly={{x:-100, duration: 500}}>

    <h2 class="h2 text-center">Register</h2>
    <small class="text-center opacity-50">Sign up to Annapolis Finance</small>
    <small class="text-center text-red-500">{@html dsComp.domMsg}</small>
    <form method="POST" use:enhance={submitFunc} class="flex flex-col gap-2">
        <label>
            <small>Email: </small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.email.includes("@") && dsComp.email.includes(".") ? "block": "hidden"}" />
                <input name="email" type="text" class=" input rounded-lg {dsComp.email.includes("@") && dsComp.email.includes(".") ? "bg-white": ""} " bind:value={dsComp.email}/>
            </div>
        </label>

        <label>
            <small>First Name: </small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.firstName.trim().length > 1 ? "block": "hidden"}" />
                <input name="firstName" type="text" class=" input rounded-lg {dsComp.firstName.trim().length > 1 ? "bg-white": ""} " bind:value={dsComp.firstName}/>
            </div>
        </label>

        <label>
            <small>Middle Name:</small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.middleName.trim().length > 1 ? "block": "hidden"}" />
                <input name="middleName" type="text" class="input rounded-lg {dsComp.middleName.trim().length > 1 ? "bg-white": ""} " bind:value={dsComp.middleName}/>
            </div>
        </label>

        <label>
            <small>Last Name:</small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.lastName.trim().length > 1 ? "block": "hidden"}" />
                <input name="lastName" type="text" class="input rounded-lg {dsComp.lastName.trim().length > 1 ? "bg-white": ""} " bind:value={dsComp.lastName}/>
            </div>
        </label>

        <label>
            <small>Address:</small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.address.trim().length > 4 ? "block": "hidden"}" />
                <input name="address" type="text" class="input rounded-lg {dsComp.address.trim().length > 4 ? "bg-white": ""}" bind:value={dsComp.address}/>
            </div>
        </label>

        <label>
            <small>Password:</small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.password.trim().length > 5 ? "block": "hidden"}" />
                <input name="password" type="password" class="input rounded-lg {dsComp.password.trim().length > 5 ? "bg-white": ""} " bind:value={dsComp.password}/>
            </div>
        </label>

        <label>
            <small>Confirm Password:</small>
            <div class="flex flex-col justify-center items-end">
                <img loading="lazy" src={checkIcon} alt="" class="w-4 absolute mr-5 z-10 {dsComp.confirmPassword.trim().length > 5? "block": "hidden"}" />
                <input name="confirmPassword" type="password" class="input rounded-lg {dsComp.confirmPassword.trim().length > 5 ? "bg-white": ""} " bind:value={dsComp.confirmPassword}/>
            </div>
        </label>

        <div class="flex flex-col gap-4 mt-5 p-2">
            <div class="flex gap-2 items-center">
                <input name="tnc" type="checkbox" class="checkbox" />
                <small>I agree with the <a href="/Footer/Terms-And-Condition" class="text-blue-500 underline transition-all hover:text-red-500">Terms and Conditions</a> of Annapolis Finance Inc.</small>
            </div>

            <div class="flex gap-2 items-center">
                <input name="pp" type="checkbox" class="checkbox" />
                <small>I accept the <a href="/Footer/Privacy-Policy" class="text-blue-500 underline transition-all hover:text-red-500">Privacy Policy</a> of Annapolis Finance Inc.</small>
            </div>
        </div>

        <Button loader={dsComp.loader} loader_name="Creating." name="Sign up"/>
        <small class="text-center text-red-500">{@html dsComp.domMsg}</small>
    </form>

    <p class="text-center mt-5">Already have an account? <a title="Already have an account you can log in / sign in in this link." href="/Talk-With-Us/Login" class="text-blue-500 underline">Log in here</a></p>
</div>