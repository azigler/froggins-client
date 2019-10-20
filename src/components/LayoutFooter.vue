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
  padding-top: 0.5rem;

  div.discord {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 0.7rem;

    > a {
      width: 6rem;
      margin-bottom: 0;
      background-repeat: no-repeat;
      background-image: url('https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg');
    }
  }

  span.copyright {
    font-size: 0.7rem;
    color: #414a73;
    text-shadow: #7289d8 0px 0px 13px;
    padding-top: 0.8rem;
  }
}

main.layout.mobile {
  footer.layout-footer {
    border-top: 2px solid #1c2f1c;
    box-shadow: inset 0px 5px 13px 0px #657566;

    div.discord {
      margin-right: 0.5rem;
      margin-top: -0.8rem;
      justify-content: flex-end;
    }

    span.copyright {
      align-self: flex-end;
      margin-right: 0.75rem;
      margin-top: -0.6rem;
    }
  }
}
</style>
