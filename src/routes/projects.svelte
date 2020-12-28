<script>

	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	import Computer from "../components/Computer.svelte";
	import Phone from "../components/Phone.svelte";
	import IPad from "../components/iPad.svelte";

	let showItems = false;

	onMount( () => showItems = true );

</script>

<style lang="scss">

	@import '../../static/_variables.scss';

	.projects-info-container {
		display: flex;
 		align-items: center;
 		justify-content: center;
	}
	.projects-info{
		padding: 20px;
		width: 400px;
  		box-shadow: 0 5px 20px 0 rgba(0,0,0,.2);
  		height: 113px;
  		margin-top: 200px;
  		p {
  			margin-block-start: 0;
  		}
	}

	@media( max-width: $tablet-width ) {
		.projects-info {
		    width: auto;
		    margin-top: 50px;
		    margin-left: 145px;
		    box-shadow: none;
		    margin-right: 10px;
		    font-size: 3.5vw;
		}
	}
</style>


<div class="projects-container">

	{#if showItems}
		<div transition:fade|local="{{ duration: 1000, delay: 2000 }}">
			<Phone/>
		</div>

		<div class="projects-info-container"
			 transition:fade|local="{{ duration: 1000, delay: 1000 }}">
			<div class="projects-info">
				<p>
					I've been developing web applications for busniess, for government, for startup
					and of course for fun. Using different technologies, a creative mind and talented 
					colleagues I've manage to create smooth and responsive applications for both desktop 
					and mobile. I will now share some of my most successful projects!
				</p>
			</div>
		</div>

		<div transition:fade|local="{{ duration: 1000, delay: 4000 }}">
			<IPad />
		</div>

		<div transition:fade|local="{{ duration: 1000, delay: 3000 }}">
			<Computer />
		</div>
	{/if}
</div>