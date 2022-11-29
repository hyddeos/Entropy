<script>
    import Box from "../components/Box.svelte";
    export let active_particles;

    let particles = [
		[{ id: 1, name: "p1", color: '#F15BB5' }],
		[{ id: 2, name: "p2", color: '#9B5DE5' }],
		[{ id: 3, name: "p3", color: '#FEE440' }],
		[{ id: 4, name: "p4", color: '#00BBF9' }],
		[{ id: 5, name: "p5", color: '#00F5D4' }],
        [{ id: 6, name: "p6", color: '#00F5D4' }],
        [{ id: 7, name: "p7", color: '#F55757' }],
        [{ id: 8, name: "p8", color: '#8CE666' }],
        [{ id: 9, name: "p9", color: '#8CE666' }],
        [{ id: 10, name: "p10", color: '#8CE666' }],
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
                boxLeft = boxLeft
            }
            else {
                boxRight.push(particles[active_particles-1]);
                boxRight = boxRight
            };
        }
        // If there is an decrease(-) in particles
        else {
            // Get the last Particel in each box
            let lastParticleLeft = boxLeft[boxLeft.length - 1]
            let lastParticleRight = boxRight[boxRight.length - 1]
            // 
            if (!lastParticleLeft) {
                console.log("No more Left")
                boxRight.pop();
            }
            else if (!lastParticleRight) {
                console.log("No more Right")
                boxLeft.pop();
            }
            else {
                if ( boxLeft[boxLeft.length - 1][0].id > boxRight[boxRight.length - 1][0].id ) {
                    console.log("Left is bigger")
                    boxLeft.pop();
                }
                else {
                    console.log("Right is bigger")
                    boxRight.pop();
                }
            }

        }
        tempCounter = active_particles;
        }


    // For desideing into what box particles will go
    function randomBox(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    };
    
</script>

<p>Currently {active_particles}</p>
<p>Random</p>

<div class="my-10">
        LEFT BOX:<Box particles={boxLeft}/>   RIGHT BOX:<Box particles={boxRight} />    
</div>
