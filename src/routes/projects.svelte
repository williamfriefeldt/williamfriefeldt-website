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
	}
	.projects-info {
		padding-left: 4%;
		margin-left: 280px;
		margin-top: 20px;
  		p {
  			margin-block-start: 0;
  			font-size: 20px;
  			text-align: justify;
  			width: 80%;
  		}
	}
	.scrollX-opacity {
		opacity: var(--opacity);
	}
	h1, h3 {
		color: cadetblue;
	}
	h3 {
		text-align: center;
	}
	h1 {
		margin-top: 60px;
		margin-bottom: 1%;
		width: 80%;
		font-size: 35px;
	}
	ul {
    	list-style: none;
    	margin: 10%;
    	margin-top: 20%;
    	padding: 0;
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
	.ipad-placeholder {
		display: block;
    width: 450px;
    height: 310px;
		float: right;
	}

	@media( min-width: $large-desktop ) {	
		.hide-mobile {
			margin-top: 205px;
			display: block !important;
		}
		ul {
			width: 57%;
			margin-top: 15%;
    	margin-left: 8%;
    	margin-right: 1%;
		}
		.ipad-placeholder {
			width: 550px;
		}
		h1 {
			font-size: 40px;
		}
	}
	.hide-mobile, .iphone-placeholder {
		display: none;
	}
	@media( max-width: $desktop-width ) {
		h2 {
			text-align: right;
    		margin-right: 20px;
		}
		.hide-ipad, .ipad-placeholder {
			display: none;
		}
		ul {
			margin-top: 24%;
		}
	}

	@media( max-width: $tablet-width ) {
		ul {
			margin-top: 50px;
		}
		h2 {
			text-align:center;
			margin-right: 0;
		}
		.projects-info {
				margin-left: 5%;
		    margin-top: -20px;
		    margin-right: 10px;
		    p {
		    	font-size: 18px;
		    	width: 90%;
		    }
		}
		h1 {
			font-size: 26px;
			margin-top: 75px;
			width: 90%;
		}
		.iphone-placeholder {
			width: 185px;
    	height: 285px;
    	float: left;
    	display: block;
		}
	} 
	@media( max-width: $large-phone ) {
		.projects-info p {
			font-size: 16px;
			text-align: inherit;
		}
	}
	@media( max-width: $medium-phone ) {
		h1 {
			font-size: 22px;
		}
	}
</style>

<div class="scrollXwindow">
	<div class="projects-container">

		{#if showItems}
			<div transition:fade|local="{{ duration: 1000, delay: 2000 }}">
				<Phone {leftPos} />
			</div>

			<div class="ipad-placeholder"></div>
			<div class="iphone-placeholder"></div>

			<div class="projects-info-container"
				 style="--opacity: {opacityContainers.first}"
				 transition:fade|local="{{ duration: 1000, delay: 1000 }}">

				<div class="projects-info">

					<h1>My portfolio</h1>
					<p>
						I've been developing web applications for busniess, for government, for startup
						and of course for fun. Using different technologies, a creative mind and talented 
						colleagues I've manage to create smooth and responsive applications for both desktop 
						and mobile. I will now share some of my most successful projects!
					</p>

				</div>
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

			<div class="hide-ipad scrollX-opacity" 
				 style="--opacity: {opacityContainers.second}"
				 transition:fade|local="{{ duration: 1000, delay: 4000 }}">
				<IPad />
			</div>

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