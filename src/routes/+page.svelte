<script>
    import Boxes from "../components/Boxes.svelte";  

    // Number of particles 
    let active_particles = 1;
	function handleClickPlus() {
        active_particles += 1;
        document.getElementById("btnMinus").disabled = false;
        if (active_particles >= 10){
            document.getElementById("btnPlus").disabled = true;
        }     
    }
    function handleClickMinus() {
        active_particles -= 1;
        document.getElementById("btnPlus").disabled = false;
        if (active_particles <= 1){
            document.getElementById("btnMinus").disabled = true; 
        }
	}

</script>
<div>
    <h1 class="lowercase text-indigo-500">Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the docdwadaumentation</p>
    <p>ACTIVE particles: {active_particles}</p>

    <button id="btnMinus" disabled=true class="bg-info text-base-100 text-2xl rounded-full h-7 w-7 disabled:opacity-50" on:click={handleClickMinus}>-</button>
        {active_particles}
    <button id="btnPlus" class="bg-info text-base-100 text-2xl rounded-full h-7 w-7 disabled:opacity-50"  on:click={handleClickPlus}>+</button>
    <div>
        <Boxes active_particles={active_particles} />
    </div>
     
      
    
</div>

