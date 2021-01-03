<script>

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let projects = [
		{ name: 'Website', open: false, 
		  text1: 'At the website, the user can pick a podcast and then search for a word or a whole sentence. The result will all episodes where the phrase is mentioned. Not only that, the exact minute and a link to Spotify. To accomplish this, I build a website using the Javascript framework AngularJS and the database provider Firebase, both children of Google.',
		  text2: 'I worked with the MVC (Model-View-Controller) pattern to get a nice data representation of the podcasts and there episodes. To communicate with Firebase I used a service (factory, in AngularJS). With this pattern I could easily build a modal where users could add segments to the database. To get some help with the design and responsivness I used Bootstrap.',
		  images: [ 'angular.png' ] },
		{ name: 'App', open: false, images: [ 'angular.png' ] }, 
		{ name: 'Admin', open: false, images: [ 'angular.png' ] }, 
		{ name: 'AI', open: false, images: [ 'angular.png' ] }
	];
	let src = "angular.png";
	let showProjects = false;

	onMount( () => {
		showProjects = true;	
	});

</script>

<style lang="scss">

	@import '../../static/global.scss';

	.poddsok-description {
		margin-right: 40px;
		margin-top: 60px;
		margin-left: 40px;
	}

	.phone-placeholder {
		width: 300px;
		height: 480px;
		float: left;
	}

	.poddsok-projects {
		margin-top: 120px;
	}

	.poddsok-project {
	    background-color: #301934;
	    color: white;
	    cursor: pointer;
	    border-radius: 20px;
	    text-align: center;
	    margin: 2.5%;
	    box-shadow: -4px -1px 6px 4px lightslategrey;
	    padding: 30px 50px 30px 50px;
	}

	.poddsok-project-open {
		background-color: white !important;
		color: $poddsok-color;
		border: 3px solid $poddsok-color;
	}

	h1, h2 {
		color: $poddsok-color;
	}
	a {
		text-decoration: none;
	    color: white;
	    background-color: $poddsok-color;
	    padding: 3px;
	    border-radius: 5px;
	}

	a:hover {
		font-size: 18px;
	}

	p {
		line-height: 23px;
	}

	.poddsok-title-mobile {
		display: none;
	}
	.poddsok-project-title {
		margin-block-start: 0;
		margin-block-end: 0;	
		color: white;
		transition: all 2s;
	}
	.poddsok-project-title-open {
		color: $poddsok-color;
		margin-left: -90%;
	}
	.poddsok-project-content {
		max-height: 0px;
		transition: max-height 2s;
		overflow: auto;
		text-align: left;
	}

	.poddsok-project-content-open {
		max-height: 500px;
	}

	@media( max-width: $desktop-width ) {
		.poddsok-projects {
			margin-top: 40px;
		}
	}
	@media( max-width: $tablet-width ) {
		.phone-placeholder {
			width: 185px;
    		height: 225px;
		}
		.poddsok-title-mobile {
			display: block;
			margin-left: 185px;
		}
		.poddsok-title-desktop {
			display: none;
		}
		.poddsok-description {
			margin-top: 0px;
		}
		p {
			font-size: 3vw;
		}
	}
	@media( max-width: $large-phone ) {
		p {
			font-size: 3.5vw;
		}
		a:hover {
			font-size: 3.5vw;
		}
	}
</style>

<h2 class="poddsok-title-mobile"> Poddsök.nu </h2>

<div class="phone-placeholder"></div>

<div class="poddsok-description">
	<h1 class="poddsok-title-desktop"> Poddsök.nu </h1>
	<p>

		One of my first software projects was <a href="https://poddsok.nu" target="_blank">Poddsök.nu</a> . The idea came to me after listening to 300 episodes of Alex and Sigges podcast. How to find a segment you heard in a previous episode? I could not google it since it's not text. What if there was an app where you could search for words or sentences to find out where in the podcast they were mentioned?
		<br /> <br />
		It started with a single-page application built with AngularJS, the first framework I learned. Then I had to populate the site with podcasts and episodes. Luckliy, Spotify has an API for that. For this part I used Angular for the frontend and Node.js as a backend to authenticate to the API. Next, it was time to launch an iOS app. For this I used Apache Cordova to be able to reuse my codebase from the SPA.
		<br /> <br />
		You must now wonder, where do the searchable segments come from? In the beginning, users could add sentences mentioned on specific episodes in podcasts. Now, an AI project I choose to called Plysslingen is transcribing episodes. Using Google's speech-to-texy library with Python and the framework Flask the most relevants part are saved to files and later stored in the database.
	</p>

	<div class="poddsok-projects">
			{#each projects as project, i}
				{#if showProjects}
						<div class="poddsok-project"
							 on:mouseover={() => project.open = true}
							 on:mouseout={() => project.open = false}
							 class:poddsok-project-open={ project.open }
						 	 transition:fly|local="{{ x: -50, duration: 2000, delay: 3500 + i*1000 }}">

							<h2 class="poddsok-project-title"
								class:poddsok-project-title-open={ project.open }>
								{project.name}
							</h2>
							
								<div class="poddsok-project-content"
									 class:poddsok-project-content-open={ project.open }>
									<p>
										{project.text1} 
									</p>
									<div class="tech-pictures">
										{#each project.images as image}
											<img src="{image}" />
										{/each}
									</div>
									<p>
										{project.text2} 
									</p>
								</div>
								
						</div>
				{/if}
			{/each}
	</div>
</div>