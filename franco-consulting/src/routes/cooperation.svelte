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
      if (element_ref) {
        const rect = element_ref.getBoundingClientRect();
        top_distance = rect.top;
        if (top_distance < window_height - window_height / 4 && !trigger) {
          trigger = true;
          machine_writing('Z kim współpracujemy?', 30, (char) => {
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
      window.removeEventListener('resize', updateSize);
    };
  });

  const partners = [
    { title: 'Doświadczeni adwokaci i radcowie prawni', icon: './lawyer.png' },
    { title: 'Biegli z zakresu resocjalizacji, prawa karnego i penitencjarystyki', icon: './rating-stars.png' },
    { title: 'Kuratorzy sądowi oraz wychowawcy SW', icon: './thin.png' },
    { title: 'Specjaliści od kontaktu z rodziną i psychologii kryzysowej', icon: './psychologist.png' },
  ];
</script>

<div class="text_container">
  <h1 bind:this={element_ref}>{target_text}</h1>
  <div class="grid_container">
    {#each partners as partner, i}
      <div class="grid_item" class:visible={trigger} style="animation-delay: {i * 0.15}s;">
        <div class="icon_container">
          <img src="{partner.icon}" alt="{partner.title}" />
        </div>
        <p class:bold={trigger}>{partner.title}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .text_container {
    background-color: rgb(255, 255, 255);
    padding: 10vw !important;
    z-index: 5;
  }
  h1 {
    font-family: 'Mozilla Headline';
    color: rgb(200, 15, 15);
    text-align: left;
    font-size: 5vh;
    min-height: 5vh;
    margin-bottom: 5vh;
  }
  .grid_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3vw;
  }
  .grid_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease-out;
    padding: 2vh 2vh 0 2vh !important;
    border: 2px solid black;
  }
  .grid_item.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .icon_container {
    width: 8vh;
    height: 8vh;
    margin-bottom: 2vh;
  }
  .icon_container img {
    width: 100%;
    height: auto;
  }
  p {
    font-family: 'Mozilla Headline';
    font-weight: 400;
    text-align: justify;
    font-size: 2.2vh;
    transition: all 2s ease;
    text-align: center;
  }
  .bold {
    font-weight: 700;
    color: rgb(175, 15, 15);
  }
  /* Responsywność */
  @media (max-width: 1024px) {
    .grid_container {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid_item {
      padding: 0 5%;
    }
  }
  @media (max-width: 580px) {
    .text_container {
      padding: 10vw 5vw;
    }
    h1 {
      text-align: left;
      font-size: 4.5vh;
    }
    .grid_container {
      grid-template-columns: 1fr;
    }
    p {
      text-align: left;
      font-size: 2.2vh;
      text-align: center;
    }
  }
</style>