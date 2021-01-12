<script>

  	import { blur, fly } from "svelte/transition";
  	import { onMount } from "svelte";

  	let showIntro = false;

  	onMount( () => showIntro = true );

		let ingress = [
			"I'm a very positive, curious and happy person. I think that's why I lived in London and Taiwan, traveled alone in Asia and been very involved in the student life at the Royal Institute of Technology. I've been eating scorpions on the streets of Bangkok and participating as a mascot at Old Trafford in a game between Sweden and England. I like to meet new people and put myself in new situations.",
			"Maybe it's all these things that made me a software developer, a good one. I think creativity and curiosity is very important along with precision and an eye for design. I think my calm personality together with my eager for learning new things took me here and will take me even further!"
			];
 
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
		height: 50px;
		width: 100vw;
		margin-bottom: 20px;
  	z-index: 1;
  	text-align: center;
  	position: fixed;
  	bottom: 0;
	}	

	.icon a {
		background-color: white;
    border-radius: 40px;
    padding: 8px 30px 8px 30px;
    text-decoration: none;
    color: cadetblue;
    font-size: 20px;
	}

	.icon a:hover {
		background-color: cadetblue;
    color: white;
    font-size: 22px;
  }

	.intro-container {
		height: 100vh;
	}

	.intro-text-mobile {
		display: none;
	}
	h1 {
		text-shadow: 2px 2px black;
		font-size: 50px;
	}
	p {
		font-size: 20px;
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

	@media( min-width: $large-desktop ) {
		h1 {
			font-size: 60px;
		}
		p,a {
			font-size: 25px;
		}
	}

	@media( max-width: $desktop-width ) {
		h1 { 
			font-size: 40px;
		}
		p {
			font-size: 17px;
		}
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
		    margin-left: -5%;
		    margin-right: -5%;
			}
			.mobile-ingress {
				margin-top: 50%;
			}
		}
	}

</style>

<svelte:head>
	<title>William Friefeldt</title>
</svelte:head>

	<row class="intro-container">
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
						<div class="mobile-ingress" transition:fly|local="{{ y:50, duration: 1500, delay: 4500 }}"> 
							<p>{ingress[0]}</p>
							<p>{ingress[1]}</p> 
						</div>
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
					<div transition:fly|local="{{ y:50, duration: 1500, delay: 4500 }}"> 
						<p>{ingress[0]}</p>
						<p>{ingress[1]}</p> 
					</div>
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