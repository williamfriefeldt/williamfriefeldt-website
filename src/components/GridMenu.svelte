<script>

	import Icon from '../components/Icon.svelte';
	import { getPersonalLetter } from '../content/personalLetter.js';

	let options = [
		{ title: 'Personal letter', info: $getPersonalLetter },
		{ title: 'CV', info: 'pdf'},
		{ title: 'Portfolio', icon: 'code' },
		{ title: 'Travels'},
		{ title: 'Contact'},
	];

	import Grid from "svelte-grid";
	import gridHelp from "svelte-grid/build/helper/index.mjs";
	
	const { item } = gridHelp;
	const id = () => "_" + Math.random().toString(36).substr(2, 9);

	let items = [
		  {
		    id: id(),
		    5: item({
		      x: 0,
		      y: 0,
		      w: 2,
		      h: 6,
		    }),
		    3: item({ x: 0, w: 2, h: 2, y: 0 }),
		    1: item({ x: 0, y: 0, w: 1, h: 2 }),
		  },
		  {
		    id: id(),
		    5: item({
		      x: 2,
		      y: 0,
		      w: 3,
		      h: 2,
		    }),
		    3: item({ x: 2, w: 1, h: 2, y: 0 }),
		    1: item({ x: 0, y: 2, w: 1, h: 2 }),
		  },

		  {
		    id: id(),
		    5: item({
		      x: 2,
		      y: 2,
		      w: 3,
		      h: 2,
		    }),
		    3: item({ x: 0, w: 3, h: 2, y: 2 }),
		    1: item({ x: 0, y: 4, w: 1, h: 2 }),
		  },
		];

	const cols = [
	  [1500, 5],
	  [1024, 3],
	  [500, 1],
	];

</script>

<style>

	.content { 
		height: 100%;
		border-radius: 5px;
		background-color: wheat;
		box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
		cursor: grab;
		overflow: hidden;
	}

	.content p { 
		padding: 0px 20px 0px 20px;
	}

	.content h3 {
		text-align: center;
	}

	:global(.svlt-grid-item) {
		/* Back shadow */
		background: transparent !important;
	}
	:global(.svlt-grid-resizer) {
		margin: 8px;
	}

	.grid-menu-title { 
		text-align: center;
	}


</style>

<h2 class="grid-menu-title">
	Be flexible, like these boxes! 
</h2>



<Grid bind:items={items} rowHeight={100} let:item {cols} let:index>
  <div class="content">
    <h3>{options[index].title}</h3>
    {#if options[index].info !== 'pdf'}
    	<p>{options[index].info}</p>
    {:else}
    	<a href="cv" target="_blank"> see </a>
    {/if}
  </div>
</Grid>
