<script>
    export let particles;
    console.log("In BOX comp", particles)
</script>

<ul>
    {#each particles as particle}
        <li>Name:{particle.name}</li>
        {console.log("In box Each running", particle)}
    {/each}
</ul>
