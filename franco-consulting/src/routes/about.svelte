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
				// Sprawdzenie, czy element_ref istnieje
				const rect = element_ref.getBoundingClientRect();
				top_distance = rect.top;
				if (top_distance < window_height - window_height / 4 && !trigger) {
					trigger = true;
					machine_writing('Kim jesteśmy?', 30, (char) => {
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
		<span class:bold={trigger}>Firma Detektywistyczna Franko</span> od 2015 roku pomaga osobom zatrzymanym, osadzonym oraz
		ich rodzinom. Nasze działania są oparte na realnym doświadczeniu, co gwarantuje ich szybkość,
		skuteczność i przemyślany charakter. Wspieramy osoby w trudnych sytuacjach
		prawnych i życiowych <span class:bold={trigger}>od pierwszych godzin po zatrzymaniu</span>. Nasza specjalizacja to pomoc administracyjna, prawna i organizacyjna, w
		tym pisma, wnioski, działania interwencyjne oraz przygotowanie do spotkań z kuratorami i
		adwokatami. Nasza firma współpracuje ze <span class:bold={trigger}>specjalistami z zakresu medycyny sądowej, patomorfologami oraz biegłymi sądowymi</span>, w tym z ekspertami z Wojskowego Instytutu Medycznego w Warszawie
		co pozwala nam na oferowanie profesjonalnych ekspertyz lekarskich i analiz w sprawach o wysokim
		stopniu złożoności. <span class:bold={trigger}>Dyskrecja, prawo i doświadczenie</span> to nasze fundamenty. Działamy cicho,
		etycznie i skutecznie, dzięki dogłębnej znajomości systemu.
	</p>
</div>

<style>
	.text_container {
		background-color: rgb(255, 255, 255);
		padding: 10vw;
		z-index: 5;
		/* min-height: 92vh; */
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
	}
	span {
		transition: all 2s ease;
	}
	.bold {
		font-weight: 700;
		color: rgb(175, 15, 15);
	}
	@media (max-width: 580px) {
		h1 {
			text-align: left;
		}
		p {
			text-align: left;
		}
	}
</style>
