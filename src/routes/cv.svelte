<script>

	  import { onMount } from "svelte";
	  let PdfViewer;

	  onMount(async () => {
	    const module = await import("svelte-pdf");
	    PdfViewer = module.default;
	  });

</script>

<div style="margin-top: 60px">
	<svelte:component this={PdfViewer} url="./cv-will.pdf"/> 
</div>

