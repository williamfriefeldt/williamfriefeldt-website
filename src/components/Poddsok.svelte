<script>

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';

	let projects = [
		{ name: 'Website', open: false, 
		  text1: 'At the website, the user can pick a podcast and then search for a word or a whole sentence. The result will all episodes where the phrase is mentioned. Not only that, the exact minute and a link to Spotify. To accomplish this, I build a website using the Javascript framework AngularJS and the database provider Firebase, both children of Google.',
		  text2: 'I worked with the MVC (Model-View-Controller) pattern to get a nice data representation of the podcasts and there episodes. To communicate with Firebase I used a service (factory, in AngularJS). With this pattern I could easily build a modal where users could add segments to the database. To get some help with the design and responsivness I used Bootstrap. One of the thoughest challenges was to create a filter that was able to filter through the different layers of podcast, episode, minute and finaly the text.',
		  text3: 'A great learning from this project was that it\'s better to be thorough from start than to redo everything along the way ;)',
		  images: [ 
		  	{ src: 'angular.png', text: 'AngularJS' },
		  	{ src: 'firebase.png', text: 'Firebase' },
		  	{ src: 'bootstrap.png', text: 'Bootstrap' }
			],
			code: 'poddsokApp.filter( "segmentFilter", function() { \n \t' + 'return ( input, searchText ) => {  \n\t\t' +
				'var returnArray = []; \n\t\t' + 'if( searchText !== undefined ){ \n\t\t\t' +
        '// Split on single or multi space \n\t\t\t' + 'var splitext = searchText.toLowerCase().split( /\s+/ ); \n\t\t\t' +
        '// Build Regexp with logicial ND \n\t\t\t' + 'var regexp_and = "(?=.*" + splitext.join( ")(?=.*" ) + ")"; \n\t\t\t' +
        '// Compile the regular expression \n \t\t\t' + 'var re = new RegExp( regexp_and, "i" ); \n \t\t\t' +
        'if( input !== undefined ) { \n\t\t\t\t' + 'for( var x = 0; x < input.length; x++ ) { \n\t\t\t\t\t' +
        'if( input[x].minutes !== undefined ) { \n\t\t\t\t\t\t' + 'for( var y = 0; y < input[x].minutes.length; y++ ) { \n\t\t\t\t\t\t\t' +
        'if( re.test( input[x].minutes[y].text ) ) { \n\t\t\t\t\t\t\t\t' + 'returnArray.push( input[x] ); \n\t\t\t\t\t\t\t\t' + 'break;' +
        '\n\t\t\t\t\t\t\t' + '}\n\t\t\t\t\t\t' + '}\n\t\t\t\t\t' + '}\n\t\t\t\t' + '}\n\t\t\t' + '}\n\t\t' + '}\n\t\t' + 
        'if( searchText === "" ) return input;\n\t\t' + 'return returnArray;\n\t' + '}\n' + '});'
		},
		{ name: 'Admin', open: false, 
			text1: 'Since I had no intention of adding all the podcasts and episodes into Firebase myself, I decided to build a website where I could fetch the episodes from an API and store them in the database. Here, Spotify\'s open API was a perfect match. I could both get all the episode AND their Spotify link so that the user open the episode where the word they search for was mentioned. Since Google is very productive, the Angular version was all ready at 9 (!) and I thought it was time for me to learn it.',
			text2: 'The difficulty with Spotify}\'s API is that it requires an access token which has to be resolved on a server. Thus, I build a simple NodeJS server for this server. When the token is set, query calls could be send to the API. For example, to fetch all new episodes as below written in TypeScript',
			text3: 'It was a wonderful feeling to be able to automate process of adding podcasts and to handle the UI with out a grid framework, like Bootstrap.',
			images: [ 
				{ src: 'angular.png', text: 'Angular' },
				{ src: 'material.png', text: 'Angular Material'},
				{ src: 'spotify.png', text: 'Spotify API' }
			], 
			code: 'callSpotify(): void {\n\t' + 'this.newEps = [];\n\t' + 'this.podcasts.forEach( ( pod, index ) => {\n\t\t' +
     				'if( pod.info.finished !== true) {\n\t\t\t' + 'this.spotifyService.searchPod( pod, 0 ).subscribe( ( res: any ) => {\n\t\t\t\t' +
            'const newEpisodes = this.sortNewEps( res.items, pod );\n\t\t\t\t' +
            'const latestEp = pod.episodes.length > 1 ?\n\t\t\t\t\t\t' + 'pod.episodes[ pod.episodes.length - 2 ]\n\t\t\t\t\t\t' + 
            ': { nr:0, name: \'Inga avsnitt\' };' +
            '\n\t\t\t\t' + 'if( newEpisodes.length > 0 && newEpisodes.length < 49 ) {\n\t\t\t\t' + 'this.newEps.push({\n\t\t\t\t\t' +
    				'title: pod.title,\n\t\t\t\t\t' + 'name: pod.info.name,\n\t\t\t\t\t' + 'podcast: pod,\n\t\t\t\t\t' + 'newEps: newEpisodes,\n\t\t\t\t\t' +
            'latestEp: latestEp.nr + \' - \' + latestEp.name\n\t\t\t\t' + '});\n\t\t\t' + '}\n\t\t' + '},\n\t\t' + 'err => {\n\t\t\t' +
  					'this.error = true;\n\t\t\t' + 'this.loading = false;\n\t\t' + '});\n\t' + '}\n\t' + '});\n\t' +
    				'this.newEps.sort( (a, b) => {\n\t\t' + 'return ( \'\' + a.name ).localeCompare( b.name );\n\t' + '});\n' + '}'
		},
		{ name: 'App', open: false, 
			text1: 'When I pitched the idea of Poddsök for my friends one of them said \'It has to be an app!\' Since I wasn\'t familiar with iOS development and Objective-C I wanted to find a way to reuse the codebase of the website. After some investigating I found Apache Cordova, a way to wrap the application in a native container', 
			text2: 'However, tiny adjustments had to be made. For example, some tweaking of the CSS to fit all different devices. The most tricky part was to make sure that the app was ready before loading Angular.',
			text3: 'It was really cool to create something other than a webb app but still be able to use the same codebase. I really think this is the future of app and webb development combined.',
			images: [ 
				{ src:'cordova.png', text: 'Apache Cordova' }
			], 
			code: 'var app = {\n\t' + '// Application Constructor\n\t' + 'initialize: function() {\n\t\t' +
        		'document.addEventListener(\'deviceready\', this.onDeviceReady.bind(this), false);\n\t' + '},\n\t\n\t' +
    				'// deviceready Event Handler\n\t' + '// Bind any cordova events here. Common events are:\n\t' +
    				'// \'pause\', \'resume\', etc.\n\t' + 'onDeviceReady: function() {\n\t\t' + 'this.receivedEvent(\'deviceready\');\n\t' +
    				'},\n\t\n\t' + '// Update DOM on a Received Event\n\t' + 'receivedEvent: function(id) {\n\t\t' +
        		'var parentElement = document.getElementById(id);\n\t\t' + 'var listeningElement = parentElement.querySelector(\'.listening\');\n\t\t' +
        		'var receivedElement = parentElement.querySelector(\'.received\');\n\t\t\n\t\t' +
        		'listeningElement.setAttribute(\'style\', \'display:none;\');\n\t\t' + 'receivedElement.setAttribute(\'style\', \'display:block;\');' +
        		'\n\t\t\n\t\tconsole.log(\'Received Event: \' + id);\n\t' +'}\n' + '};\n\n' + 'app.initialize();',
        	},
		{ name: 'AI', open: false, images: [ 'angular.png' ] }
	];
	
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
		margin-top: 12%;
	}

	.poddsok-project {
    background-color: #301934;
    color: white;
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
	code {
		line-height: 20px;
		white-space: pre-wrap;
		display: block;
		overflow-x: hidden;
		font-size: 13px;
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
		overflow-y: hidden;
		text-align: left;
	}
	.poddsok-project-content-open {
		max-height: 9999px;
	}
	img {
		width: 100px;
		height: 100px;
		margin: 20px;
	}
	.tech-pictures {
		justify-content: center;
		display: flex;
		p {
			text-align: center;
    	margin-block-end: 0;
    	margin-block-start: 0;
    	width: 140px;
		}
	}
	@media( min-width: $large-desktop ) {
		code {
			font-size: 20px;
			line-height: 35px;
		}
	}	
	@media( max-width: $desktop-width ) {
		.poddsok-projects {
			margin-top: 40px;
		}
		code {
			font-size: 1.6vw;
			tab-size: 2;			
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
		img {
			width: 50px;
			height: 50px;
			margin: 20px;
		}	
		.tech-pictures p {
			width: 90px;
		}
		code {
			font-size: 1.7vw;
		}
		.poddsok-project {
			padding: 30px;
			margin-left: -0.5%;
			margin-right: -0.5%;
		}
	}
	@media( max-width: $large-phone ) {
		.poddsok-project {
			margin-left: -5.5%;
			margin-right: -5.5%;
		}
		img {
			margin: 10px;
		}
		.tech-pictures p {
			width: 70px;
		}
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
						<div class="poddsok-project project-{i}"
							 on:mouseover={() => {
							 	project.open = true;
							 	//animateScroll.scrollTo( '')
							 }}
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
									<div>
										<img src="{image.src}" />
										<p> {image.text} </p>
									</div>
									{/each}
								</div>
								<p>
									{project.text2} 
								</p>
								<code>
									{project.code}
								</code>
								<p>
									{project.text3}
								</p>
							</div>
								
						</div>
				{/if}
			{/each}
	</div>
</div>