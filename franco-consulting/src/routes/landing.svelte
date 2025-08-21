<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { machine_writing } from './utils.js';

	let target_text = $state('');

	onMount(() => {
		machine_writing('Pomoc osobom zatrzymanym', 30, (char) => {
			target_text += char;
		});
		return () => {};
	});
</script>

<div class="section_container">
	<div class="column c_0"><img src="column_a.png" alt="column" /></div>
	<div class="section_0">
		<img src="./logo_fc_new.png" alt="logo"/>
		<div>
			<h1>Franko Consulting</h1>
			<p>{target_text}</p>
		</div>
		<div class="cube">
			<span class="side top"><span class="top_text">Konsultacja</span></span>
			<span class="side front">Zadzwoń</span>
		</div>
	</div>
	<div class="column c_1"><img src="column.png" alt="column"/></div>
</div>

<style>
	.section_container {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.column {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		width: 10%;
	}
	.column img {
		height: 100vh;
		transform: scaleY(1.027);
	}
	.c_0 {
		transform: translateX(-20px);
	}
	.c_1 {
		transform: translateX(20px);
	}
	.section_0 {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		/* background-color: rgba(0, 0, 0, 0.250); */
	}
	.section_0 img {
		width: 90%;
		max-width: 800px;
		margin-bottom: 0;
	}
	.section_0 h1 {
		font-family: 'Mozilla Headline', sans-serif;
		font-size: 4em;
		margin-top: 0;
		margin-bottom: 0;
		text-align: center;
		/* opacity: 0;
		animation: flip 1.5s forwards 0s; */
	}
	.section_0 p {
		font-family: 'Mozilla Headline', sans-serif;
		font-weight: 400;
		font-size: 2.4em;
		min-height: 1.6em;
		text-align: left;
		/* opacity: 0;
		animation: flip 1.5s forwards .5s; */
	}
	/* CTA BUTTON */
	.cube {
		color: #fff;
		cursor: pointer;
		font-family: 'Mozilla Headline', sans-serif;
		transition: all 0.85s cubic-bezier(0.17, 0.67, 0.14, 0.93);
		transform-style: preserve-3d;
		transform-origin: 100% 50%;
		width: 10em;
		height: 4em;
	}

	.cube:hover {
		transform: rotateX(-90deg);
	}

	.side {
		box-sizing: border-box;
		position: absolute;
		display: inline-block;
		height: 4em;
		width: 10em;
		text-align: center;
		text-transform: uppercase;
		padding-top: 1.5em;
		font-weight: 800;
	}

	.top {
		background: rgb(255, 255, 255);
		color: #000000;
		font-size: 1em;
		font-weight: 800;
		transform: rotateX(90deg) translate3d(0, 0, 2em);
		box-shadow: inset 0 0 0 3px #000000;
	}

	.front {
		background: #0000008a;
		color: #fff;
		font-size: 1em;
		font-weight: 800;
		box-shadow: inset 0 0 0 3px #000000;
		transform: translate3d(0, 0, 2em);
	}
	@media (max-width: 580px) {
		.section_0 {
			height: 100vh;
		}
		.section_0 h1 {
			font-size: 1.8em;
		}
		.section_0 p {
			font-size: 1.1em;
			padding-left: 3vw;
			font-weight: 500;
		}
		.column img {
		width: 25vw;
	}
	}
	@keyframes flip {
		from {
			transform: translateY(-1vh);
			opacity: 0;
		}
		to {
			transform: translateY(0vh);
			opacity: 1;
		}
	}
</style>
