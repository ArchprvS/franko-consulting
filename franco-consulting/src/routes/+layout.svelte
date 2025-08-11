<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	let menu_open = $state(false);

	const toggle_menu = () => {
		menu_open = !menu_open
	}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@200..700&display=swap"
	rel="stylesheet"
/>

<div class="header">
	<div class="menubar">
		<div class="logo">
		<!-- <img src="/logo_fc_new.png" alt="logo" /> -->
		<p>Franko Consulting</p>
	</div>
	<button class="menubutton" onclick={toggle_menu} aria-label="close">
		<div class="line_0" class:rotate_0={menu_open}></div>
		<div class="line_1" class:rotate_1={menu_open}></div>
		<div class="line_2" class:rotate_2={menu_open}></div>
	</button>
	</div>
	<div class="menumask" class:slidein={menu_open}></div>
	<div class="menubox" class:slidein={menu_open}>
		<a href="">Kim jesteśmy?</a>
		<a href="">Co oferujemy?</a>
		<a href="">Z kim współpracujemy?</a>
		<a href="">Dlaczego warto nam zaufać?</a>
	</div>
</div>

{@render children?.()}

<style>
	.header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.menubar {
		width: 100%;
		height: 8vh;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 20;
	}
	.logo {
		display: flex;
	}
	/* .logo img {
		padding: 0 10px;
	} */
	.logo p {
		font-family: 'Mozilla Headline', sans-serif;
		font-size: 1.5em;
		display: flex;
		align-items: center;
		padding-left: 20px;
		z-index: 20;
	}
	.menubutton {
		background-color: transparent;
		border: none;
		width: 6vh;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 2vh 20px;
		padding: none;
		cursor: pointer;
		z-index: 20;
	}
	.line_0, .line_1, .line_2 {
		width: 100%;
		height: 2px;
		background-color: black;
		transition: all 0.4s ease-in-out;
		z-index: 20;
	}
	.rotate_0 {
		transform: translateX(2.7vh) translateY(0.9vh) rotate(45deg);
		width: 50%;
	}
	.rotate_1 {
		transform: rotate(180deg);
		opacity: 0;
	}
	.rotate_2 {
		transform: translateX(2.7vh) translateY(-1vh) rotate(-45deg);
		width: 50%;
	}

	/* Menu */
	.menumask {
		background-color: rgba(200, 200, 200, 0.4);
		width: 100%;
		height: 8vh;
		position: fixed;
		z-index: 10;
		border-bottom: 1px solid black;
		/* display: none; */
		/* backdrop-filter: blur(20px); */
		transform: translateX(-100%);
		transition: backdrop-filter 0.7s ease, transform 0.7s ease-in-out;
	}
	.menubox {
		background-color: rgba(200, 200, 200, 0.4);
		border-top: 1px solid black;
		width: 100%;
		height: 2000px;
		top: 8vh;
		position: fixed;
		z-index: 10;
		/* display: none; */
		/* backdrop-filter: blur(20px); */
		display: flex;
		flex-direction: column;
		text-align: right;
		transform: translateX(100%);
		transition: backdrop-filter 0.7s ease, transform 0.7s ease-in-out;
	}
	.menubox a {
		font-family: 'Mozilla Headline';
		font-size: 3.2vh;
		padding: 4vw;
		text-decoration: none;
		color: black;
		transition: all 0.4s ease;
	}
	.menubox a:hover {
		transform: translateX(-2vw);
	}
	.slidein {
		transform: translateX(0);
		backdrop-filter: blur(15px);
	}
	@media (max-width: 580px) {
		.logo p {
			font-size: 1.3em;
		}
	}
</style>
