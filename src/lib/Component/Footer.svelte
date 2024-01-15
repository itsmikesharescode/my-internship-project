<script lang="ts">
	import Button from "./Button.svelte";

    import fb from "$lib/Images/Footer/fb.svg";
    import feed from "$lib/Images/Footer/feed.svg";
    import gmail from "$lib/Images/Footer/gmail.svg";
    import ig from "$lib/Images/Footer/ig.svg";
    import tiktok from "$lib/Images/Footer/tiktok.svg";
    import twitter from "$lib/Images/Footer/twitter.svg";

    const handleSubscribe = async () =>
    {
        
    }
    
</script>

<footer class="text-black flex flex-col gap-2 p-2 sm:flex-row bg-slate-300">
    <div class="w-full flex flex-col gap-2 p-10">
        <h3 class="h3">USEFUL LINKS</h3>
        <small><a title="Navigate to Annapolis Finance Inc Terms and Conditions" href="/Footer/Terms-And-Condition" class="text-blue-500 underline">Terms and Conditions</a></small>
        <small><a title="Navigate to Annapolis Finance Inc Privacy Policy" href="/Footer/Privacy-Policy" class="text-blue-500 underline">Privacy Policy</a></small>
        <small><a title="Navigate to Annapolis Finance Inc Payment Options" href="/" class="text-blue-500 underline">Payment Options</a></small>
        <small><a title="Navigate to Annapolis Finance Inc Contacts" href="/" class="text-blue-500 underline">Contacts</a></small>
    </div>

    <div class="w-full flex flex-col gap-2 p-10">
        <h3 class="h3">RESOURCES</h3>
        <small><a href="/" class="text-blue-500 underline">News and updates</a></small>
        <small><a href="/" class="text-blue-500 underline">Looking for a job?</a></small>
        <small><a href="/" class="text-blue-500 underline">Download Forms</a></small>
        <small><a href="/" class="text-blue-500 underline">Our Campaigns</a></small>
    </div>

    <div class="w-full flex flex-col gap-2 p-10">
        <div class="card px-10 py-2 flex flex-col gap-2 rounded-xl shadow-lg shadow-black">
            <h4 class="h4 text-center">SUBSCRIBE AND GET THE LATEST NEWS</h4>
            <input type="email" class="input text-sm rounded-xl" placeholder="Add your email address to subscribe" />
            <div class="w-[50%] mx-auto">
                <Button style="px-2 py-1 bg-black rounded-xl text-[#00B500]" name="Subscribe"/>
            </div>
            
            <div class="flex gap-4 justify-center p-5">
                <a title="Annapolis Finance Inc Facebook" href="/"><img loading="lazy" src={fb} alt="" class="w-6" /></a>
                <a title="Annapolis Finance Inc Instagram" href="/"><img loading="lazy" src={ig} alt="" class="w-6" /></a>
                <a title="Annapolis Finance Inc Tiktok" href="/"><img loading="lazy" src={tiktok} alt="" class="w-6" /></a>
                <a title="Annapolis Finance Inc Twitter" href="/"><img loading="lazy" src={twitter} alt="" class="w-6" /></a>
                <a title="Annapolis Finance Inc Gmail" href="/"><img loading="lazy" src={gmail} alt="" class="w-6" /></a>
                <a title="Annapolis Finance Inc Feed" href="/"><img loading="lazy" src={feed} alt="" class="w-6" /></a>
            </div>
        </div>
    </div>
</footer>
<div class="text-white bg-black flex flex-col gap-2 justify-center items-center sm:flex-row">
    <small class="font-bold">All rights reserve 2023 Annapolis Finance Inc.</small>
    <small>Created and SEO by <a target="_blank" href="https://www.youtube.com/@mikeSharesCode" class="text-red-500 underline">Mikey</a></small>
</div>