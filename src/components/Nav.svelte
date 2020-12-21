<script>

	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import { fade } from 'svelte/transition';

	export let segment;

	let showMenu = false;

</script>

<style lang="scss">
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

</style>

<nav>
	<ul >
		<li on:click={ () => { showMenu = !showMenu; }} >
			<div class="menu-icon" 
				 class:up={ showMenu === true }
				 class:black={ segment === 'projects' }>
				<MdMenu />
			</div>
		</li>
		{#if showMenu}
		<div transition:fade class:black={ segment === 'projects' }>
			<li><a aria-current="{segment === 'start' ? 'page' : undefined}" href="start">start</a></li>
<!-- 			<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li> -->
<!-- 			<li><a aria-current="{segment === 'animations' ? 'page' : undefined}" href="animation">animation</a></li> -->
			<li><a aria-current="{segment === 'intro' ? 'page' : undefined}" href="intro">intro</a></li>
			<li><a aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a></li>
			<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			     the blog data when we hover over the link or tap it on a touchscreen -->
<!-- 			<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->
		</div>
		{/if}
	</ul>
</nav>
