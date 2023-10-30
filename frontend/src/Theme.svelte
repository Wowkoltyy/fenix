<script lang="ts">
    let theme: "winter" | "synthwave" = "synthwave"
    let stroke = "#fff"
    export { stroke }
    const toggleTheme = () => {
        stroke = stroke === "#fff" ? "#000" : "#fff"
        theme = theme === "synthwave" ? 'winter' : 'synthwave'
        document.querySelector('html')!.setAttribute('data-theme', theme)
    }
    import moon from "./assets/moon.svg.svelte";
    import sun from "./assets/sun.svg.svelte";

</script>
<label class="swap swap-rotate pl-8">
    <input on:click={toggleTheme} type="checkbox" />
    <div class="swap-on"><svelte:component this={moon}></svelte:component></div>
    <div class="swap-off"><svelte:component this={sun}></svelte:component></div>
</label>
