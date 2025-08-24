<script>
  import { onMount } from 'svelte';

  let element_ref;
  let top_distance = $state(0);
  let window_height = $state(0);
  let trigger = $state(false);
  let name = $state('');
  let line_name = $derived(name);

  function addSpace() {
        line_name = ' ' + name;
        console.log('TEST');
    }

  onMount(() => {
    function updatePosition() {
      if (element_ref) {
        const rect = element_ref.getBoundingClientRect();
        top_distance = rect.top;
        if (top_distance < window_height - window_height / 4 && !trigger) {
          trigger = true;
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
</script>

<div class="contact_container" bind:this={element_ref}>
  <h2 class:visible={trigger}>Witaj{line_name}. Jak możemy ci pomóc?</h2>
  <form class="contact_form" class:visible={trigger}>
    <label for="name">Imię i Nazwisko:</label>
    <input type="text" id="name" name="name" oninput={addSpace} bind:value={name} required />

    <label for="email">Adres e-mail:</label>
    <input type="email" id="email" name="email" required />

    <label for="phone">Numer telefonu:</label>
    <input type="tel" id="phone" name="phone" />

    <label for="message">Wiadomość:</label>
    <textarea id="message" name="message" required></textarea>

    <button type="submit">Wyślij</button>
  </form>
</div>

<style>
  .contact_container {
    background-color: #fff;
    padding: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
  }
  h2 {
    font-family: 'Mozilla Headline', sans-serif;
    color: rgb(200, 15, 15);
    font-size: 5vh;
    margin-bottom: 5vh;
    text-align: center;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 1s ease-out;
  }
  h2.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .contact_form {
    display: flex;
    flex-direction: column;
    gap: 2.5vh;
    width: 100%;
    max-width: 600px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 1s ease-out 0.5s;
  }
  .contact_form.visible {
    opacity: 1;
    transform: translateY(0);
  }
  label {
    font-family: 'Mozilla Headline', sans-serif;
    font-size: 2.2vh;
    font-weight: 700;
    color: #000;
  }
  input, textarea {
    font-family: 'Mozilla Headline', sans-serif;
    font-size: 2vh;
    padding: 1.5vh 2vh;
    border: none;
    box-shadow: inset 0 0 0 3px #000;
    background-color: #f7f7f7;
    transition: all 0.3s ease;
  }
  input:focus, textarea:focus {
    outline: none;
    box-shadow: inset 0 0 0 3px rgb(200, 15, 15);
  }
  textarea {
    min-height: 20vh;
    resize: vertical;
  }
  button {
    font-family: 'Mozilla Headline', sans-serif;
    font-size: 2.5vh;
    font-weight: 700;
    color: #fff;
    background-color: #000;
    padding: 2vh 4vh;
    border: none;
    cursor: pointer;
    box-shadow: inset 0 0 0 3px #000;
    transition: all 0.3s ease;
  }
  button:hover {
    background-color: rgb(200, 15, 15);
    box-shadow: inset 0 0 0 3px rgb(200, 15, 15);
  }
  /* Responsywność */
  @media (max-width: 580px) {
    .contact_container {
      padding: 10vw 5vw;
    }
    h2 {
      font-size: 4vh;
      text-align: left;
    }
  }
</style>