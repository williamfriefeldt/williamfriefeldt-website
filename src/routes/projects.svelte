<script>

	import Computer from "../components/Computer.svelte";
	import Phone from "../components/Phone.svelte";

</script>

<style lang="scss">
	.projects-info-container {
		display: flex;
 		align-items: center;
 		justify-content: center;
	}
	.projects-info{
		padding: 20px;
		width: 400px;
		text-align: justify;
  		-moz-text-align-last: justify; 
  		text-align-last: justify;
  		box-shadow: 0 5px 20px 0 rgba(0,0,0,.2);
  		height: 113px;
  		margin-top: 200px;
  		p {
  			margin-block-start: 0;
  		}
	}
</style>


<div class="projects-container">

	<Phone />

	<div class="projects-info-container">
		<div class="projects-info">
			<p>
				I've been developing web applications for busniess, for government, for startup
				and of course for fun. Using different technologies, a creative mind and talented 
				colleagues I've manage to create smooth and responsive applications for both desktop 
				and mobile. I will now share some of my most successful projects!
			</p>
		</div>
	</div>

	<Computer />

</div>