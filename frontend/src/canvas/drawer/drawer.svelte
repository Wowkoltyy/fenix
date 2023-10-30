<script lang="ts">
    import {clearDrawer, setAccuracy, setColor, setDrawMode, startDrawer} from "./drawer";
    import feather from "../../assets/feather.svg.svelte";
    import circlesquare from "../../assets/circlesquare.svg.svelte";
    import boundingboxcircles from "../../assets/boundingboxcircles.svg.svelte";
    import highlighter from "../../assets/highlighter.svg.svelte";

    import {onMount} from "svelte";
    import {clearFigures, startFiguresDrawer} from "./figures";
    import eraser from "../../assets/eraser.svg.svelte";
    import {loading, createConnection, sendSpeed, sendData} from "./websocket";
    let l = false

    function changeSpeed() {
        // if (Math.abs(speed - lastspeed) < 300) return
        sendSpeed(speed)
    }
    function changeAccuracy() {
        setAccuracy(accuracy)
    }
    let speed: number;
    $: speed, changeSpeed();

    let accuracy: number;
    $: accuracy, changeAccuracy();

    let scale: number = 64;
    $: scale, sendData(252, [scale])
    let xs: number = 100
    $: xs, sendData(253, [xs])
    let ys: number = 100
    $: ys, sendData(254, [ys])

    type Modes = "draw" | "draw_realtime" | "points" | "circle"
    let color: string
    $: color, setColor(color);
    let drawMode: Modes
    $: setDrawMode(drawMode);
    let canvas: HTMLCanvasElement
    let figuresCanvas: HTMLCanvasElement
    let inte = setInterval(() => {
        l = loading //кастыль
        if (!l) clearInterval(inte)
    }, 300)
    onMount(() => {startDrawer(canvas, 'rgb(0, 0, 0)', [156, 163, 175, .2]); startFiguresDrawer(figuresCanvas, canvas); createConnection(canvas)
        speed = 2000
        accuracy = 2});
</script>
<span class:hidden={!l} class="loading loading-infinity loading-lg"></span>
<div class:hidden={l}>
    <div>
        <ul class="menu bg-base-200 rounded-box w-fit absolute left-1 z-10">
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
                <a class="tooltip tooltip-right" data-tip="Очистить" on:click={() => { clearDrawer(); clearFigures() }}>
                    <svelte:component this={eraser}></svelte:component>
                </a>
            </li>
        </ul>

        <div class="relative z-0 ml-7">
            <canvas class="absolute z-10" bind:this={figuresCanvas} ></canvas>
            <canvas bind:this={canvas} class="container max-w-[90%] min-h-[70%] max-h-[70%] mt-6 rounded-xl mx-auto z-0"></canvas>
        </div>

        <div class="collapse bg-base-200 m-3 max-w-[90%]">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                Качество
            </div>
            <div class="collapse-content">
                <p>
                    <input bind:value={accuracy} type="range" min="1" max="100" step="1" class="range">
                </p>
            </div>
        </div>
        <div class="collapse bg-base-200 m-3 max-w-[90%]">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                Скорость
            </div>
            <div class="collapse-content">
                <p>
                    <input bind:value={speed} type="range" min="100" max="5000" class="range">
                </p>
            </div>
        </div>
        <div class="collapse bg-base-200 m-3 max-w-[90%]">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                Расстановка
            </div>
            <div class="collapse-content">

                <p class="flex">
                    X
                    <input bind:value={xs} type="range" min="0" max="200" step="1" class="range m-4 max-w-[40%]">
                    Y <input bind:value={ys} type="range" min="0" max="200" step="1" class="range m-4 max-w-[40%]">
                </p>
                <p class="flex">
                     Масштаб<input bind:value={scale} type="range" min="0" max="255" step="1" class="range m-4 max-w-[78%]">
                </p>
            </div>
        </div>

    </div>
    <!--<div class="btm-nav z-30">-->

<!--        <input bind:value={color} class="" placeholder="Цвет" type="color">-->
</div>
<!--</div>-->


