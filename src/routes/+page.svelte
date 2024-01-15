<script lang="ts">
	import { activeItem } from "$lib";
	import banner3 from "$lib/Images/Home/homebanner3.png";
	import { onMount } from "svelte";

	onMount( () => $activeItem = "/")

</script>


<div class="p-2 flex flex-col gap-2 sm:flex-row items-center justify-center h-screen">

	<div class="text-[#01009F] flex flex-col gap-4 w-full">
		<h1 class="h1 text-center font-bold lg:text-[5rem]">NEED CASH ?</h1>
		<p class="font-bold text-center">LOAN NOW WITH YOUR OR/CR. WE OFFER LOW INTEREST RATES WITH THE BEST TERMS</p>

		<div class="flex flex-col gap-5 sm:gap-2 sm:flex-row justify-center items-center">
			<div class="max-w-fit">
				<a href="/Inquire-Now" class="p-2 bg-[#00B500] text-white rounded-xl transition-all active:bg-opacity-50"
				title="Sangla Now ? Click here!"
				>SANGLA NOW</a>
			</div>

			<div class="max-w-fit">
				<a href="/Inquire-Now" class="p-2 bg-[#00B500] text-white rounded-xl transition-all active:bg-opacity-50"
				title="Apply Loan Now ? Click here!"
				>APPLY LOAN NOW</a>
			</div>
		</div>

		<p class="text-center font-bold">MAASAHAN SA LAHAT NG PANGANGAILANGAN</p>
	</div>

	<div class="text-[#01009F] w-full">
		<img loading="lazy" src={banner3} alt="" class="" />
	</div>
</div>