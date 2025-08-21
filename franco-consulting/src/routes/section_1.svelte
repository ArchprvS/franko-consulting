<script>
	import { onMount } from 'svelte';
	import { machine_writing } from './utils.js';

	let element_ref;
	let target_text_0 = $state('');
	let target_text_1 = $state('');
	let target_text_2 = $state('');
	let top_distance = $state(0);
	let window_height = $state(0);
	let trigger = false;
	let flip_trigger = $state(false);

	onMount(() => {
		function updatePosition() {
			if (element_ref) {
				// Sprawdzenie, czy element_ref istnieje
				const rect = element_ref.getBoundingClientRect();
				top_distance = rect.top;
				if (top_distance < window_height - window_height / 4 && !trigger) {
					trigger = true;
					machine_writing('Doświadczenie', 30, (char) => {
						target_text_0 += char;
					});
					machine_writing('Zaangażowanie', 30, (char) => {
						target_text_1 += char;
					});
					machine_writing('Profesjonalizm', 30, (char) => {
						target_text_2 += char;
					});
					if (!flip_trigger) {
						setTimeout(() => {
							flip_trigger = true;
						}, 500);
						setTimeout(() => {
							target_text_1 = '';
							machine_writing('Skuteczność.', 30, (char) => {
								target_text_1 += char;
							});
						}, 2500);
					}
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
	<h2 bind:this={element_ref} class:flip_1={flip_trigger}>{target_text_0}</h2>
	<h2 style="z-index: 10;" class:middle_flip={flip_trigger}>{target_text_1}</h2>
	<h2 class:flip_2={flip_trigger}>{target_text_2}</h2>
</div>

<style>
	.section {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30vh 10vw;
		overflow: hidden;
		perspective: 1000px;
	}
	h2 {
		font-family: 'Mozilla Headline';
		font-size: 2.7vw;
		min-height: 2.7vw;
		font-weight: 400;
		background-color: #0000008a;
		color: #fff;
		border: 2px solid black;
		padding: 2.2vw;
		text-align: left;
		width: 25%;
		transform-style: preserve-3d;
		/* transition: all 2s ease; */
	}
	h2:nth-child(2) {
		transform-origin: center center;
	}
	/* h2:nth-child(2) {
		position: absolute;
		left: 50%;
		top: 50%;
		min-height: 2.76vw;
		transform: translate(-50%, -50%);
		width: 20%;
		z-index: 5;
	} */
	.flip_1 {
		animation: anim_0 1.5s forwards;
		animation-delay: 0.3s;
	}
	.middle_flip {
		animation: anim_1 2s forwards;
		animation-delay: 0.3s;
	}
	.flip_2 {
		animation: anim_2 1.5s forwards;
		animation-delay: 0.3s;
	}
	@keyframes anim_0 {
		0% {
			width: 25%;
		}
		50% {
			width: 28%;
		}
		90% {
			opacity: 1;
		}
		100% {
			width: 28%;
			transform: translateX(-100vw);
			/* opacity: 0; */
		}
	}
	@keyframes anim_1 {
		0% {
			transform: scale(1) rotateX(0deg);
			padding: 2.2vw;
		}
		6.25% {
			transform: scale(1) rotateX(90deg);
		}
		12.5% {
			transform: scale(1) rotateX(180deg);
		}
		18.75% {
			transform: scale(1) rotateX(270deg);
		}
		50% {
			transform: scale(1);
			padding: 2.2vw;
			font-weight: 400;
			transform: rotateX(360deg);
		}
		73.5% {
			font-weight: 600;
		}
		100% {
			transform: scale(2);
			font-weight: 600;
			padding-left: 4vw;
		}
	}
	@keyframes anim_2 {
		0% {
			width: 25%;
		}
		50% {
			width: 28%;
		}
		90% {
			opacity: 1;
		}
		100% {
			width: 28%;
			transform: translateX(100vw);
			/* opacity: 0; */
		}
	}
	@keyframes anim_mobile_1 {
		0% {
		}
		50% {
			transform: rotateX(90deg);
			opacity: 0;
		}
		90% {
			transform: rotateX(180deg);
			opacity: 0;
		}
		100% {
			transform: rotateX(180deg);
			opacity: 0;
		}
	}
	@keyframes middle_anim_mobile {
		0% {
			transform: scale(1) rotateX(0deg);
			padding: 2.2vw;
		}
		6.25% {
			transform: scale(1) rotateX(90deg);
		}
		12.5% {
			transform: scale(1) rotateX(180deg);
		}
		18.75% {
			transform: scale(1) rotateX(270deg);
		}
		50% {
			transform: scale(1);
			padding: 2.2vw;
			font-weight: 400;
			transform: rotateX(360deg);
		}
		73.5% {
			font-weight: 600;
		}
		100% {
			transform: scale(1.5);
			font-weight: 600;
			padding-left: 4vw;
		}
	}
	@media (max-width: 580px) {
		.section {
			flex-direction: column;
			padding: 20vh 10vw;
			align-items: center;
		}
		h2 {
			font-size: 6vw;
			min-height: 7vw;
			padding: 3vw;
			width: 60%;
			text-align: center;
		}
		.flip_1 {
			animation: anim_mobile_1 1.5s forwards;
			animation-delay: 0.3s;
		}
		.flip_2 {
			animation: anim_mobile_1 1.5s forwards;
			animation-delay: 0.3s;
		}
		.middle_flip {
			animation: middle_anim_mobile 1.5s forwards;
			animation-delay: 0.3s;
		}
	}
</style>
