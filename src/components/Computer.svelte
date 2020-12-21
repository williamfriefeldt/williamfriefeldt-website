<script>
	
		let src ="af-screenshot.png";

</script>

<style lang="scss">

	.laptop-container {
	    position: absolute;
	    bottom: 20px;
	    right: 30px;
	    z-index: -1;
	    cursor: pointer;
	}

	.laptop-screen {
		width: 352px;
		height: 235px;
		background-color: lightgrey;
		border-radius: 25px 25px 0px 0px;
		border-right: 10px solid gray;
	}

	.laptop-innerscreen {
		width: 300px;
		height: 250px;
		margin-left: 25px;
		margin-top: 25px;
		img { 
			width: 100%;
			margin-top: 20px;
		}
	}

	.laptop-keyboard {
		border-top: 1px solid black;
		margin-left: -43px;
		transform: skewX(-30deg);
		width: 352px;
		height: 150px;
		background-color: lightgrey;
		border-radius: 0px 0px 25px 25px;
		border-right: 10px solid gray;
	}

	.laptop-keypad {
		width: 100px;
	    height: 40px;
	    border: 0.5px solid black;
	    bottom: 10px;
	    position: absolute;
	    left: 130px;
	    border-radius: 15%;	
	}
	.laptop-keys {
		width: 320px;
	    height: 80px;
	    border: 0.5px solid black;
	    top: 10px;
	    position: absolute;
	    left: 15px;
	}
	.laptop-key {
		width: 10px;
		height: 10px;
		background-color: black;
		margin: 1.5px;
	}
</style>

<div class="laptop-container">
	<div class="laptop-screen">
		<div class="laptop-innerscreen">
			<img {src}  alt="Computer" />
		</div>
	</div>
	<div class="laptop-keyboard">
		<div class="laptop-keys">
			{#each Array(6) as _, j}
				<div style="display:flex;">
					{#each Array(25) as _, i}
						<div class="laptop-key"></div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="laptop-keypad"></div>
	</div>
</div>