<script>

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let projects = [
		'Website', 'App', 'Admin', 'AI'
	];

	let showProjects = false;

	onMount( () => {
		showProjects = true;	
	});

</script>

<style lang="scss">

	@import '../../static/global.scss';

	.poddsok-description {
		margin-left: 320px;
		margin-right: 40px;
		margin-top: 60px;
	}

	.poddsok-projects {
		margin-top: 100px;
	}

	.poddsok-project {
    background-color: #301934;
    color: white;
    cursor: pointer;
    border-radius: 20px;
    width: 80%;
    text-align: center;
    margin: 2.5%;
    box-shadow: -4px -1px 6px 4px lightslategrey;
    padding: 30px 50px 0px 50px;
    height: 100px;
    font-size: 30px;
	}

  .poddsok-project:hover {
  	font-size: 40px;
  	height: 120px;
  }

	h1 {
		color: $poddsok-color;
    text-align: center;
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

</style>

<div class="poddsok-description">
	<h1> Poddsök.nu </h1>

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
						 		 transition:fly|local="{{ x: -50, duration: 2000, delay: 3500 + i*1000 }}">
							{project}
						</div>
				{/if}
			{/each}
	</div>
</div>