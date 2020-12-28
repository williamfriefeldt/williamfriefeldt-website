<script>

	let src = "poddsok-phone.jpg";

</script>

<style lang="scss">

 	@import '../../static/_variables.scss';

	.phone-container {
		position: absolute;
		top: 100px;
		left: 100px;
	}
	img {
		width: 200px;
		border: 25px solid black;
		border-radius: 25px;
		border-left-width: 15px;
    	border-right-width: 15px;
    	border-bottom-width: 35px;
    	cursor: pointer;
	}
	.phone-button {
	    width: 22px;
	    height: 22px;
	    border-radius: 25px;
	    background-color: black;
	    position: absolute;
	    bottom: 7px;
	    left: 105px;
	    border: 2px solid #303030;
	}

	@media( max-width: $tablet-width ) {
		.phone-container {
			position: absolute;
			top: 65px;
			left: 30px;
		}
		img {
			width: 100px;
			border-radius: 15px;
			border-top-width: 12px;
			border-left-width: 8px;
			border-right-width: 8px;
			border-bottom-width: 18px;
		}
		.phone-button {
		    width: 10px;
		    height: 10px;
		    left: 53px;
		    bottom: 6px;
		}
	}

</style>

<div class="phone-container">
	<img {src} alt="mobil" />
	<div class="phone-button"></div>
</div>