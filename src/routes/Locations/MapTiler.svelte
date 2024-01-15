<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { Map, NavigationControl, Marker } from 'maplibre-gl';

    import 'maplibre-gl/dist/maplibre-gl.css';

    export let latitude: number;
    export let long: number;
    
    let map:any;
    
    let mapContainer:any;

    const apiKey = 'pRTpI0AmE8HUsHEDxY42';

    onMount( async () => {
        const initialState = { lng: long, lat: latitude, zoom: 16 };
    
        map = new Map({
            container: mapContainer,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });

        new Marker({color: "#FF0000"})
            .setLngLat([long, latitude])
            .addTo(map);


    });

    

</script>

<div class="">
  <div class="absolute h-[50vh] rounded-xl shadow-lg shadow-black" bind:this={mapContainer}></div>
</div>

<style>
  

</style>