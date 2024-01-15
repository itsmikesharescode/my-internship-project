<script lang="ts">
	import { activeItem } from "$lib";
	import Button from "$lib/Component/Button.svelte";
	import { FileDropzone } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";


    onMount(() => $activeItem = "/Be-Our-Agent")
</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Be Our Agent - Application Form</title>
</svelte:head>

<div class="p-4 text-black">
    <p>Back to <a href="/Be-Our-Agent" class="text-blue-500 underline">/Be-Our-Agent</a></p>

    <div class="mt-10 sm:max-w-[80%] mx-auto flex flex-col gap-4">
        <h1 class="h1 text-center text-[#01009F]">LOAN AGENT FORM</h1>

        <div class="flex flex-col gap-2 sm:flex-row">
            <div class="w-full flex flex-col gap-2">
                <h3 class="h3">Step 1</h3>
                <div class="p-2 sm:p-10 card bg-white">
                    <div class="flex flex-col gap-2 sm:flex-row">
                        <label>
                            <small>First Name:</small>
                            <input type="text" class="input text-sm" />
                        </label>
    
                        <label>
                            <small>Middle Name:</small>
                            <input type="text" class="input text-sm" />
                        </label>
    
                        <label>
                            <small>Last Name:</small>
                            <input type="text" class="input text-sm" />
                        </label>
                    </div>
                    
                    <label>
                        <small>Present Address:</small>
                        <input type="text" class="input text-sm" />
                    </label>

                    <div class="flex flex-col gap-2 sm:flex-row">
                        <label>
                            <small>Date Of Birth:</small>
                            <input type="date" class="input text-sm" />
                        </label>
    
                        <label>
                            <small>Civil Status:</small>
                            <select class="select text-sm">
                                <option>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>
                                <option>Divorced</option>
                                <option>Separated</option>
                            </select>
                        </label>
    
                        <label>
                            <small>Gender:</small>
                            <select class="select text-sm">
                                <option>Male</option>
                                <option>Female</option>
                                <option>LGBTQIA+</option>
                                
                            </select>
                        </label>
                    </div>

                    <label>
                        <small>Contact Number:</small>
                        <input type="text" class="input text-sm" />
                    </label>

                    <label>
                        <small>Email:</small>
                        <input type="email" class="input text-sm" />
                    </label>

                    <div class="flex flex-col gap-2 sm:flex-row">
                        <label class="w-full">
                            <small>Facebook Account Link:</small>
                            <input type="text" class="input text-sm" />
                        </label>

                        <label class="w-full">
                            <small>Active G-cash Number:</small>
                            <input type="text" class="input text-sm" />
                        </label>
                    </div>

                    <label>
                        <small>Bank Name:</small>
                        <input type="text" class="input text-sm" />
                    </label>

                    <label>
                        <small>Bank Account:</small>
                        <input type="text" class="input text-sm" />
                    </label>

                    <label>
                        <small>Company Name:</small>
                        <input type="text" class="input text-sm" />
                    </label>

                    <div class="flex flex-col gap-2 sm:flex-row">
                        <label class="w-full">
                            <small>Employment Status:</small>
                            <select class="select text-sm">
                                <option>Employment</option>
                                <option>Self-Employment</option>
                                <option>Retired</option>
                                <option>Student</option>
                            </select>
                        </label>

                        <label class="w-full">
                            <small>Position:</small>
                            <input type="text" class="input text-sm" />
                        </label>
                    </div>
                </div>

                
            </div>
    
            <div class="w-full flex flex-col gap-4 justify-start">

                <h3 class="h3">Step 2</h3>
                <div class="p-2 sm:p-10 card bg-white">
                    <small>Download the <a href="/" class="text-blue-500 underline">Application form</a> and fill up the form.</small>
                </div>

                <h3 class="h3">Step 3</h3>
                <div class="p-2 sm:p-10 card bg-white flex flex-col gap-4">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="flex flex-col">
                        <small>Upload file here:</small>
                        <small class="text-center opacity-50">Upload the Agent Accreditation Form (accepted file format pdf, jpg, png, xlsx max size 30mb).</small>
                        <FileDropzone name="files" />
                    </label>
                    
                    <div class="flex  gap-2 justify-center">
                        <input type="checkbox" class="checkbox" />
                        <small>I agree with the Terms and Conditions of Annapolis Finance Incorporation</small>
                    </div>

                    <div class="flex  gap-2 justify-center">
                        <input type="checkbox" class="checkbox" />
                        <small>I accept the Privacy Policy of Annapolis Finance Incorporation</small>
                    </div>

                    <div class="sm:w-[50%] sm:mx-auto">
                        <Button name="Submit" />
                    </div>
                </div>   

                <div class="text-[#01009F] flex flex-col gap-4 w-full h-full justify-center">
                    <h1 class="h1 text-center font-bold lg:text-[4rem]">BE OUR LOAN AGENT</h1>
		            <p class="font-bold text-center">Join now! and earn more than 50k per month</p>
                </div>
            </div>

        </div>

        <div class="flex flex-col gap-2 sm:flex-row">
            <div class="p-2 card bg-white w-full">
                <h3 class="h3">Description</h3>
                <div class="flex flex-col gap-2 p-2">
                    <small>Work Anytime Anywhere</small>
                    <small>No Qualifications</small>
                    <small>With free orientation</small>
                    <small>With additional incetive</small>
                </div>
            </div>
    
            <div class="p-2 card bg-white w-full">
                <h3 class="h3">Contacts</h3>
                <div class="flex flex-col gap-2 p-2">
                    <small>Email: <a href="mailto:mainannapolisfinance@gmail.com" class="text-blue-500 underline">mainannapolisfinance@gmail.com</a></small>
                    <small>Contact Number: <a href="callto:09159592858" class="text-blue-500 underline">09159592858</a> / <a href="callto:09564280526" class="text-blue-500 underline">09564280526</a></small>
                </div>
            </div>
    
            <div class="p-2 card bg-white w-full">
                <h3 class="h3">Job Locations</h3>
                <div class="flex flex-col gap-2 p-2">
                    <small><a href="/" class="text-blue-500 underline">Unit 1508, 15th Floor, Jollibee Plaza Condominium, Junior Rd., Ortigas, Pasig City</a></small>
                    
                </div>
            </div>
        </div>

    </div> 
</div>