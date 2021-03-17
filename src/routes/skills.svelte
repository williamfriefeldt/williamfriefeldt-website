<script>

	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let showSkills = false;
	onMount( () => setTimeout( () => showSkills = true, 1000 ) );

	let searchTerm = "";

	let frameworks = [ 'AngularJS', 'Angular +2', 'Svelte', 'jQuery', 'pyFlask' ];
	let languages = [ 'JavaScript', 'TypeScript', 'Python', 'C#', 'PHP' ];
	let libraries = [ 'Puppeteer', 'JSXGraph', 'Moment.js', 'Stencil.js', 'NodeJS' ];
	let versionNdocumentation = [ 'Git', 'Bitbucket', 'OpenShift', 'Jenkins', 'Trello' ];

	$: filterList = frameworks.filter( item =>{ 
		if(searchTerm !== '') return item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; 
	});
	$: filterList2 = languages.filter( item =>{ 
		if(searchTerm !== '') return item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; 
	});
	$: filterList3 = libraries.filter( item =>{ 
		if(searchTerm !== '') return item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; 
	});
	$: filterList4 = versionNdocumentation.filter( item =>{ 
		if(searchTerm !== '') return item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; 
	});



</script>

<style lang="scss">

	@import '../../static/variables';

	.input-container {
		margin-top: 20em;
		justify-content: center;
		display: flex;
		input {
	    border: none;
	    border-bottom: 2px solid mediumpurple;
	    background: lightcyan;
	    font-size: 22px;
	    padding: 8px;
	    color: mediumpurple; 
	    width: 380px;
		}
		input:focus {
			outline: none;
		}
	}

	p, h3 {
		text-align: center;
	}

	.circle-div {
	    width: 18em;
	    height: 16em;
	    border-radius: 50%;
	    padding-top: 2%;
	    font-size: 0.75em;
	}

	.frameworks-container {
		position: absolute;
		top: 7.5%;
		left: 10%;
		background: tomato;
	    color: papayawhip;
	}
	.languages-container{
		position: absolute;
		top: 7.5%;
		left: 30%;
		background: aquamarine;
    	color: brown;
    	padding: 1%;	
	}
	.libraries-container{
		position: absolute;
		top: 7.5%;
		right: 25%;
		background: wheat;
    	color: teal;
	}
	.versionNdocumentation-container{
		position: absolute;
		top: 7.5%;
		right: 10%;
	}

	.searchItem {
		color: wheat;
	}

	.second-row {
		top: auto;
		bottom: 10%;
	}

	@media( min-width: $large-desktop ) {
		.input-container {
			margin-top: 25%;
		}
		.libraries-container {
			right: 35%;
		}
	}

</style>

<svelte:head>
	<title>Skills</title>
	{#if searchTerm}
		<style>
			body {
				background-color: cadetblue;
				transition: background-color 0.75s;
			}
			input {
				border-radius: 25px;
				padding-left: 25px !important;
			}
		</style>
	{/if}
</svelte:head>

<div>

	<div class="input-container">
		<input type="text" placeholder="Type something, for example Angular" spellcheck="false" bind:value={searchTerm} />

	</div>
	
	{#if searchTerm !== '' && filterList.length === 0 && filterList2.length === 0 && filterList3.length === 0 && filterList4.length === 0}
		<p> No skills matching the search... </p>
	{/if}
	
	{#if showSkills}
		<div transition:fade|local="{{ delay: 1500, duration: 1000 }}" class="frameworks-container circle-div">
			<h3> JS frameworks </h3>
			{#each frameworks as framework}
				<p class:searchItem={filterList.find( item => item === framework )}>{framework}</p>
			{/each}
		</div>

		<div class="languages-container circle-div">
			<h3> Programming <br /> languages </h3>
			{#each languages as language}
				<p class:searchItem={filterList2.find( item => item === language )}>{language}</p>
			{/each}
		</div>

		<div class="libraries-container circle-div">
			<h3> Libraries </h3>
			{#each libraries as library }
				<p class:searchItem={filterList3.find( item => item === library )}>{library}</p>
			{/each}
		</div>

		<div class="versionNdocumentation-container circle-div">
			<h3> Software maintenance </h3>
			{#each versionNdocumentation as software }
				<p class:searchItem={filterList4.find( item => item === software )}>{software}</p>
			{/each}
		</div>

			<div transition:fade|local="{{ delay: 1500, duration: 1000 }}" class="frameworks-container circle-div second-row">
			<h3> JS frameworks </h3>
			{#each frameworks as framework}
				<p class:searchItem={filterList.find( item => item === framework )}>{framework}</p>
			{/each}
		</div>

		<div class="languages-container circle-div second-row">
			<h3> Programming <br /> languages </h3>
			{#each languages as language}
				<p class:searchItem={filterList2.find( item => item === language )}>{language}</p>
			{/each}
		</div>

		<div class="libraries-container circle-div second-row">
			<h3> Libraries </h3>
			{#each libraries as library }
				<p class:searchItem={filterList3.find( item => item === library )}>{library}</p>
			{/each}
		</div>

		<div class="versionNdocumentation-container circle-div second-row">
			<h3> Software maintenance </h3>
			{#each versionNdocumentation as software }
				<p class:searchItem={filterList4.find( item => item === software )}>{software}</p>
			{/each}
		</div>
	{/if}

</div>