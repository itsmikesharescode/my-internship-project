<script lang="ts">
	import { activeItem } from "$lib";
	import { onMount } from "svelte";
    import inquireBanner from "$lib/Images/Inquire/inquireBanner.webp";

    import { FileDropzone, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Button from "$lib/Component/Button.svelte";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";

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

    onMount(() => {
        $activeItem = "/Inquire-Now"
    })

    const dsComp = {
        loader: false
    }

    let files: FileList;

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;

        return async ({result, update}) =>
        {
            const {status, type, data:{msg}} = result as {status: number, type: string, data:{msg: string}};

            if(status === 200){
                createToast(msg, false);
                dsComp.loader = false;
            }else if(status === 402){
                createToast(msg, true);
                dsComp.loader = false;
            }
            
            update();
        }
    }

</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Inquire Now - Application Form</title>
</svelte:head>

<div class="p-2 sm:p-10 flex flex-col gap-2 sm:flex-row-reverse  text-black">
    <div class="w-full flex flex-col items-center justify-center">
        
        <h1 class="h1 text-center font-bold lg:text-[5rem] text-[#01009F]">NEED CASH ?</h1>
		<p class="font-bold text-center text-[#01009F]">LOAN NOW WITH YOUR OR/CR. WE OFFER LOW INTEREST RATES WITH THE BEST TERMS</p>
        <img loading="lazy" src={inquireBanner} alt="" class="h-full" />
    </div>

    <div class="w-full">
        <h3 class="h3">Step 1</h3>
        <div class="p-2">
            <small>Download the <a target="_blank" href="https://udvdzjeflrzpcvfwsdhv.supabase.co/storage/v1/object/sign/downloads/UPDATED-APPLICATION-FORM.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkb3dubG9hZHMvVVBEQVRFRC1BUFBMSUNBVElPTi1GT1JNLnBkZiIsImlhdCI6MTcwMTMxOTUzMCwiZXhwIjoxNzMyODU1NTMwfQ.i1-cWPUGHO74u07dPO8ZgOqzNKkRid50l6RLivFFlhM&t=2023-11-30T04%3A45%3A30.457Z" 
             class="text-blue-600 underline">form</a> and fill it up.</small>

        </div>

        <h3 class="h3">Step 2</h3>
        <form method="POST" enctype="multipart/form-data" use:enhance={submitFunc}>
            <div class="p-2 flex flex-col gap-2">

                <label>
                    <small>Job status:</small>
                    <select name="jobStatus" class="select text-sm">
                        <option>EMPLOYED (private corporation)</option>
                        <option>BUSINESS (1 year existing business)</option>
                        <option>REMITTANCE</option>
                        <option>ALLOTMENT</option>
                        <option>RIDER</option>
                    </select>
                </label>

                <div class="flex flex-col sm:flex-row gap-2">
                    <label>
                        <small>First Name:</small>
                        <input name="firstName" type="text" class="input text-sm" />
                    </label>

                    <label>
                        <small>Middle Name:</small>
                        <input name="middleName" type="text" class="input text-sm" />
                    </label>

                    <label>
                        <small>Last Name:</small>
                        <input name="lastName" type="text" class="input text-sm" />
                    </label>
                </div>

                <label>
                    <small>Address:</small>
                    <input name="address" type="text" class="input text-sm" />
                </label>

                <label>
                    <small>Mobile Number:</small>
                    <input name="mobileNumber" type="text" class="input text-sm" />
                </label>

                <label>
                    <small>Email:</small>
                    <input name="email" type="text" class="input text-sm" />
                </label>

                <label>
                    <small>Motive:</small>
                    <select name="motive" class="select text-sm">
                        <option>Sangla ORCR Motorcycle</option>
                        <option>Sangla ORCR TRICYCLE</option>
                        <option>Sangla ORCR Bigbike</option>
                        <option>Finance Appliances</option>
                        <option>Finance Iphone/Samsung</option>
                    </select>
                </label>

                

            </div>

            <h3 class="h3">Step 3</h3>
            <div class="p-2 flex flex-col gap-5">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="flex flex-col">
                    <small>Upload file here:</small>
                    <small class="text-center opacity-50">Upload the Application Form (accepted file format pdf, jpg, png, xlsx max size 30mb).</small>
                    <FileDropzone name="files" bind:files accept=".pdf"/>
                </label>
                
                <div class="flex  gap-2 justify-center">
                    <input name="tnc" type="checkbox" class="checkbox" />
                    <small>I agree with the <a target="_blank" title="Check Annapolis Finance Inc. Terms and Conditions?" class="text-blue-500 underline" href="/Footer/Terms-And-Condition">Terms and Conditions</a> of Annapolis Finance Incorporation</small>
                </div>

                <div class="flex  gap-2 justify-center">
                    <input name="pp" type="checkbox" class="checkbox" />
                    <small>I accept the <a target="_blank" title="Check Annapolis Finance Inc. Privacy Policy?" class="text-blue-500 underline" href="/Footer/Terms-And-Condition">Privacy Policy</a> of Annapolis Finance Incorporation</small>
                </div>

                <div class="sm:w-[50%] sm:mx-auto">
                    <Button name="Submit" loader={dsComp.loader} loader_name="Submitting."/>
                </div>
            </div>
        </form>
    </div>


</div>