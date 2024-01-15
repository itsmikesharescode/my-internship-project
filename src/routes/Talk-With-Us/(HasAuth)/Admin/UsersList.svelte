<script lang="ts">
    import { chatStore, supabaseStore, targetID, usersList } from "$lib";
	import { onMount } from "svelte";

    const getUsersList = async () =>
    {
        const {data, error} = await $supabaseStore.from("created_users_tb").select("*");
        if(data){
            $usersList = data;
        }else if(error){

        }
    }

    

    const handleGetCurrentChat = async (userId: string) =>
    {
        targetID.set(userId);
        const {data, error:err} = await $supabaseStore.from("chats_tb").select("*").eq("origin_uid", userId);
            if(data){
                $chatStore = data;
            }else if(err){
                console.log(err.message);
            }
    }

    
    
    const channels = $supabaseStore.channel('custom-insert-channel')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'created_users_tb' },
        (payload) => {
            getUsersList();
        }
    )
    .subscribe()

    const chatsChannel = $supabaseStore.channel('custom-all-channel')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chats_tb' },
        (payload) => {
            handleGetCurrentChat($targetID);
        }
    )
    .subscribe()

    

    
    onMount( () => {
        getUsersList();
    })

    
</script>

<input type="search" class="input px-2 py-0 mx-auto sm:max-w-xl" placeholder="Search by name" />
<div class="flex flex-wrap gap-2 justify-center overflow-auto">
    {#each $usersList ?? [] as user }
        <button class="px-2 bg-green-500 rounded-lg text-white"
        on:click={() => handleGetCurrentChat(user.users_uid)}>{user.full_name}</button>
    {/each}
    
</div>