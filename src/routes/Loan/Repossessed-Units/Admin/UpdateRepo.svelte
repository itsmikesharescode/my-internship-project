<script lang="ts">
	import { repos, showUpdate, showUpload } from '$lib';
    import { supabaseStore } from '$lib';
    
    import Button from '$lib/Component/Button.svelte';
	import { generateCode } from '$lib/Helpers/generateCode';
	import type { Repos } from '$lib/types';
    import { FileDropzone, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
    
    export let repo: Repos;
    
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
        newUnitName: "",
        newContactNumb: "",
        newCondition: "",
    }

    let files: FileList | undefined;

    const handleUpdate = async () =>
    {
        
        if(files){
            if(dsComp.newUnitName.trim().length > 3){
                if(dsComp.newContactNumb.trim().length > 10){
                    if(dsComp.newUnitName.trim().length > 3){
                        dsComp.loader = true;
                        const {data, error:err} = await $supabaseStore.storage.from("annapolis_bucket").update(repo.img_path, files[0], {
                            cacheControl: '0',
                            upsert: true,
                            
                        })
                        if(data){
                            const {data:{publicUrl}} = $supabaseStore.storage.from("annapolis_bucket").getPublicUrl(data.path);

                            const {error:inErr} = await $supabaseStore.from("repo_tb").update({
                                unit_name: dsComp.newUnitName,
                                seller_contact_num: dsComp.newContactNumb,
                                unit_condition: dsComp.newCondition,
                                unit_img: `${publicUrl}?${generateCode(5)}`,
                                img_path: data.path,
                            }).eq("uid", repo.uid);

                            if(!inErr){
                                const {data, error:err} = await $supabaseStore.from("repo_tb").select("*");
                                if(data){
                                    $repos = data as Repos[];
                                    createToast("Update success", false);
                                    dsComp.loader = false;
                                    showUpdate.set(0.1);
                                }else if(err){
                                    createToast(err.message, true);
                                    dsComp.loader = false;
                                    showUpload.set(false);
                                }
                                
                            }



                        }else if(err){
                            createToast(err.message, true);
                            dsComp.loader = false;
                        }
                        

                    }else{
                        createToast("Must select the designated newCondition.", true);
                    }
                }else{
                    createToast("Not valid contact number.", true);
                }
            }else{
                createToast("Not valid unit name.", true);
            }
        }else{
            createToast("Must pick a unit photo.", true);
        }



    }


</script>

<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#000000b6] p-2">
    <div class="mx-auto sm:max-w-xl min-h-screen flex flex-col justify-center" transition:scale>
        <div class="card p-4 flex flex-col gap-2 shadow-lg shadow-black bg-slate-100">
            <h4 class="h4 text-center text-red-500">Updating profile of <b class="text-black font-normal">{repo.unit_name}</b></h4>
            
            <div class="flex flex-col">
                <small class="text-center text-red-500">Photo size must not be greater than 200KB. We recommend to use .webp extention</small>
                <small>Unit Photo:</small>
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
                <small>Unit Name:</small>
                <input name="newUnitName" type="text" class="input" bind:value={dsComp.newUnitName}/>
            </label>

            <label>
                <small>Seller Contact Number:</small>
                <input name="newContactNumb" type="text" class="input" bind:value={dsComp.newContactNumb}/>
            </label>

            <label>
                <small>Condition:</small>
                <select name="newCondition" class="select" bind:value={dsComp.newCondition}>
                    <option>Very Poor Condition - 1 Star</option>
                    <option>Poor Condition - 2 Stars</option>
                    <option>Not Bad Condition - 3 Stars</option>
                    <option>Good Condition - 4 Stars</option>
                    <option>Very Good Condition - 5 Stars</option>
                </select>
            </label>

            <div class="flex gap-2 mt-2">
                <Button style="bg-[#01009F] p-2 text-white rounded-lg" loader={dsComp.loader} loader_name="Updating." name="Update" on:click={handleUpdate}/>
                <Button style="bg-red-500 p-2 text-white rounded-lg" name="Cancel" on:click={() => showUpdate.set(0.1)}/>
            </div>
            
        </div>
    </div>
</div>