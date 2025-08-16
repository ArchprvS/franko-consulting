<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	let menu_open = $state(false);
	let scroll_offtop = $state(false);
	let menubar_hide = $state(false);

	let scroll_direction = $state(false);
	let previous_max = $state(0);
	let current_max = $state(0);

	const toggle_menu = () => {
		menu_open = !menu_open;
	};

	onMount(() => {
		window.addEventListener('scroll', () => {
			scroll_offtop = window.scrollY > 50;
			previous_max = current_max;
			current_max = window.scrollY;

			if (previous_max < current_max) {
				scroll_direction = true;
			} else {
				scroll_direction = false;
			}

			if (window.scrollY > 200 && scroll_direction) {
				menubar_hide = true;
			} else {
				menubar_hide = false;
			}
		});
	});

	$effect(() => {
    if (menu_open) {
        // Oblicz szerokość scrollbara
        const scrollbar_width = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbar_width}px`;
    } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };
});
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@200..700&display=swap"
	rel="stylesheet"
/>

<div class="header">
	<div class="menubar" class:menubar_hide>
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
	<div class="menumask" class:slidein={menu_open || scroll_offtop} class:menubar_hide></div>
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
		transition: transform 0.5s ease-in-out;
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
	.line_0,
	.line_1,
	.line_2 {
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
		transition:
			backdrop-filter 0.5s ease,
			transform 0.5s ease-in-out;
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
		transition:
			backdrop-filter 0.5s ease,
			transform 0.5s ease-in-out;
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
	.menubar_hide {
		transform: translateY(-8vh);
	}
	.no-scroll {
		overflow: hidden;
		height: 100vh;
	}
	@media (max-width: 580px) {
		.logo p {
			font-size: 1.3em;
		}
	}
</style>
