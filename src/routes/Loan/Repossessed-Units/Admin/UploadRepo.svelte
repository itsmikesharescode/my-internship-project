<script lang="ts">
	import { repos, showUpload } from '$lib';
    import { supabaseStore } from '$lib';
    
    import Button from '$lib/Component/Button.svelte';
	import type { Repos } from '$lib/types';
    import { FileDropzone, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { scale } from 'svelte/transition';
        

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
        unitName: "",
        contactNumb: "",
        condition: "",
    }

    let files: FileList | undefined;

    const handleUpload = async () =>
    {
        
        const uid = uuidv4();
        if(files){
            if(dsComp.unitName.trim().length > 3){
                if(dsComp.contactNumb.trim().length > 10){
                    if(dsComp.unitName.trim().length > 3){
                        dsComp.loader = true;
                        const { data, error:err } = await $supabaseStore.storage.from("annapolis_bucket").upload(`repos/${uid}`, files[0], {
                            cacheControl: '0',
                            upsert: false,
                            
                        });
                        if(data){
                            const {data:{publicUrl}} = $supabaseStore.storage.from("annapolis_bucket").getPublicUrl(data.path);
                            
                            const { error:inErr } = await $supabaseStore.from("repo_tb").insert([
                                {
                                    uid: uid,
                                    unit_img: publicUrl ? publicUrl : "No url",
                                    unit_name: dsComp.unitName,
                                    seller_contact_num: dsComp.contactNumb,
                                    unit_condition: dsComp.condition,
                                    img_path: data.path,
                                }
                            ])
                            if(!inErr){
                                const {data, error:err} = await $supabaseStore.from("repo_tb").select("*");
                                if(data){
                                    $repos = data as Repos[];
                                    createToast("Upload success.", false);
                                    dsComp.loader = false;
                                    showUpload.set(false);
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
                        createToast("Must select the designated condition.", true);
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
    <div class="mx-auto sm:max-w-xl min-h-screen flex flex-col justify-center " transition:scale>
        <div class="card p-4 flex flex-col gap-2 shadow-lg shadow-black bg-slate-100">
            <h4 class="h4 text-center">Upload Repossessed Units</h4>
            
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
                <input name="unitName" type="text" class="input" bind:value={dsComp.unitName}/>
            </label>

            <label>
                <small>Seller Contact Number:</small>
                <input name="contactNumb" type="text" class="input" bind:value={dsComp.contactNumb}/>
            </label>

            <label>
                <small>Condition:</small>
                <select name="condition" class="select" bind:value={dsComp.condition}>
                    <option>Very Poor Condition - 1 Star</option>
                    <option>Poor Condition - 2 Stars</option>
                    <option>Not Bad Condition - 3 Stars</option>
                    <option>Good Condition - 4 Stars</option>
                    <option>Very Good Condition - 5 Stars</option>
                </select>
            </label>

            <div class="flex gap-2 mt-2">
                <Button loader={dsComp.loader} loader_name="Uploading." name="Upload" on:click={handleUpload}/>
                <Button style="bg-red-500 p-2 text-white rounded-lg" name="Cancel" on:click={() => showUpload.set(false)}/>
            </div>
            
        </div>
    </div>
</div>