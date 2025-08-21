<script>
  import { onMount } from 'svelte';
  import { machine_writing } from './utils.js';

  let element_ref;
  let target_text = $state('');
  let top_distance = $state(0);
  let window_height = $state(0);
  let trigger = $state(false);

  let active_tab = $state(null);

  function toggle_tab(tab_name) {
    active_tab = active_tab === tab_name ? null : tab_name;
  }

  onMount(() => {
    function updatePosition() {
      if (element_ref) {
        const rect = element_ref.getBoundingClientRect();
        top_distance = rect.top;
        if (top_distance < window_height - window_height / 4 && !trigger) {
          trigger = true;
          machine_writing('Co oferujemy?', 30, (char) => {
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

<div class="text_container">
  <h1 bind:this={element_ref}>{target_text}</h1>
  <p>
    Nasze usługi koncentrują się na <span class:bold={trigger}>rzeczywistej i kompleksowej pomocy</span> osobom pozbawionym wolności i ich bliskim. Działamy w oparciu o <span class:bold={trigger}>wieloletnie doświadczenie</span>, które pozwala nam na skuteczne wsparcie w kluczowych momentach. Nie obiecujemy cudów, lecz <span class:bold={trigger}>rzetelne i profesjonalne wsparcie</span> oparte na znajomości procedur i realiów systemu penitencjarnego.
  </p>

  <div class="accordion_container" class:visible={trigger}>
    <div class="accordion_item">
      <div class="accordion_header" on:click={() => toggle_tab('leczenie')}>
        <p>I.  Pomoc w organizacji leczenia poza zakładem karnym</p>
        <span class="arrow" class:active={active_tab === 'leczenie'}>&#9660;</span>
      </div>
      <div class="accordion_content" class:open={active_tab === 'leczenie'}>
        <p>
          Posiadamy praktyczną wiedzę i doświadczenie w organizacji leczenia osadzonych w przypadku problemów zdrowotnych. Działamy kompleksowo, analizując sytuację prawno-medyczną i przygotowując profesjonalne wnioski. Wspieramy rodziny w kompletowaniu dokumentacji oraz współpracujemy z obrońcą i administracją więzienia w celu uzyskania zgody.
        </p>
      </div>
    </div>

    <div class="accordion_item">
      <div class="accordion_header" on:click={() => toggle_tab('komisja')}>
        <p>II.  Przygotowanie do komisji penitencjarnych</p>
        <span class="arrow" class:active={active_tab === 'komisja'}>&#9660;</span>
      </div>
      <div class="accordion_content" class:open={active_tab === 'komisja'}>
        <p>
          Wspieramy osadzonych i ich rodziny w realistycznym przygotowaniu do komisji. Analizujemy dotychczasowy przebieg kary i dokumentację, przygotowujemy do rozmów, wskazując, co mówić i czego unikać, oraz współpracujemy z wychowawcami i kuratorami.
        </p>
      </div>
    </div>

    <div class="accordion_item">
      <div class="accordion_header" on:click={() => toggle_tab('wnioski')}>
        <p>III. Wnioski o warunkowe zwolnienie</p>
        <span class="arrow" class:active={active_tab === 'wnioski'}>&#9660;</span>
      </div>
      <div class="accordion_content" class:open={active_tab === 'wnioski'}>
        <p>
          Opracowujemy skuteczne i profesjonalne wnioski o warunkowe przedterminowe zwolnienie. Naszym celem jest zwiększenie szans na pozytywną decyzję, z uwzględnieniem praktyki orzeczniczej oraz realiów danej jednostki.
        </p>
      </div>
    </div>

    <div class="accordion_item">
      <div class="accordion_header" on:click={() => toggle_tab('plany')}>
        <p>IV.  Plany readaptacyjne</p>
        <span class="arrow" class:active={active_tab === 'plany'}>&#9660;</span>
      </div>
      <div class="accordion_content" class:open={active_tab === 'plany'}>
        <p>
          Tworzymy kompleksowe plany readaptacyjne, które mają kluczowe znaczenie dla pozytywnej decyzji o zwolnieniu. Obejmują one plany dotyczące zatrudnienia, wsparcia rodziny i szczegółowo określają cele po wyjściu.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .text_container {
    background-color: rgb(255, 255, 255);
    padding: 10vw;
    z-index: 5;
  }
  h1 {
    font-family: 'Mozilla Headline';
    color: rgb(200, 15, 15);
    text-align: left;
    font-size: 5vh;
    min-height: 5vh;
  }
  p {
    font-family: 'Mozilla Headline';
    text-align: justify;
    font-size: 2.5vh;
    margin-bottom: 2vh;
  }
  span {
    transition: all 2s ease;
  }
  .bold {
    font-weight: 700;
    color: rgb(175, 15, 15);
  }

  /* Nowe style dla akordeonu */
  .accordion_container {
    margin-top: 5vh;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease-out;
    border: 1px solid #ddd;
  }
  .accordion_container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .accordion_item {
    border-bottom: 1px solid #eee;
  }
  .accordion_item:not(:last-child) {
    margin-bottom: 1.5vh; /* Lekki margines między zakładkami */
  }
  .accordion_header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5vh 3vh;
    background-color: #f7f7f7;
    transition: background-color 0.3s ease;
  }
  .accordion_header:hover {
    background-color: #ebebeb;
  }
  .accordion_header p {
    margin: 0;
    font-size: 2.5vh;
    color: #333;
    font-weight: bold;
    text-align: left;
  }
  .accordion_content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out;
    padding: 0 3vh;
    background-color: #fff;
  }
  .accordion_content.open {
    max-height: 500px;
    padding: 2.5vh 3vh;
  }
  .accordion_content p {
    font-size: 2.2vh;
    line-height: 1.4;
    text-align: left;
    margin: 0;
  }
  .arrow {
    transition: transform 0.4s ease;
    font-size: 2vh;
    color: rgb(175, 15, 15);
  }
  .arrow.active {
    transform: rotate(180deg);
  }

  @media (max-width: 580px) {
    h1, p, .accordion_header p, .accordion_content p {
      text-align: left;
    }
  }
</style>