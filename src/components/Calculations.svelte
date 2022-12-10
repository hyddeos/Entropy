<script>
	import { current_component, element } from "svelte/internal";
    export let active_particles;
    export let boxLeft;

    let currentEntropy = 0;

    // Factorial
    function f(n) {
        return (n != 1) ? n * f(n - 1) : 1;
    }

    $: {
        if (boxLeft.length > 0) {
            if (active_particles - boxLeft.length > 0) {
                let tot = f(active_particles) / (f(boxLeft.length) * f(active_particles - boxLeft.length) ) ;
                currentEntropy = tot
            }
            else {
                currentEntropy = 1
            }
            }
    }
   
	
</script>

<div class="text-center">
   <h4 class="my-1 text-xl"><strong class="bold underline decoration-success">{ currentEntropy }</strong> possible {#if currentEntropy === 1} configuration{:else} configurations{/if}*</h4>
   <p class="my-1" > </p>
</div>