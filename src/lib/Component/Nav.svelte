<script lang="ts">
    import annapIcon from "$lib/Images/Nav/annapIcon.webp";
    import searchIcon from "$lib/Images/Nav/search.svg";

    import { selections, activeItem, sessionStore, showSeachRoute } from "$lib";
	import Button from "./Button.svelte";
	import { slide } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import SearchRoute from "./SearchRoute.svelte";

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
    }

    let showMobileMenu = false;

    onMount( () => {
        $activeItem = $page.url.pathname;
        document.addEventListener("keydown", function(event: KeyboardEvent) {
            
            if(event.ctrlKey && event.key === "s"){
                event.preventDefault();
                showSeachRoute.set(true);
            }else if(event.key === "Escape"){
                event.preventDefault();
                showSeachRoute.set(false);
            }
        })
    });

    const logoutHandler = async () =>
    {

        dsComp.loader = true;
        
        const res: Response = await fetch("/API", {
            method: "POST",
            headers: {
                "content-typed": "application/json"
            },
            body: JSON.stringify({
                logoutReq: 123456
            })
        })

        const {status, msg} = await res.json();

        if(status === 200){

            $sessionStore = null;
            createToast(msg, false);
            dsComp.loader = false;
            showMobileMenu = false;
            goto("/Talk-With-Us/Login");
        }

    }


</script>

<header class=" flex flex-col gap-2 justify-center items-center p-2 bg-[#00B500] text-white">
    <h4 class="h4">Annapolis Finance Inc.</h4>
    <div class="flex flex-col sm:flex-row sm:gap-2">
        <small class="font-bold">Monday - Friday 9:00 am - 6:00 pm</small>
        <div class="flex flex-col justify-center items-center sm:flex-row gap-2">
            <small><a title="Annapolis Finance Inc. Contact number" class="underline text-blue-800" href="callto:09294135807">09294135807</a></small>
            <small><a title="Annapolis Finance Inc. Facebook" class="underline text-blue-800" href="/">Annapol Finance</a></small>
            <small><a title="Annapolis Finance Inc. Email Address" class="underline text-blue-800" href="mailto:costumerservice@annapolis.com.ph">costumerservice@annapolis.com.ph</a></small>
        </div>
    </div>
</header>

<nav class="bg-[#01009F] w-full p-2 text-white flex items-center lg:justify-evenly">

    <div class="lg:hidden w-full">
        <button class="flex flex-col gap-1 p-2 " on:click={() => showMobileMenu = true}>
            <div class="w-8 border-b-2 border-b-white"></div>
            <div class="w-6 border-b-2 border-b-white"></div>
            <div class="w-4 border-b-2 border-b-white"></div>
        </button>
    </div>

    <div class="p-2 gap-4 hidden lg:flex justify-center ">
        <a title="Annapolis Finance Inc Logo" href="/" class="items-center gap-2 hidden xl:flex">
            <img loading="lazy" src={annapIcon} alt="" class="w-[40px] bg-white rounded-full" />
            <h5 class="h5">Annapolis Finance Inc.</h5>
        </a>

        {#each $selections as selection }
            <a href={selection.url} class="p-2 text-white max-w-fit rounded-xl { $activeItem === selection.url ? "transition-all bg-black rounded-xl" : ""} "
            title={selection.description}
            on:click={() => {
                $activeItem = selection.url;
                showMobileMenu = false;
            }}
            >{selection.title}</a>
        {/each}
    </div>

        
    <div class="w-full lg:w-fit flex justify-end">
        <div class="flex gap-4 items-center">
            <button title="Search route here" class="flex items-center transition-all border-[0.1rem] rounded-lg shadow-white shadow-sm {$showSeachRoute ? "bg-black" : ""}" on:click={() => showSeachRoute.set(true)}>
                <p class="flex items-center px-2 lg:p-2 ">
                    <img loading="lazy" src={searchIcon} alt="" class="w-6" />
                    <b class="hidden lg:block">Ctrl&#160;+&#160;S</b> 
                    <b class="lg:hidden">Search</b>
                </p>
            </button>

            {#if $showSeachRoute}
                <SearchRoute />
            {/if}
            
            {#if $sessionStore}
                <a href="/Talk-With-Us/Manager-Account" class="hidden lg:block p-2 bg-green-500 rounded-lg transition-all active:bg-opacity-50">Manage Account</a>
                <div class="hidden lg:block">
                    <Button loader={dsComp.loader} loader_name="Quitting." style="p-2 bg-red-500 rounded-lg text-white" name="Logout" on:click={logoutHandler} />
                </div>
            {:else}
                <a href="/Talk-With-Us/Login" class="hidden lg:block p-2">Login</a>
                <a href="/Talk-With-Us/SignUp" class="hidden lg:block p-2 bg-green-500 rounded-lg transition-all active:bg-opacity-50">Sign&#160;up&#160;Free</a>
            {/if}
        </div>
    </div>
    


</nav>


{#if showMobileMenu}
    <menu class="fixed left-0 right-0 top-0 bottom-0 z-10 text-white bg-[#00000098] lg:hidden">
        <div class="flex flex-col gap-2 bg-[#01009F] p-4" transition:slide>

            {#each $selections as selection }
                <a href={selection.url} class="p-2 text-white max-w-fit { $activeItem === selection.url ? "transition-all bg-black rounded-xl" : ""} "
                on:click={() => {
                    $activeItem = selection.url;
                    showMobileMenu = false;
                }}
                >{selection.title}</a>
            {/each}

            <div class="flex flex-col gap-2 mt-10">

                <button class="flex gap-2 justify-center p-2" on:click={() => goto("/")}>
                    <img loading="lazy" src={annapIcon} alt="" class="w-10 bg-white rounded-full"/>
                    <h5 class="h5">Annapolis Finance Inc.</h5>
                </button>

                {#if $sessionStore}
                    <Button name="Manage Account" />
                    <Button loader={dsComp.loader} loader_name="Quitting." style="p-2 bg-red-500 rounded-lg text-white" name="Logout" on:click={logoutHandler}/>
                {:else}
                    <Button style="bg-slate-500 p-2 rounded-lg text-white" name="Login" on:click={() => {
                        goto("/Talk-With-Us/Login");
                        showMobileMenu = false;
                    }}/>
                    <Button name="Sign Up Free" on:click={() => {
                        goto("/Talk-With-Us/SignUp");
                        showMobileMenu = false;
                    }}/>
                {/if}

                
            </div>

            <div class="flex flex-row-reverse mt-5">
                <button class="flex flex-col gap-1 p-2" on:click={() => showMobileMenu = false}>
                    <div class="w-4 border-b-2 border-b-white"></div>
                    <div class="w-6 border-b-2 border-b-white"></div>
                    <div class="w-8 border-b-2 border-b-white"></div>
                </button> 
            </div>
        </div>
    </menu>
{/if}