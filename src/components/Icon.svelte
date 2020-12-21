<script>

	export let iconName;

	import IoIosCode from 'svelte-icons/io/IoIosCode.svelte'

</script>

<style>

	div :global(.icon) {
		width: 50%;
		text-align: center;
		background-color: red;
	}

</style>

{#if iconName === 'code'} <div ><IoIosCode class="icon"/></div> {/if}