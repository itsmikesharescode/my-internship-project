<script lang="ts">
	import Button from "$lib/Component/Button.svelte";
    import MapTiler from "../MapTiler.svelte";
    import { activeItem, branches, renderSingleBranch } from "$lib";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData;

    onMount( () => {
        $activeItem = "/Locations";
        if(data.status === 200){
            data.data?.filter(item => { 
                if(`/Locations/${item.branch_url}` === $page.url.pathname){
                    $renderSingleBranch = item

                }
            })
        }
    })
</script>

<svelte:head>
	<title>Annapolis Finance Inc. - {$renderSingleBranch?.branch_row_one_header_name}</title>
</svelte:head>

{#if $renderSingleBranch}

    <div class="p-4 text-black flex flex-col gap-10">

        <p class="p-2 ">Go back to <a href="/Locations" class="underline text-blue-500 transition-all hover:text-red-500">/Locations</a></p>
        
        <h1 class="h1 text-center p-10">{$renderSingleBranch.branch_row_one_header_name}</h1>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-2">
            <div class="w-full ">
                <img loading="lazy" src={$renderSingleBranch.branch_img_url} alt="" class="w-full h-[50vh] shadow-lg shadow-black rounded-xl" />
            </div>

            <div class="w-full">
                <MapTiler latitude={$renderSingleBranch.branch_lat} long={$renderSingleBranch.branch_long}/>
            </div>
        </div>

        <div class="flex flex-col gap-5 sm:flex-row">
            <div class="w-full">
                <h3 class="h3">{$renderSingleBranch.branch_row_two_header_name_f}</h3>
                <div class="flex flex-col gap-4 p-4">

                    <p><a target="_blank" href={$renderSingleBranch.branch_address_gps_link}
                    class="transition-all hover:text-red-500 text-blue-500 underline p-2 bg-slate-300 rounded-lg"
                    >{$renderSingleBranch.branch_address}</a></p>


                    <p><a href="callto:{$renderSingleBranch.branch_mob_num}" class="transition-all hover:text-red-500 text-blue-500 underline p-2 bg-slate-300 rounded-lg">{$renderSingleBranch.branch_mob_num}</a></p>


                    <p><a target="_blank" href={$renderSingleBranch.branch_fb_link} class="transition-all hover:text-red-500 text-blue-500 underline p-2 bg-slate-300 rounded-lg">{$renderSingleBranch.branch_row_one_header_name} Facebook Page</a></p>

                    <p><a href="mailto:{$renderSingleBranch.branch_email}" class="transition-all hover:text-red-500 text-blue-500 underline p-2 bg-slate-300 rounded-lg">{$renderSingleBranch.branch_email}</a></p>

                    <div class="flex flex-col gap-2 mx-auto sm:max-w-xl p-5 bg-slate-200 rounded-xl shadow-lg shadow-black mt-5">
                        <h4 class="h4 text-center">WANT TO KNOW WHEN WE GOT NEWS ON OUR LATEST PRODUCT? SIGN UP FOR OUR NEWSLETTER NOW!
                        </h4>

                        <input type="email" class="input rounded-xl" placeholder="Email Address" />
                        
                        <div class="mx-auto">
                            <Button name="Send"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col gap-2">
                <h3 class="h3">{$renderSingleBranch.branch_row_two_header_name_s}</h3>

                <label>
                    <small>Intent:</small>
                    <select class="input">
                        <option>Sangla ORCR</option>
                        <option>Appliances Loan</option>
                        <option>Gadgets Loan</option>
                        <option>Repossessed Units</option>
                    </select>
                </label>

                <div class="flex flex-col gap-2 sm:flex-row">
                    <label class="w-full">
                        <small>Name:</small>
                        <input type="text" class="input" />
                    </label>

                    <label class="w-full">
                        <small>Mobile Number:</small>
                        <input type="text" class="input" />
                    </label>
                </div>

                <label>
                    <small>Email:</small>
                    <input type="email" class="input" />
                </label>

                <div class="flex flex-col gap-2">
                    <label>
                        <small>Message:</small>
                        <textarea class="textarea" />
                    </label>

                    <div class="mx-auto">
                        <Button name="Send"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="mt-[10vh] min-h-screen">
        <p class="text-center">Sorry it seems that you are visiting a page that does not exist in Annapolis Finance Inc Index -Mikey</p>
        <p class="text-center">Go back to <a href="/Locations" class="text-blue-500 underline">/Locations?</a></p>
    </div>
{/if}

    
