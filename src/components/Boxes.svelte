<script>
    import Box from "../components/Box.svelte";
    export let active_particles;

    let particles = [
		[{ id: 1, name: "p1", color: '#F15BB5' }],
		[{ id: 2, name: "p2", color: '#9B5DE5' }],
		[{ id: 3, name: "p3", color: '#FF4733' }],
		[{ id: 4, name: "p4", color: '#00BBF9' }],
		[{ id: 5, name: "p5", color: '#00F5D4' }],
        [{ id: 6, name: "p6", color: '#3B5BE9' }],
        [{ id: 7, name: "p7", color: '#F55757' }],
        [{ id: 8, name: "p8", color: '#8CE666' }],
        [{ id: 9, name: "p9", color: '#F0E100' }],
        [{ id: 10, name: "p10", color: '#B1B7D1' }],
	];

    let boxLeft = [];
    let boxRight = [];
    let tempCounter = active_particles

    let simulationStatus = true; 
    let minimized = false;
    
    $: {
        // USING THE PARTICLE COUNTER
        // If there is an increase(+) in particles 
        if ( tempCounter <= active_particles ) {
            if (minimized) {
                boxLeft.push(particles[active_particles-1]);
                boxLeft = boxLeft;
            }
            else {
                let side = randomBox(1, 3);
                if (side === 1){
                    boxLeft.push(particles[active_particles-1]);
                    boxLeft = boxLeft;
                }
                else {
                    boxRight.push(particles[active_particles-1]);
                    boxRight = boxRight;
                };
            }   

        }
        // If there is an decrease(-) in particles
        else {
            // Get the last Particel in each box
            let lastParticleLeft = boxLeft[boxLeft.length - 1]
            let lastParticleRight = boxRight[boxRight.length - 1]
            // If not any particles left, skip.
            if (!lastParticleLeft) {
                boxRight.pop();
                boxLeft = boxLeft;                
            }
            else if (!lastParticleRight) {
                boxLeft.pop();
                boxLeft = boxLeft;
            }
            // Compare which side has the highest numberded last particle and remove that one. 
            else {
                if ( boxLeft[boxLeft.length - 1][0].id > boxRight[boxRight.length - 1][0].id ) { 
                    boxLeft.pop();
                    boxLeft = boxLeft;
                }
                else {
                    boxRight.pop();
                    boxLeft = boxLeft;
                }
            }
        }
        // Update tempCounter for next irriation
        tempCounter = active_particles;
    }

    // For desideing into what box particles will go
    function randomBox(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    };

    function reRandom() {
        // Stop the simulation and reset varibles.
        simulationStatus = false;
        tempCounter = active_particles;
        active_particles = 0;
        boxLeft = [];
        boxRight = [];
        // Start re-randomize the particles
        for (let p = 0; p < tempCounter; p++) {            
            let side = randomBox(1, 3);
            if (side === 1){
                boxLeft.push(particles[p]);
                // If the last particle is here, delete it to avoid duplets
                if (p+1 === tempCounter){
                    boxLeft.pop();
                    }
                }
            else {
                boxRight.push(particles[p]);
                // If the last particle is here, delete it to avoid duplets
                if (p+1 === tempCounter){
                    boxRight.pop();
                    }
                }
        };
        // Update and the varibles and start the simulation again
        boxLeft = boxLeft;
        boxRight = boxRight;
        active_particles = tempCounter;
        enableMinimize();
        startSimulation();
    }

    function minimizeEntropy() {
        // Stop the simulation and reset varibles.
        simulationStatus = false;
        tempCounter = active_particles;
        active_particles = 0;
        boxLeft = [];
        boxRight = [];
        // Place all particles to the left-box(Min Entropy)
        for (let p = 0; p < tempCounter; p++) {
            boxLeft.push(particles[p]);
            // If the last particle is here, delete it to avoid duplets// If the last particle is here, delete it to avoid duplets
            if (p+1 === tempCounter){
                    boxLeft.pop();
                }
        }
        // Update and the varibles and start the simulation again
        boxLeft = boxLeft;
        active_particles = tempCounter;
        minimized = true;
        disableMinimize();
        startSimulation();
    }


    // Toggle the Minimize btn
    function enableMinimize(){
        document.getElementById("btnMiniEntropy").disabled = false;
    }
    function disableMinimize(){
        document.getElementById("btnMiniEntropy").disabled = true;
    }

    // Make a delay before starting to make sure the particles gets randomly placed again
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    async function startSimulation() {
        await delay(1);
        simulationStatus = true;
    }

    
</script>
<div class="basis-4/4 text-center my-1">
    <strong><p class="my-2">Entropy Mode</p></strong>
</div>
<div class="flex justify-center items-center bg-base-400 w-56 p-2 rounded-lg m-auto">    
    <button id="btnMiniEntropy" class="bg-info mx-2 text-base-400 text-xl h-8 w-32 rounded-lg disabled:opacity-50 hover:brightness-125" on:click={minimizeEntropy}>Minimize</button>
    <button id="btnRandom" class="bg-primary mx-2 text-base-400 text-xl h-8 w-32 rounded-lg hover:brightness-125" on:click={reRandom}>Random</button>
</div>
<div class="my-5 lg:flex lg:flex:wrap justify-center items-center">
    <div class="lg:py-3 max-lg:my-0 max-lg:flex justify-center">        
        {#if simulationStatus}<Box particles={boxLeft} status={simulationStatus}/>{:else}<Box status={simulationStatus}/>{/if}
        <h3 class="text-center text-l font-semibold text-base-300 max-lg:hidden">LEFT BOX</h3>
    </div>
    <div class="bg-base-400 lg:w-10 lg:h-60 max-lg:w-52 max-lg:h-5 max-lg:m-auto static ">
        <div class="lg:w-1 lg:h-60 lg:border-l-2 lg:ml-5 border-dashed border-neutral/50 absolute "></div> 
    </div>
    <div class="lg:py-3 max-lg:my-0 max-lg:flex justify-center">
        {#if simulationStatus}<Box particles={boxRight} status={simulationStatus}/>{:else}<Box status={simulationStatus}/>{/if}
        <h3 class="text-center text-l font-semibold text-base-300 max-lg:hidden">RIGHT BOX</h3>
    </div>
</div>
