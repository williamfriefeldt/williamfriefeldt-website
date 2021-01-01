<script>

  	import { fade } from "svelte/transition";
  	import { onMount } from "svelte";

  	import FaArrowAltCircleDown from 'svelte-icons/fa/FaArrowAltCircleDown.svelte'
	import GridMenu from '../components/GridMenu.svelte';

	/* Text variables */
	let introText = [
		{ text: 'Hi there!', wait: 0},
		{ text: 'I\'m William Friefeldt.', wait: 12},
		{ text: 'And this is my website.', wait: 34}
	];

	let showStart= false;
	let animationDone = false;

	let waitTime = 200;

  	onMount( () => showStart = true );

	let pageTitle = 'William Friefeldt';

	let segment = '';

</script>

<style lang="scss">
	
	@import '../../static/_variables.scss';

	.start-page-background {
		background-image: url("../start-page-background.jpg");
		height: 100%;
		width: 100%;
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;	
	}

	.intro-text-container {
		position: sticky;
		top: 125px;
		h1 {
			margin-top: 0;
			width: 100%;
			text-shadow: 2px 2px black;
			color: white;
			text-align: center;
			padding-top: 20px;
			font-weight: 300;
		}
	}

	.icon {
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100vw;
		margin-bottom:10px;
  	z-index: 1;
  	text-align: center;
	}	

	.icon a {
		background-color: white;
    padding: 15px;
    border-radius: 40px;
    border: 2px solid cadetblue;
    text-decoration: none;
    color: cadetblue;
    font-size: 20px;
	}

	.icon a:hover {
		background-color: cadetblue;
    border: 2px solid white;
    color: white;
	}

	.intro-container {
		margin-top: 70px;
	}

</style>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

	<div style="height:105vh">
		<div class="start-page-background">

			<div class="intro-text-container">
				{#each introText as introLine, j}
					<h1>
						{#each introLine.text as char, i}
							{#if showStart}
								<span transition:fade|local="{{ delay: waitTime + waitTime * i + introLine.wait * waitTime }}"
									on:introend="{() => {
										if(i === 22) animationDone = true;
									}}">
										{char[0]}
								</span>
							{/if}
						{/each}
					</h1>
				{/each}		
			</div>

		</div>	
	</div>

	{#if animationDone}
		<div class="icon">
			<a href="/intro">
				Who am I?
			</a>
		</div>
	{/if}
	