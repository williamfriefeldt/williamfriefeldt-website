<script>

	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import * as animateScroll from "svelte-scrollto";

	import Computer from "../components/Computer.svelte";
	import Phone from "../components/Phone.svelte";
	import IPad from "../components/iPad.svelte";
	import Poddsok from "../components/Poddsok.svelte";

	let showItems = false;

	let projects = [
		{ name: "Poddsök.nu" },
		{ name: "Hitta yrken" },
		{ name: "Plump" },
		{ name: "Mathleaks" }
	];

	export let leftPos = '50px';
	let opacityContainers = {
		first: 1,
		second: 1
	};

	onMount( () => {
		showItems = true;
		window.onscroll = () => { 
			leftPos = 50 + window.scrollX + 'px';
			opacityContainers.first = 1 - 4 * (window.scrollX / window.innerWidth);
			opacityContainers.second = 1 - 1.5 * (window.scrollX / window.innerWidth);
 		}
	});

</script>

<style lang="scss">

	@import '../../static/_variables.scss';

	.scrollXwindow {
		width: 200%;
		display: flex;
	}
	.scrollXwindow > div {
		width: 50%;
	}

	.projects-info-container {
		opacity: var(--opacity);
		display: flex;
 		align-items: center;
 		justify-content: center;
	}
	.projects-info {
		padding: 20px;
		margin-right: 400px;
		margin-left: 280px;
  		p {
  			margin-block-start: 0;
  		}
	}
	.scrollX-opacity {
		opacity: var(--opacity);
	}
	h2, h3 {
		color: cadetblue;
		text-align: center;
	}
	h3 {
		text-align: center;
	}
	ul {
		width: 30%;
    	margin-right: 3%;
    	margin-top: 80px;
    	float: right;
    	list-style: none;
    	li {
    		padding: 10px;
    		background-color: cadetblue;
		    color: white;
		    cursor: pointer;
		    margin-bottom: 10px;
    	}
    	li:hover {
    		margin-left: 2%;
    		height: 22px;
    		font-size: 20px;
    	}
	}

	@media( min-width: $large-desktop ) {
		ul {
			margin-right: 130px;
			margin-top: 200px;
		}
		.hide-mobile {
			margin-top: 205px;
		}
		.projects-info-container {
			font-size: 20px;
			padding-left: 5%;
			padding-right: 3%
		}
	}

	@media( max-width: $desktop-width ) {
		ul {
			width: auto;
			margin-left: 260px;
			margin-right: 25px;
			float: none;
			margin-top: 0;
		}
		h2 {
			text-align: right;
    		margin-right: 20px;
		}
		.hide-ipad, .projects-info-container {
			display: none;
		}
	}

	@media( max-width: $tablet-width ) {
		.projects-info-container {
			display: block;
		}
		ul {
			margin-top: 100px;
			margin-left: 0px;
			h3 {
				width: 40%;
			}
			li {
				width: 40%;
			}
		}
		h2 {
			text-align:center;
			margin-right: 0;
		}
		.projects-info {
		    width: auto;
		    margin-top: -20px;
		    margin-left: 165px;
		    box-shadow: none;
		    background-color: transparent;
		    margin-right: 10px;
		    font-size: 3.5vw;
		}
	}

	@media( max-width: $large-phone ) {
		ul {
			width: auto;
			margin-right: 35px;
			text-align: center;
			margin-top: -25px;
			h3, li {
				width: auto;
			}
		}
		.hide-mobile {
			display: none;
		}
	}
</style>

<div class="scrollXwindow">
	<div class="projects-container">

		<h2>My portfolio</h2>

		{#if showItems}
			<div transition:fade|local="{{ duration: 1000, delay: 2000 }}">
				<Phone {leftPos} />
			</div>

			<div class="projects-info-container"
				 style="--opacity: {opacityContainers.first}"
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

			<div class="hide-ipad scrollX-opacity" 
				 style="--opacity: {opacityContainers.second}"
				 transition:fade|local="{{ duration: 1000, delay: 4000 }}">
				<IPad />
			</div>


			<ul class="scrollX-opacity"
				style="--opacity: {opacityContainers.second}">
				<h3 in:fly|local="{{ y: -50, duration: 2000, delay: 3500 }}"> 
					A potporri 
				</h3>
				{#each projects as project, i}
					<li in:fly="{{ y: -50, duration: 2000, delay: 3500 + (i+1)*1000 }}"
						on:click={ () => {

							animateScroll.scrollTo({ 
								element:'.poddsok-container',
								scrollX: true,
								scrollY: false,
								duration: 1250
							});

						}}>
						{project.name}
					</li>
				{/each}
			</ul>

			<div class="hide-mobile scrollX-opacity" 
				 style="--opacity: {opacityContainers.first}"
				 transition:fade|local="{{ duration: 1000, delay: 3000 }}">
				<Computer />
			</div>
		{/if}
	</div>

	<div class="poddsok-container">
		<Poddsok />
	</div>
</div>