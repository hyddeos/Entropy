<script>
	import { element } from "svelte/internal";
    export let active_particles;
    export let boxLeft;
    export let boxRight;

    $: {
        console.log("Left",  boxLeft.length)
        console.log("Right",  boxRight.length, typeof(boxRight))
    } 
   
	
</script>

<div class="text-center">
    Calc Tot: {active_particles}, Left: {boxLeft.length}, Right {boxRight.length}
    Current: 
</div>