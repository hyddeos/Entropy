<script>
    export let particles;
    console.log("In BOX comp", particles)
</script>
<div>
    <ul>
        {#each particles as particle}
            <li>Name: {particle[0].name}</li>
        {/each}
    </ul>
</div>

