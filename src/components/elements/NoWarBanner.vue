<template>
  <a
    id="no-war-banner"
    href="https://www.ukrfund.org/"
    class="em-ribbon"
    :style="bannerStyles"
    title="Do something to stop this war! Russians are killing our children and civilians!"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="sr-only"
      >Stop the war in Ukraine. Support through donations.</span
    >
  </a>
</template>

<script>
  export default {
    computed: {
      bannerStyles() {
        return {
          position: 'absolute',
          top: '0',
          left: '0',
          background:
            "url('https://stfalcon.github.io/stopwar/img/stop-war-in-ukraine.png') no-repeat",
          zIndex: 1,
          border: 0,
          width: '70px',
          height: '70px',
          backgroundSize: 'contain'
        };
      }
    }
  };
</script>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
