<script lang="ts">
	import { branches, repos, showLocUpload, showUpload } from '$lib';
    import { supabaseStore } from '$lib';
    
    import Button from '$lib/Component/Button.svelte';
	import type { Repos } from '$lib/types';
    import { FileDropzone, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';

    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';


    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: "click",
        // Matches the data-popup value on your popup element
        target: 'popupFeatured',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

		
    import { v4 as uuidv4 } from 'uuid';

    
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

        //row one

        rOneHeaderName: "",
        branchLat: 0,
        branchLong: 0,

        //row two column one
        rTwoColOneHeaderName: "",
        address: "",
        addressGPSlink: "",
        branchNumber: "",
        branchFBlink: "",
        branchEmail: "",

        //row two column two
        rTwoColTwoHeaderName: "",
        
    }

    let files: FileList | undefined;

    const handleUpload = async () =>
    {
        const uid = uuidv4();

        if(files){
            if(dsComp.rOneHeaderName.trim().length > 4){
                if(dsComp.branchLat > 0 && dsComp.branchLat <= 90 ){
                    if(dsComp.branchLong > 0 && dsComp.branchLong <= 180 ){
                        if(dsComp.rTwoColOneHeaderName.trim().length > 4){
                            if(dsComp.address.trim().length > 4){
                                if(dsComp.addressGPSlink.trim().length > 8){
                                    if(dsComp.branchNumber.trim().length > 10){
                                        if(dsComp.branchFBlink.trim().length > 4){
                                            if(dsComp.branchEmail.includes("@") && dsComp.branchEmail.includes(".")){
                                                if(dsComp.rTwoColTwoHeaderName.trim().length > 4){

                                                    dsComp.loader = true;

                                                    const {data:bData, error:err} = await $supabaseStore.storage.from("annapolis_bucket").upload(`branch/${uid}`, files[0], {
                                                        cacheControl: '3600',
                                                        upsert: false
                                                    });

                                                    if(bData){
                                                        const {data:{publicUrl}} = $supabaseStore.storage.from("annapolis_bucket").getPublicUrl(bData.path);
                                                        if(publicUrl){
                                                            const {error:inErr} = await $supabaseStore.from("branch_tb").insert([
                                                                {
                                                                    uid: uid,
                                                                    branch_img_url: publicUrl,
                                                                    branch_row_one_header_name: dsComp.rOneHeaderName,
                                                                    branch_lat: dsComp.branchLat,
                                                                    branch_long: dsComp.branchLong,
                                                                    branch_row_two_header_name_f: dsComp.rTwoColOneHeaderName,
                                                                    branch_address: dsComp.address,
                                                                    branch_address_gps_link: dsComp.addressGPSlink,
                                                                    branch_mob_num: dsComp.branchNumber,
                                                                    branch_fb_link: dsComp.branchFBlink,
                                                                    branch_email: dsComp.branchEmail,
                                                                    branch_row_two_header_name_s: dsComp.rTwoColTwoHeaderName,
                                                                    branch_url: dsComp.rOneHeaderName.split(" ").join(""),
                                                                }
                                                            ]);

                                                            if(inErr){
                                                                createToast(inErr.message, true);
                                                                dsComp.loader = false;
                                                                showLocUpload.set(false);
                                                            }else{
                                                                const {data:bData, error:bErr} = await $supabaseStore.from("branch_tb").select("*");
                                                                if(bData){
                                                                    $branches = bData;
                                                                    createToast("Location successfully uploaded", false);
                                                                    dsComp.loader = false;
                                                                    showLocUpload.set(false);
                                                                }else if(bErr){
                                                                    createToast(bErr.message, true);
                                                                    dsComp.loader = false;
                                                                }
                                                            }

                                                        }else{  
                                                            createToast("There is a problem getting url", true);
                                                        }

                                                    }else if(err){
                                                        createToast(err.message, true);
                                                    }

                                                }else{
                                                    createToast("Not valid header name for row two column two.", true);
                                                }
                                            }else{
                                                createToast("Not valid branch email address.", true);
                                            }
                                        }else{
                                            createToast("Not valid branch facebook link.", true);
                                        }
                                    }else{
                                        createToast("Not valid branch contact number.", true);
                                    }
                                }else{
                                    createToast("Not valid address gps link make sure you understand it correctly.", true);
                                }
                            }else{
                                createToast("Not valid address.", true);
                            }
                        }else{
                            createToast("Not valid header name for row two column one.", true);
                        }
                    }else{
                        createToast("Not valid longitude.", true);
                    }
                }else{
                    createToast("Not valid latitude.", true);
                }
            }else{
                createToast("Not valid branch name.", true);
            }
        }else{
            createToast("Must pick a branch photo.", true);
        }
    }

    const handleReleaseLatLong = () =>
    {
        const extractLatLong = () =>
        {
            if(dsComp.addressGPSlink.includes("@")){
                let latLong = dsComp.addressGPSlink.split('@')[1].split(',')[0] + ',' + dsComp.addressGPSlink.split('@')[1].split(',')[1];
                
                const latlotArray =  latLong.split(",");

                dsComp.branchLat = Number(latlotArray[0]);
                dsComp.branchLong = Number(latlotArray[1]);
            }else{
                createToast("Invalid link, make sure to wait the url to get its full load before you copy the url then paste it here.", true);
            }      

        }

        extractLatLong();
    }

   
</script>

<!--POP UPS-->
<div class="card p-4 w-72 shadow-xl z-10 shadow-black" data-popup="popupFeatured">
    <div class="flex flex-col gap-2">
        <small class="font-bold">Address GPS Link</small>
        <small>You can get the link by copying the url in this link <a target="_blank" href="https://www.google.com/maps/search/{dsComp.address}" class="text-blue-500 underline">Get address</a></small>

        <small>Make sure that address field is properly answered.</small>
    </div>
    <div class="arrow bg-surface-100-800-token" />
</div>



<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#000000b6] p-2">
    <div class="mx-auto sm:max-w-xl min-h-screen flex flex-col justify-center " transition:scale>
        
        <div class="card p-4 flex flex-col gap-2 shadow-lg shadow-black bg-slate-100 max-h-screen overflow-auto">
            <h4 class="h4 text-center">Upload Branch Location</h4>
		
            <!--Row One-->
            <p class="font-bold">Row One</p>
            <div class="flex flex-col gap-2 p-4">
                <div class="flex flex-col">
                    <small class="text-center text-red-500">Photo size must not be greater than 200KB. We recommend to use .webp extention</small>
                    <small>Branch Photo:</small>
                    <FileDropzone name="file" padding="p-4" bind:files/>
                    <div class="p-2" >
                        {#if files}
                            <small transition:scale class=""><b>Uploaded Photo Name:</b> {files[0].name} <button class="bg-red-500 px-2 text-white rounded-xl" title="You're about to upload this image. Want to undo?"
                            on:click={() => files = undefined}    
                            >Remove</button></small>
                        {/if}
                    </div>
                </div>
    
                <label>
                    <small>Header Name:</small>
                    <input name="headderName" type="text" class="input"  bind:value={dsComp.rOneHeaderName}/>
                </label>

                <div class="flex flex-col gap-2 sm:flex-row">
                    <label>
                        <small>Branch Latitude:</small>
                        <input name="branchLat" type="text" class="input" bind:value={dsComp.branchLat}/>
                    </label>

                    <label>
                        <small>Branch Longitude:</small>
                        <input name="branchLong" type="text" class="input" bind:value={dsComp.branchLong}/>
                    </label>
                </div>
                <!--Auto config lat btn-->
                {#if dsComp.addressGPSlink.trim().length > 17}
                    <button class="px-2 bg-green-500 text-white rounded-lg" on:click={handleReleaseLatLong}>
                        <small>Auto Config Latitude and Longitude</small>
                    </button>
                {/if}

            </div>

            <!--Row Two-->
            <p class="font-bold">Row Two</p>
            <div class="flex flex-col gap-2 p-4">
                <!--Column One-->
                <small class="font-bold text-center ">First Column</small>
                <label>
                    <small>Header Name:</small>
                    <input name="rTwoColOneHeaderName" type="text" class="input" bind:value={dsComp.rTwoColOneHeaderName}/>
                </label>

                <div class="">
                    <label>
                        <small>Address:</small>
                        <input name="address" type="text" class="input" bind:value={dsComp.address}/>
                    </label>
                </div>

                <div class="">
                    <label>
                        <small>Address GPS Link:</small>
                        <input name="addressGPSlink" type="text" class="input" use:popup={popupFeatured} bind:value={dsComp.addressGPSlink}/>
                    </label>
                </div>

                <div class="">
                    <label>
                        <small>Branch Contact Number:</small>
                        <input name="branchContactNumber" type="text" class="input" bind:value={dsComp.branchNumber}/>
                    </label>
                </div>

                <div class="">
                    <label>
                        <small>Branch Facebook Link:</small>
                        <input name="branchFBlink" type="text" class="input" bind:value={dsComp.branchFBlink}/>
                    </label>
                </div>

                <div class="">
                    <label>
                        <small>Branch Email:</small>
                        <input name="branchEmail" type="email" class="input" bind:value={dsComp.branchEmail}/>
                    </label>
                </div>

                <!--Second One-->
                <small class="font-bold text-center ">Second Column</small>
                <label>
                    <small>Header Name:</small>
                    <input name="rTwoColTwoHeaderName" type="email" class="input" bind:value={dsComp.rTwoColTwoHeaderName}/>
                </label>
            </div>


            <div class="flex gap-2 mt-2">
                <Button loader={dsComp.loader} loader_name="Uploading." name="Upload" on:click={handleUpload} />
                <Button style="bg-red-500 p-2 text-white rounded-lg" name="Cancel" on:click={() => showLocUpload.set(false)}/>
            </div>
            
        </div>
    </div>
</div>