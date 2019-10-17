<template>
  <footer class="layout-footer">
    <div class="discord">
      <a
        class="purple button"
        target="_blank"
        href="https://discord.gg/QscwwBH"
      />
    </div>
    <span class="copyright">
      © {{ new Date().getFullYear() }}
      <a target="_blank" href="https://www.andrewzigler.com/">
        Andrew Zigler
      </a>
    </span>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="scss">
footer.layout-footer {
  display: flex;
  flex-direction: column;

  div.discord {
    height: 3.2rem;
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 5%;

    > a {
      height: 75%;
      width: 50%;
      margin: 0 0.2rem;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-image: url('https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg');
    }
  }

  span.copyright {
    font-size: 0.7rem;
    margin-top: -0.4rem;
    margin-bottom: 0.4rem;
    color: #414a73;
    display: block;
    text-shadow: #7289d8 0px 0px 13px;
  }
}
</style>
