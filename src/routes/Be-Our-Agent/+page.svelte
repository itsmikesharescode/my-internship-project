<script lang="ts">
    import agentbanner from "$lib/Images/BeOurAgent/agentbanner.png";

</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Be Our Agent</title>
</svelte:head>

<div class="p-2 flex flex-col gap-2 sm:flex-row items-center justify-center">

    <div class="text-[#01009F] w-full">
		<img loading="lazy" src={agentbanner} alt="" class="w-full" />
	</div>

	<div class="text-[#01009F] flex flex-col gap-4 w-full">
		<h1 class="h1 text-center font-bold lg:text-[4rem]">BE OUR LOAN AGENT</h1>
		<p class="font-bold text-center">Join now! and earn more than 50k per month</p>

		<div class="flex flex-col gap-5 sm:gap-2 sm:flex-row justify-center items-center">
			<div class="max-w-fit animate-bounce hover:animate-none">
				<a href="/Be-Our-Agent/Loan-Agent-Form" class="p-2 bg-[#00B500] text-white rounded-xl transition-all active:bg-opacity-50"
				title="Be our agent ? Click here!"
				>JOIN OUR TEAM NOW</a>
			</div>

		</div>

	</div>

	
</div>