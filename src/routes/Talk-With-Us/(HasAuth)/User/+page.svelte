<script lang="ts">
	import { activeItem, chatStore, sessionStore, supabaseStore } from "$lib";
	import { getTimeDateOnly } from "$lib/Helpers/dateConvert";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
	import type { PageServerData } from "./$types";

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

    export let data: PageServerData;

    const getChats = async () =>
    {
        const {data, error:err} = await $supabaseStore.from("chats_tb").select("*").eq("origin_uid", $sessionStore?.user.id);
        
        if(data){
            $chatStore = data
        }else if(err){
            createToast(err.message, true);
        }

    }

    const channels = $supabaseStore.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chats_tb' },
        (payload) => {
            getChats();
        }
    )
    .subscribe()
    
    onMount(() => {
        $activeItem = "/Talk-With-Us/Login";
        if(data.status === 200){
            $chatStore = data.data
        }else if(data.status === 402){
            $chatStore = data.data;
        }

    });

    const dsComp = {
        sendBtnState: false,
        messageStore: "",
        
    }

    const handleSendChat = async () =>
    {
        dsComp.sendBtnState = true;
        const {error:err} = await $supabaseStore.from("chats_tb").insert([{
            origin_uid: $sessionStore?.user.id,
            email: $sessionStore?.user.email,
            host_name: $sessionStore?.user.user_metadata.fullname,
            host_chat: dsComp.messageStore,
        }]);

        if(err){
            createToast(err.message, true);
            dsComp.sendBtnState = false;
        }else{
            createToast("Message sent", false);
            dsComp.sendBtnState = false;
            dsComp.messageStore = "";

        }
    }
</script>

<div class="p-4">
    <!--CHAT SCREEN-->
    <div class="h-[70vh] border-[0.1rem] sm:max-w-[80%] mx-auto rounded-lg overflow-auto border-slate-500 p-4 flex flex-col gap-4">

        {#each $chatStore ?? [] as chat }
            <div class="card p-2">
                <div class="flex gap-2 items-center">
                    <p class="font-bold">{chat.host_name.split(",")[0].trim()}</p>
                    {#if !(chat.email === $sessionStore?.user.email)}
                        <small class="text-green-500">Admin <i class="text-red-500">Replied</i></small>
                    {/if}
                </div>
                <p class="p-2">{chat.host_chat}</p>

                <div class="flex justify-center">
                    <small class="opacity-50">{getTimeDateOnly(chat.created_at)}</small>
                </div>
            </div>
        {/each}

    </div>

    <div class="sm:max-w-[80%] mx-auto mt-5">
        <div class="input-group grid-cols-[1fr_auto] rounded-lg">
            <textarea
                bind:value={dsComp.messageStore}
                class=" border-0 ring-0"
                name="prompt"
                id="prompt"
                placeholder="Write a message..."
                rows="1"
            />
            <button class="transition-all {dsComp.messageStore.trim().length > 0 ? "bg-green-500" : "bg-red-500"} text-white"
            disabled={(dsComp.messageStore.trim().length > 0 ? false : true) || dsComp.sendBtnState}
            on:click={handleSendChat}
            >
            {dsComp.sendBtnState ? "Sending" : "Send"}
            
            </button>
        </div>                  
    </div>

    
    
</div>