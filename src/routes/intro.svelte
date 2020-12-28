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

<style lang="scss">

	@import '../../static/_variables.scss';

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

	.intro-text-mobile {
		display: none;
	}
	h1 {
		text-shadow: 2px 2px black;
	}
	.title-0 {
		color: wheat;
	}
	.title-1 {
		color: whitesmoke;
	}
	.title-2 {
		color: cadetblue;
	}

	@media( max-width: $tablet-width ) {
		.col-2 {
			display: none;
		}
		.col-1 {
			width: 100%;
		}
		.intro-text-mobile {
			display: block;
			width: 80%;
			margin: 10%;
			margin-top: 60px;
			p {
				color: white;
			    text-shadow: 2px 2px black;
			    background: teal;
			    padding: 20px;
			    position: absolute;
			    bottom: -20px;
			    right: -1px;
			    left: -1px;
			}
		}
	}

</style>

<svelte:head>
	<title>WF</title>
</svelte:head>

	<row style="height:100vh">
		<div class="col-1">
			<div class="intro-text-mobile">
				{#each intro as text, i}
					<h1 class="title-{i}">{text}</h1>
				{/each}
				<p> {ingress} </p>
			</div>
		</div>

		<div class="col-2">
			{#each intro as text, i}
				<h1 class="title-{i}">{text}</h1>
			{/each}

			<p> {ingress} </p>

		</div>
	</row>

	<div class="icon" style="display:none">
		<a href="/projects">
			<FaArrowAltCircleDown />
		</a>
	</div>