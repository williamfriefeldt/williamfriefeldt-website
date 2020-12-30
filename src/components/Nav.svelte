<script>

	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import { fade, fly } from 'svelte/transition';

	export let segment;

	let showMenu = false;

</script>

<style lang="scss">

	@import '../../static/_variables.scss';

	nav {
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
		:global( svg ) {
	  		cursor: pointer;
	  		fill: white;
	  		width: 35px;
	  		height: 35px;
		}
		.up {
			rotate: 90deg;
			-ms-transform: rotate(90deg);
		    -moz-transform: rotate(90deg);
		    -webkit-transform: rotate(90deg);
		    transform: rotate(-90deg);
		}
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.menu-icon {
		-moz-transition: all 0.5s linear;
		-webkit-transition: all 0.5s linear;
		transition: all 0.5s linear;
		margin-top: 15px;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: white;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em 0.25em 0.5em;
		display: block;
		color: white;
		text-shadow: 1px 1px black;
		font-size: 20px;
	}

	.black {
		:global( svg ) {
			fill: black;
		}
		a {
			color: black !important;
			text-shadow: none !important;
		}	
		[aria-current]::after {
			background-color: black;
		}
	}

	.menu-icon-mobile {
		display: none;
	}

	.options-mobile {
		display: none;
	}

	@media( max-width: $tablet-width ) {
		.hide-on-mobile {
			display: none;
		}
		.options-not-mobile {
			display: none;
		}
		.options-mobile {
			display: block;
		}
		.mobile-menu{
			.hide-on-mobile {
				display: block;
			}
			background-color: black;
			opacity: 0.5;
			height: 100vh;
			width: 400vh;
			margin-left: -1000px;
			padding-left: 1000px;
			padding-top: 15px;
			li {
				display: contents;
				.menu-icon-mobile {
					display: contents;
					margin-top: 0px;
				}
				.menu-icon {
					display: none;
				}
			}
		}
	}

</style>

<nav>
	<ul class:mobile-menu={ showMenu }>
		<li on:click={ () => showMenu = !showMenu } >
			<div class="menu-icon" 
				 class:up={ showMenu === true }
				 class:black={ segment === 'projects' || segment === 'cv' }>
				<MdMenu />
			</div>
			<div class="menu-icon-mobile">
				<MdMenu />
			</div>
		</li>

		{#if showMenu}
			<div class="options-not-mobile" 	 
				 class:black={ segment === 'projects' || segment === 'cv' }
				 transition:fade >
					<li><a aria-current="{segment === 'start' ? 'page' : undefined}" href="start">start</a></li>
					<li><a aria-current="{segment === 'intro' ? 'page' : undefined}" href="intro">intro</a></li>
					<li><a aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a></li>
					<li><a aria-current="{segment === 'cv' ? 'page' : undefined}" href="cv">cv</a></li>
			</div>

			<div class="options-mobile"
				 in:fly="{{ y: -50, duration: 2500 }}"
				 out:fly="{{ y: 50, duration: 2500 }}"
				 on:click={ () => showMenu = !showMenu }>
				 <div class="hide-on-mobile">
					<li><a aria-current="{segment === 'start' ? 'page' : undefined}" href="start">start</a></li>
					<li><a aria-current="{segment === 'intro' ? 'page' : undefined}" href="intro">intro</a></li>
					<li><a aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a></li>			
				</div>
			</div>

		{/if}

	</ul>
</nav>
