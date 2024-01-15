<script lang="ts">
	import { activeItem, chatStore, supabaseStore, sessionStore, targetID } from "$lib";
    import { onMount } from "svelte";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { getTimeDateOnly } from "$lib/Helpers/dateConvert";
	import UsersList from "./UsersList.svelte";

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


    onMount(() => {
        $activeItem = "/Talk-With-Us/Login";
        
    });

    const dsComp = {
        sendBtnState: false,
        messageStore: "",
        showUsers: false,
        mainChatH: "h-[70vh]",
        
    }

    const handleSendChat = async () =>
    {
        dsComp.sendBtnState = true;
        const {error:err} = await $supabaseStore.from("chats_tb").insert([{
            origin_uid: $targetID,
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
    
    const handleShowUsers = () =>
    {
        dsComp.showUsers = !dsComp.showUsers;
    }



</script>

<div class="p-4">
    <!--CHAT SCREEN-->
    <div class="transition-all {dsComp.showUsers ? "h-[50vh]" : "h-[70vh]"} border-[0.1rem] sm:max-w-[80%] mx-auto rounded-lg overflow-auto border-slate-500 p-4 flex flex-col gap-4 ">

        {#each $chatStore ?? [] as chat }
            <div class="card p-2">
                <div class="flex gap-2 items-center">
                    <p class="font-bold">{chat.host_name.split(",")[0].trim()}
                    {#if chat.email === $sessionStore?.user.email}
                        <small class="text-green-500">Admin</small>
                    {/if}
                    </p>
                </div>
                <p class="p-2">{chat.host_chat}</p>

                <div class="flex justify-center">
                    <small class="opacity-50">{getTimeDateOnly(chat.created_at)}</small>
                </div>
            </div>
        {/each}


        
    </div>

    <div class="sm:max-w-[80%] mx-auto mt-2">
        <button class="transition-all px-2 {dsComp.showUsers ? "bg-red-500" : "bg-green-500"} text-white rounded-lg" on:click={handleShowUsers}>{dsComp.showUsers ? "Close" : "Show users"}</button>
    </div>

    <div class="transition-all {dsComp.showUsers ? "block" : "hidden"} h-[15vh] mt-5  sm:max-w-[80%] mx-auto   p-2 flex flex-col gap-4">
        <UsersList />
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