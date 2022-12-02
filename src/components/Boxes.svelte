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
    
    $: {
        // USING THE PARTICLE COUNTER
        // If there is an increase(+) in particles 
        if ( tempCounter <= active_particles ) {         
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

    function stopSimulation() {
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
        startSimulation();
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

<div class="flex justify-center items-center ">
    <button id="btnMaxi" class="bg-primary text-base-400 text-xl h-8 w-24 rounded-lg" on:click={stopSimulation}>Random</button>
</div>
<div class="my-2 flex justify-center items-center">
    <div class="py-3">        
        {#if simulationStatus}<Box particles={boxLeft} status={simulationStatus}/>{:else}<Box status={simulationStatus}/>{/if}
        <h3 class="text-center text-l font-semibold text-base-300">LEFT BOX</h3>
    </div>
    <div class="bg-base-400 w-10 h-60 static">
        <div class="w-1 h-60 border-l-2 border-dashed border-neutral/50 absolute ml-5"></div> 
    </div>
    <div class="py-3">
        {#if simulationStatus}<Box particles={boxRight} status={simulationStatus}/>{:else}<Box status={simulationStatus}/>{/if}
        <h3 class="text-center text-l font-semibold text-base-300">RIGHT BOX</h3>
    </div>
</div>
