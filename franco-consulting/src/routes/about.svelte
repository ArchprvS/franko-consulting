<script>
	import { onMount } from 'svelte';
	import { machine_writing } from './utils.js';

	let element_ref;
	let target_text = $state('');
	let top_distance = $state(0);
	let window_height = $state(0);
	let trigger = false;
	$inspect(top_distance, window_height);

	onMount(() => {
		function updatePosition() {
			if (element_ref) {
				// Sprawdzenie, czy element_ref istnieje
				const rect = element_ref.getBoundingClientRect();
				top_distance = rect.top;
				if ((top_distance < (window_height - window_height / 4)) && !trigger) {
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

		// machine_writing('Kim jesteśmy?', 30, (char) => {
		//   target_text += char;
		// });

		return () => {
			window.removeEventListener('scroll', updatePosition);
		};
	});
</script>

<div class="text_container">
	<h1 bind:this={element_ref}>{target_text}</h1>
	<p>
		Franko Consulting to niezależna firma doradcza i wspierająca, stworzona przez ludzi z
		praktycznym doświadczeniem operacyjnym, detektywistycznym oraz życiowym. Działamy z myślą o
		osobach zatrzymanych, tymczasowo aresztowanych i ich bliskich – wspierając ich w najbardziej
		kryzysowych momentach. Nasze podejście oparte jest na realnej znajomości systemu, kontaktach z
		profesjonalistami oraz zaangażowaniu, które wykracza daleko poza formalności. Nie jesteśmy tylko
		doradcami – działamy w terenie, pomagamy bezpośrednio i skutecznie. Rozumiemy mechanizmy systemu
		i wiemy, jak skutecznie na nie reagować. Każde zlecenie traktujemy indywidualnie, z pełnym
		profesjonalizmem i dyskrecją. Naszym celem jest realna pomoc – nie teoria.
	</p>
</div>

<style>
	.text_container {
		background-color: rgb(255, 255, 255);
		padding: 10vw;
		min-height: 92vh;
	}
	h1 {
		font-family: 'Mozilla Headline';
		text-align: left;
		font-size: 5vh;
		min-height: 5vh;
	}
	p {
		font-family: 'Mozilla Headline';
		text-align: justify;
		font-size: 2.5vh;
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
