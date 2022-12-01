<script>
    import Box from "../components/Box.svelte";
    export let active_particles;

    let simulationStatus = true; 

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
    
    $: {

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
        simulationStatus = false;
    }

    /*
    function handleClickRandom() {
        console.log("LEFT",boxLeft.length, boxLeft,);
        console.log("RIGHT",boxLeft.length, boxLeft,);
        for (let i = 0; i < boxLeft.length; i++) {            
            let side = randomBox(1, 3);
            console.log("loop i:", i, "side:", side)
            if (side === 1){
                boxRight.push(particles[i]);
                console.log("Left after", boxLeft)
                console.log("pusing", particles[i])
            }
        }
        console.log("LEFT AFTER",boxLeft.length, boxLeft,);
        console.log("RIGHT AFTER",boxLeft.length, boxLeft,);  
        boxLeft = boxLeft;
        boxRight = boxRight;
    }
    */

    /*
    function handleClickRandom() {
        // Resets the current boxes, Dont delete nr 1
        // Left box
        for (let i = 0; i < boxLeft.length; i++) {
            if (boxLeft[i][0].id !== 1) {
                delete boxLeft[i];   
            }
        }
        // Right box
        for (let i = 0; i < boxRight.length; i++) {
            if (boxRight[i][0].id !== 1) {
                delete boxRight[i];   
            }
        }
        // Re-distribute the particles throug random
        for (let particle = 1; particle < active_particles; particle++) {
            console.log("current i:", particle);
            let side = randomBox(1, 3);
            if (side === 1){
                boxLeft.push(particles[particle-1]);
                console.log("L push", particles[particle-1])
                boxLeft = boxLeft;
            }
            else {
                boxRight.push(particles[particle-1]);
                console.log("R push", particles[particle-1])
                boxRight = boxRight;
            };
        }
	}
    */
    
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
