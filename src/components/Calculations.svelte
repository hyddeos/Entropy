<script>
	import { current_component, element } from "svelte/internal";
    export let active_particles;
    export let boxLeft;
    export let boxRight;

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
    Calc Tot: {active_particles}

   <p>Current: { currentEntropy } nr of diffent combinations is possible for this state</p> 

</div>