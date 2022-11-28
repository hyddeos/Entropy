<script>
    import Box from "../components/Box.svelte";
    export let active_particles;

    let particles = [
		{ id: 1, name: "p1", color: '#F15BB5' },
		{ id: 2, name: "p2", color: '#9B5DE5' },
		{ id: 3, name: "p3", color: '#FEE440' },
		{ id: 4, name: "p4", color: '#00BBF9' },
		{ id: 5, name: "p5", color: '#00F5D4' },
        { id: 6, name: "p6", color: '#00F5D4' },
        { id: 7, name: "p7", color: '#F55757' },
        { id: 8, name: "p8", color: '#8CE666' },
        { id: 9, name: "p9", color: '#8CE666' },
        { id: 10, name: "p10", color: '#8CE666' },
	];
        
    let boxLeft = [];
    let boxRight = [];

    function randomBox(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    function handleClickRandom() {
        // Slice Particels depening on current active particels
        let liveParticles = particles.slice(0,active_particles)
        // Clear out boxes before random-process
        boxLeft = boxLeft.slice(0,0);
        boxRight = boxRight.slice(0,0);
        // Randomly place particles in a box
        liveParticles.forEach((particle, index) => {
            let side = randomBox(1, 3);
            if (side === 1){
                boxLeft.push(particle);
            }
            else {
                boxRight.push(particle);
            }
        });
        console.log("boxes", boxLeft, boxRight)
    }
    

</script>
<p>Currently {active_particles}</p>
<p>Random</p>
<button class="bg-info text-base-100 text-xl h-7 w-35" on:click={handleClickRandom}>Random</button>
<div>
    <Box particles={boxLeft}/><Box particels={boxRight} />
</div>
