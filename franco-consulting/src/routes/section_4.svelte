<script>
  import { onMount } from 'svelte';
  import { machine_writing } from './utils.js';

  let element_ref;
  let target_text = $state('');
  let top_distance = $state(0);
  let window_height = $state(0);
  let trigger = $state(false);

  onMount(() => {
    function updatePosition() {
      if (element_ref && !trigger) {
        const rect = element_ref.getBoundingClientRect();
        top_distance = rect.top;
        if (top_distance < window_height - window_height / 4) {
          trigger = true;
          machine_writing('Współpraca z ekspertami i praktykami pozwala nam zapewnić konkretną i efektywną pomoc.', 30, (char) => {
            target_text += char;
          });
        }
      }
    }
    function updateSize() {
      window_height = window.innerHeight;
    }

    updatePosition();
    updateSize();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  });
</script>

<div class="section_container" bind:this={element_ref}>
  <div class="quote_box">
    <p class="quote_text">
      {target_text}
      <span class="cursor" class:blinking={trigger}>|</span>
    </p>
  </div>
</div>

<style>
  .section_container {
    background-color: transparent;
    padding: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
  .quote_box {
    width: 80%;
    max-width: 900px;
    padding: 3vw;
    box-shadow: inset 0 0 0 3px #000;
  }
  .quote_text {
    font-family: 'Mozilla Headline', sans-serif;
    font-size: 2.5em;
    font-weight: 400;
    text-align: center;
    min-height: 4em;
    line-height: 1.4;
  }
  .cursor {
    font-weight: 400;
    color: rgb(200, 15, 15);
    display: inline-block;
    vertical-align: bottom;
    transition: all 0.5s ease;
  }
  .cursor.blinking {
    animation: blink_animation 1s infinite;
  }
  @keyframes blink_animation {
    50% {
      opacity: 0;
    }
  }
  @media (max-width: 580px) {
    .quote_box {
      width: 100%;
      padding: 5vw;
    }
    .quote_text {
      font-size: 1.5em;
      text-align: left;
      min-height: 6em;
    }
  }
</style>