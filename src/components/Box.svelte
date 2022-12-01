<script>
	import { element } from "svelte/internal";
    export let particles;
	export let status;	

	// Gets a random for particle placement
	function randomNumber() {
		return Math.floor(Math.random() * (88 - 0) + 1);
	};
	
</script>


<div class="bg-base-400 w-96 h-96 relative rounded-lg">
	{#if status}
		{#each particles as particle}
		<div style:background={particle[0].color} style:left="{randomNumber()}%" style:top="{randomNumber()}%" 
			class="h-10 w-10 rounded-full absolute text-center text-neutral flex justify-center items-center">
			<strong><p class="align-text-bottom">{particle[0].id}</p></strong>		
		</div>
		{/each}
	{/if}
</div>



