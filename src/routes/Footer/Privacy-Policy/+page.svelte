<script lang="ts">
	import { activeItem } from "$lib";
	import { onMount } from "svelte";

    onMount(() => $activeItem = "/")
</script>

<div class="text-black mt-[5vh] mx-auto sm:max-w-[80%] flex flex-col gap-2 p-2 py-20">

    <h1 class="h1 text-center">Privacy Policy</h1>
    <p>Annapolis Finance Inc respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and disclose information about you when you visit our website or use our services.</p>

    <p class="font-bold">Information We Collect</p>
    <p class="px-2">We may collect the following types of information from you, such as personal information, this includes your name, email address, phone number, and other information you provide to us when you use our services or contact us.</p>

    <ul class="list-disc px-8 flex flex-col gap-2">
        <li>Payment Information - This includes information related to payments made to us, such as credit card information or bank account details.</li>

        <li>Usage Information - This includes information about how you use our website or services, such as the pages you visit or the actions you take.</li>

        <li>Device Information - This includes information about the device you use to access our website or services, such as your IP address, browser type, and operating system.</li>
    </ul>

    <p class="font-bold">How We Use Your Information</p>
    <p class="px-2">We use the information we collect for the following purposes:
        To provide and improve our services to you. To communicate with you about your account or our services. To process payments and prevent fraud. To personalize your experience on our website. To comply with legal obligations.
    </p>

    <p class="font-bold">How We Share Your Information</p>
    <p class="px-2">We may share your information with third parties in the following circumstances:
    </p>

    <p class="px-2 italic opacity-70 font-bold">"With service providers who perform services on our behalf, such as payment processing or data analytics. With business partners or affiliates with whom we collaborate to provide services to you. With government authorities or law enforcement officials in response to a legal request or to comply with a legal obligation. In connection with a merger, acquisition, or sale of all or a portion of our business."</p>

    <ul class="list-disc px-8 flex flex-col gap-2">
        <li>Your Choices - You can choose not to provide us with certain information, but this may limit your ability to use certain features of our website or services. You can also opt out of receiving promotional emails from us by following the instructions in those emails.</li>

        <li>Security - We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</li>

        <li>Children’s Privacy - Our website and services are not directed at children under the age of 13. We do not knowingly collect personal information from children under the age of 13.</li>
    </ul>

    <p class="font-bold">Contact Us</p>
    <p class="px-2">If you have any questions about this Privacy Policy or our privacy practices, please <a title="Contact the developer who maintain this website?" href="/Talk-With-Us/Login" class="text-blue-500 underline">contact us</a> . Changes to this Privacy Policy We may update this Privacy Policy from time to time. The latest version of this Privacy Policy will be posted on our website.


    </p>
    
    
    
</div>