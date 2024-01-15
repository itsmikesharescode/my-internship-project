<script lang="ts">
	import { onMount } from "svelte";

    import motorIcon from "$lib/Images/Loan/SanglaORCR/motor.jpg";
    import tricycleIcon from "$lib/Images/Loan/SanglaORCR/tricycle.jpg";
    import checkIcon from "$lib/Images/Loan/SanglaORCR/check.svg";
    import msgIcon from "$lib/Images/Loan/SanglaORCR/messenger.svg";

    import ban1 from "$lib/Images/Loan/SanglaORCR/banner1.webp";
    import ban2 from "$lib/Images/Loan/SanglaORCR/banner2.webp";
    import ban3 from "$lib/Images/Loan/SanglaORCR/banner3.webp";
	import { activeItem } from "$lib";

    onMount( async () => {
        $activeItem = "/Loan"
    })

</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Sangla ORCR</title>
</svelte:head>

<div class="text-black p-2">

    <p class="p-5">Back to <a href="/Loan" class="underline text-blue-500 transition-all hover:text-red-500">/Loan</a></p>

    <div class="text-center p-4 flex flex-col gap-4 mx-auto sm:max-w-xl">
        <h1 class="h1 ">Sangla ORCR</h1>
        <p>
            ORCR Loans are protected by an asset or property of value pledged by a borrower in exchange for a loan. These loans are most commonly used for car registrations and land titles.
        </p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row mt-5">
        <div class="flex flex-col gap-2 w-full">
            <img loading="lazy" src={motorIcon} alt="" class="" />
            <h3 class="h3">Motorcycle (Sangla OR/CR)</h3>
            <div class=" sm:h-[50vh] flex flex-col gap-2 justify-center">
                <div class="flex flex-col gap-2">
                    
                    <p>
                        No Hassle Cash Loan! Magpasa ka lang ng complete requirements sa Facebook Messenger pwede na mag apply!
                    </p>

                    <div class="p-2">
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>2015 and up to latest model are accepted</p>
                        </div>

                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Original OR CR</p>
                        </div>

                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>2 valid ID's</p>
                        </div>

                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Latest Electricity or Water billing</p>
                        </div>

                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Latest 2 months Proof of income</p>
                        </div>
                    </div>

                    <a href="/" class="p-2 bg-[#01009F] text-white text-center rounded-xl mx-auto flex items-center gap-2 transition-all hover:shadow-sm hover:shadow-black hover:scale-105">
                        <img loading="lazy" src={msgIcon} alt="" class="w-6" />
                        Chat via Messenger
                    </a>
                </div>
            </div>

        </div>

        <div class="flex flex-col gap-2 w-full">
            <img loading="lazy" src={tricycleIcon} alt="" class="w-full mx-auto" />
            
            <div class="flex flex-col gap-2">
                <h3 class="h3">Tricycle (Sangla OR/CR)</h3>
                
                <div class=" sm:h-[50vh] flex flex-col gap-2 justify-center">
                    <p>
                        Malapit na ang Due date ng bills? You can borrow money to meet your financial needs! SANGLA OR CR ng Motor Hindi kukunin ang unit!
                    </p>
                    
    
                    <div class="p-2">
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Pwede Online Application</p>
                        </div>
    
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Pwede mag walk in sa branch</p>
                        </div>
    
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Mababang interest</p>
                        </div>
    
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>Approve agad basta kumpleto ang requirements!</p>
                        </div>
    
                        <div class="flex gap-2 items-center">
                            <img loading="lazy" src={checkIcon} alt="" class="w-8" />
                            <p>1-3 days process</p>
                        </div>
                    </div>
    
                    <a href="/" class="p-2 bg-[#01009F] text-white text-center rounded-xl mx-auto flex items-center gap-2 transition-all hover:shadow-sm hover:shadow-black hover:scale-105">
                        <img loading="lazy" src={msgIcon} alt="" class="w-6" />
                        Chat via Messenger
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-2 mx-auto sm:flex-row mt-10 p-5">
        <div class="">
            <img loading="lazy" src={ban1} alt="" class="" />
        </div>

        <div class="">
            <img loading="lazy" src={ban2} alt="" class="" />
        </div>

        <div class="">
            <img loading="lazy" src={ban3} alt="" class="" />
        </div>
    </div>
    
   
</div>