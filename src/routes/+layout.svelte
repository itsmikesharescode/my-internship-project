<script lang="ts">
	import Nav from '$lib/Component/Nav.svelte';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { sessionStore, supabaseStore } from '$lib';
	import Footer from '$lib/Component/Footer.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	export let data: LayoutData;

	onMount( () => {
		
		$sessionStore = data.session;
		$supabaseStore = data.supabase;
	})
	
</script>

<Toast transitions={true} position="br" rounded="rounded-2xl" max={10}/>
<Nav />
<slot />

<Footer />
