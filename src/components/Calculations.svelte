<script>
    export let active_particles;
    export let boxLeft;

    let currentEntropy = 0;

    // Recursive factorial function that correctly handles n=0
    function f(n) {
        if (n < 0) return 0; // Guard against negative numbers
        return (n > 1) ? n * f(n - 1) : 1;
    }

    $: {
        let n = active_particles;
        let k = boxLeft.length;
        
        // The number of microstates (Ω) for a given macrostate (k particles in one box, n-k in the other)
        // is given by the binomial coefficient "n choose k".
        // Ω = n! / (k! * (n-k)!)
        if (n >= k && k >= 0) {
             currentEntropy = f(n) / (f(k) * f(n - k));
        } else {
             // This case should ideally not be reached in normal operation.
             currentEntropy = 0;
        }
    }
</script>

<div class="text-center">
   <h4 class="my-1 text-xl"><strong class="bold underline decoration-success">{ currentEntropy }</strong> possible {#if currentEntropy === 1} configuration{:else} system configurations{/if} like this.</h4>
   <p class="my-1" >The number of other possible configurations that has the same number of particles on each side. </p>
</div>
