<script>
	import Nav from '../components/Nav.svelte';

	import PageTransitions from '../components/PageTransitions.svelte';

	export let segment; 

	let showMenu = false;

</script>

<!-- Import global styles -->
<style lang="scss" global>
	@import "../../static/global.scss";

	.navbar-wrapper {
	  overflow: hidden;
	  position: fixed; 
	  top: 0; 
	  width: 100%;
	  margin-bottom: 30px;
	}

</style>

<div class="navbar-wrapper">		
	<Nav {segment} />
</div>

<PageTransitions refresh={segment}>
	<slot/>
</PageTransitions>