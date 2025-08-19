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
				if ((top_distance < (window_height - window_height / 4)) && !trigger) {
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

<div class="section">
	<div class="row">
		<div class="element">
			<h1 bind:this={element_ref}>{target_text}</h1>
			<ul>
				<li class:visible={trigger}>Kompleksowe wsparcie dla rodzin zatrzymanych i tymczasowo aresztowanych</li>
				<li class:visible={trigger}>Pisma do administracji Służby Więziennej (ZK / AŚ)</li>
				<li class:visible={trigger}>Odwołania, podania, prośby, wnioski i warunkowe zwolnienia</li>
				<li class:visible={trigger}>Stały kontakt z kuratorami sądowymi i wychowawcami</li>
				<li class:visible={trigger}>Monitorowanie warunków osadzenia i przebiegu postępowania</li>
				<li class:visible={trigger}>Pomoc psychologiczna i komunikacyjna dla rodzin</li>
				<li class:visible={trigger}>Opracowanie indywidualnych strategii działania</li>
			</ul>
		</div>
	</div>
	<div class="row">
		<div class="element"></div>
	</div>
	<div class="row">
		<div class="element"></div>
	</div>
	<div class="row">
		<div class="element"></div>
	</div>
</div>

<style>
	.section {
		padding: 10vw;
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	h1 {
		font-family: 'Mozilla Headline';
		text-align: left;
		font-size: 5vh;
		min-height: 5vh;
		color: rgb(200, 15, 15);
	}
	ul {
		padding: 0;
	}
	li {
		list-style-type: none;
		font-family: 'Mozilla Headline';
		text-align: left;
		font-size: 2.5vh;
		padding: 20px;
		margin-bottom: 10px;
		transition: border 2s ease, background-color 0.5s ease;
		border: 2px solid #fff;
	}
	li:hover {
		background-color: rgb(175, 15, 15);
		color: #fff;
	}
	.visible {
		border: 2px solid rgb(175, 15, 15);
	}
</style>
