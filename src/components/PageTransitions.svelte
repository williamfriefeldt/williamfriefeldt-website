<script>
  import { fly } from 'svelte/transition';
  export let refresh = '';

  const time = 1000;
</script>

{#key refresh}
  <div
    in:fly="{{ y: -50, duration: time, delay: 1.25*time }}"
    out:fly="{{ y: -50, duration: time }}" 
    >
    <slot/>
  </div>
{/key}