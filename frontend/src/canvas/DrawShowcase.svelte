<script lang="ts">
    import {onMount} from "svelte";
    import feather from "../assets/feather.svg.svelte";
    import highlighter from "../assets/highlighter.svg.svelte";
    import boundingboxcircles from "../assets/boundingboxcircles.svg.svelte";
    import circlesquare from "../assets/circlesquare.svg.svelte";
    import eraser from "../assets/eraser.svg.svelte";

    let canvas: HTMLCanvasElement;
    onMount(() => {
        let ctx = canvas.getContext("2d")!
        ctx.fillStyle = 'rgb(156, 163, 175)'
        ctx.fillRect(0, 0, innerWidth, innerHeight)
    })
    let drawMode: string
</script>
<ul class="menu bg-base-200 rounded-box w-fit absolute left-1">
    <li>
        <a class="tooltip tooltip-right" class:active={drawMode === "draw_realtime"} data-tip="Рисование в реальном времени" on:click={() => { drawMode = "draw_realtime"; }}>
            <svelte:component this={highlighter}></svelte:component>
        </a>
    </li>
    <li>
        <a class="tooltip tooltip-right" class:active={drawMode === "draw"} data-tip="Рисование" on:click={() => { drawMode = "draw"; }}>
            <svelte:component this={feather}></svelte:component>
        </a>
    </li>
    <li>
        <a class="tooltip tooltip-right" class:active={drawMode === "points"} data-tip="Точки" on:click={() => { drawMode = "points"; }}>
            <svelte:component this={boundingboxcircles}></svelte:component>
        </a>
    </li>
    <li>
        <a class="tooltip tooltip-right" class:active={drawMode === "circle"} data-tip="Окружности" on:click={() => { drawMode = "circle"; }}>
            <svelte:component this={circlesquare}></svelte:component>
        </a>
    </li>
    <li>
        <a class="tooltip tooltip-right" data-tip="Очистить" on:click={() => {  }}>
            <svelte:component this={eraser}></svelte:component>
        </a>
    </li>
</ul>
<canvas bind:this={canvas} class="container w-[80%] min-h-[70%] mt-6 rounded-xl mx-auto transition-all hover:scale-105 z-0"></canvas>