<script>

  	import { fade } from "svelte/transition";
  	import { onMount } from "svelte";
  	import FaArrowAltCircleDown from 'svelte-icons/fa/FaArrowAltCircleDown.svelte'

  	let showIntro = true;

  	onMount( () => {
  		showIntro = true;
  	});

	let ingress = 'Find out who I am, my journey and values. When I lived in England and walked in with the English national team in a game vs Sweden. Or when ate a scorpion with a random German traveling alone in Bangkok. But mostly, when I first learned coding and a new world opened up!';

	let intro = [
		'A developer.',
		'A creator.',
		'But to most people, a friend.'
	];

</script>

<style>

	row {
		display: flex;
	}

	.col-1 {
	  /* The image used */
	  background-image: url("../william.jpeg");

	  /* Full height */
	  height: 100%;
	  width: 80%;

	  /* Center and scale the image nicely */
	  background-position: center;
	  background-repeat: no-repeat;
	  background-size: cover;
	}

	.col-2 {
		width: 60%;
		padding: 20px;
		padding-left: 50px;
	}

	.icon {
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100vw;
		margin-bottom:10px;
    	z-index: 1;
	}	

	.icon:hover {
		height: 70px;
		padding-top: 20px;
		cursor: pointer;
		color: #333;
	}

	.intro-container {
		margin-top: 70px;
	}

	.icon :global( svg ) {
		fill: white;
	}

</style>

<svelte:head>
	<title>WF</title>
</svelte:head>

	<row style="height:100vh">
		<div class="col-1"></div>

		<div class="col-2">
			{#each intro as text}
				<h1>{text}</h1>
			{/each}

			<p> {ingress} </p>

		</div>
	</row>

	<div class="icon">
		<a href="/projects">
			<FaArrowAltCircleDown />
		</a>
	</div>