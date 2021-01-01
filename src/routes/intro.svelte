<script>

  	import { blur, fly } from "svelte/transition";
  	import { onMount } from "svelte";
  	import FaArrowAltCircleDown from 'svelte-icons/fa/FaArrowAltCircleDown.svelte'

  	let showIntro = false;

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
		width: 70%;
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
		    bottom: 75px;
		    right: 20px;
		    left: 20px;
			}
		}
	}

</style>

<svelte:head>
	<title>WF</title>
</svelte:head>

	<row style="height:100vh">
			{#if showIntro}	
				<div class="col-1">
					<div class="intro-text-mobile">
						<h1 class="title-0"
							transition:blur|local="{{ duration: 2000, delay: 0 }}">
							{intro[0]}
						</h1>
						<h1 class="title-1"
							transition:blur|local="{{ duration: 2000, delay: 1500 }}">
							{intro[1]}
						</h1>
						<h1 class="title-2"
							transition:blur|local="{{ duration: 2000, delay: 3000 }}">
							{intro[2]}
						</h1>
						<p transition:fly|local="{{ y:50, duration: 1500, delay: 4500 }}"> 
							{ingress} 
						</p>
					</div>
				</div>

				<div class="col-2">
					<h1 class="title-0"
						transition:blur|local="{{ duration: 2000, delay: 0 }}">
						{intro[0]}
					</h1>
					<h1 class="title-1"
						transition:blur|local="{{ duration: 2000, delay: 1500 }}">
						{intro[1]}
					</h1>
					<h1 class="title-2"
						transition:blur|local="{{ duration: 2000, delay: 3000 }}">
						{intro[2]}
					</h1>
					<p transition:fly|local="{{ y:50, duration: 1500, delay: 4500 }}"> 
						{ingress} 
					</p>
				</div>
			{/if}
	</row>
	{#if showIntro}
		<div class="icon"
			 transition:blur|local="{{ duration: 1500, delay: 6000 }}">
			<a href="/projects">
				See my portfolio
			</a>
		</div>
	{/if}