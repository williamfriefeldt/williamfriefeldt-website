<script>

	let src = "plump-ipad.png";

</script>

<style lang="scss">

	@import '../../static/_variables.scss';

	.ipad-container {
			position: absolute;
			top: 8%;
			right: 4%;
	}

	img {
			width: 300px;
			height: 200px;
		 	border: 15px solid black;
		 	border-left-width: 30px;
		 	border-right-width: 30px;
		 	border-radius: 25px;
			cursor: pointer;
	}

	.ipad-button {
	    width: 15px;
	    height: 15px;
	    border-radius: 25px;
	    background-color: black;
	    position: absolute;
	    bottom: 106px;
	    left: 334px;
	    border: 2px solid #303030;
	}
@media( min-width: $large-desktop ) {
	.ipad-container {
		right: 8%;
	}
}
</style>

<div class="ipad-container">
	<img {src} />
	<div class="ipad-button"></div>
</div>