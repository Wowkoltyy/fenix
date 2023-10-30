<script>
import drawer from "../canvas/drawer/drawer.svelte";
import DrawShowcase from "../canvas/DrawShowcase.svelte";
import apple from "../assets/apple.svg.svelte";
import microsoft from "../assets/microsoft.svg.svelte";
import debian from "../assets/debian.svg.svelte";
</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="mockup-browser border bg-base-300 min-w-[50%] min-h-[30%] [transform:rotateX(20deg)rotateZ(-20deg)skewY(8deg)scale(1)] max-[980px]:![transform:translate3d(0,0,0)] xl:-right-20 xl:-mr-10 xl:h-[32rem] xl:w-[50rem] xl:pr-4 xl:shadow-[-0.05rem_0.1rem_0rem_#00000014] xl:backdrop-blur-0">
            <div class="mockup-browser-toolbar">
                <div class="input">fenix.local</div>
            </div>
            <div class="flex justify-center px-4 py-16 bg-base-200">
                <DrawShowcase></DrawShowcase>
            </div>
        </div>
        <div>
            <h1 class="text-5xl font-bold">Fenix</h1>
            <p class="py-6 max-w-[60%]">
                <b>Fenix</b> — это программное обеспечение для лазерных проекторов,
                которое позволяет пользователям создавать и управлять своими собственными лазерными проекторами.
            </p>
            <button class="btn btn-primary">Get Started</button>
        </div>
    </div>
</div>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center ">
        <div class="max-w-md ">
            <h1 class="text-5xl font-bold">Приложение</h1>
            <p class="py-6">Скачайте приложение для использования всех функций Fenix.</p>
            <div class="flex justify-center my-6 gap-2 items-center ">
                <button class="btn btn-primary">
                    <svelte:component this={apple}></svelte:component>
                    Скачать для macOS
                </button>
                <button class="btn btn-primary">
                    <svelte:component this={microsoft}></svelte:component>
                    Скачать для Windows
                </button>
                <button class="btn btn-primary">
                    <svelte:component this={debian}></svelte:component>
                    Скачать для Debian
                </button>
            </div>
        </div>
    </div>
</div>

