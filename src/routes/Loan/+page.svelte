<script lang="ts">
    import { goto } from "$app/navigation";

</script>

<svelte:head>
	<title>Annapolis Finance Inc. - Loan</title>
</svelte:head>

<div class="text-black ">
    <h3 class="h3 text-center mt-[5vh]">Welcome to Loan Section What you are looking for ?</h3>
    <div class="flex flex-col gap-5 p-2  mx-auto sm:max-w-[80%] mt-5 min-h-screen">

        <a href="/Loan/Sangla-ORCR" class="w-full card p-4 text-left flex flex-col gap-2 rounded-xl transition-all hover:shadow-sm hover:shadow-black active:scale-95 
        "
        title="Navigate to Sangla ORCR"
        >
            <h4 class="h4">Sangla ORCR</h4>
            <div class="flex flex-col h-full justify-center">
                <p>
                    ORCR Loans are protected by an asset or property of value pledged by a borrower in exchange for a loan. These loans are most commonly used for car registrations and land titles.
                </p>
            </div>
        </a>

        <a href="/Loan/Repossessed-Units" class="w-full card p-4 text-left flex flex-col gap-2 rounded-xl transition-all hover:shadow-sm hover:shadow-black active:scale-95 
        "
        title="Navigate to Repossessed Units"
        >
            <h4 class="h4">Repossessed Units</h4>
            <div class="flex flex-col h-full justify-center">
                <p>
                    Repossessed units refer to properties or items that were taken back by a lender or creditor due to non-payment by the borrower. This action typically occurs when the borrower defaults on a loan secured by the property or item.
                </p>
            </div>
        </a>

        

    </div>
</div>