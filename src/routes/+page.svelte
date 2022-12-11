<script>
    import Boxes from "../components/Boxes.svelte";
    import Info from "../components/Info.svelte";
    import Footer from "../components/Footer.svelte";

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
<div class="p-5">
    <div class="basis-4/4 text-center my-8">
        <h2 class="text-2xl center -my-2">Welcome to</h2>
        <h1 class="text-4xl text-primary font-bold center text-indigo-500">Entropy Control</h1>
        <h4 class="text-l center">An Interactive Visualization Of Entropy </h4>
    </div>
    <div class="basis-4/4 text-center my-0 justify-center">
        <strong><p class="my-2">Particle Counter</p></strong>
        <div class="flex justify-center items-center bg-base-400 w-36 p-2 rounded-full m-auto">
            <div class="w-10">
                <button id="btnMinus" disabled=true class="bg-info text-base-100 text-2xl rounded-full h-8 w-8 disabled:opacity-50 hover:brightness-125" on:click={handleClickMinus}>-</button>
            </div>
            <div class="w-12"><strong class="text-xl text-base-100">{active_particles}</strong></div>
            <div class="">
                <button id="btnPlus" class="bg-info text-base-100 text-2xl rounded-full h-8 w-8 disabled:opacity-50 hover:brightness-125"  on:click={handleClickPlus}>+</button>
            </div>
        </div>
    </div>

</div>
<div class="p-5">
    <div class="my-4">
        <Boxes active_particles={active_particles} />
        <Info />
    </div> 
</div>
<Footer />