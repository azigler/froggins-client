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
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0.3rem 0;

    > a {
      width: 50%;
      margin: 0.4rem 0;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-image: url('https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg');
    }
  }

  span.copyright {
    font-size: 0.7rem;
    margin-top: 0.4rem;
    color: #414a73;
    display: block;
    text-shadow: #7289d8 0px 0px 13px;
  }
}

main.layout.desktop {
  @media only screen and (max-height: 769px) and (max-width: 1025px) {
    .layout-footer {
      margin-top: 0.8rem;
    }

    span.copyright {
      margin-top: 0.4rem;
    }
  }
}

main.layout.desktop {
  @media only screen and (min-width: 1025px) {
    div.discord {
      margin-top: 0;
    }

    span.copyright {
      margin-top: -0.4rem;
    }
  }
}

main.layout.mobile {
  footer.layout-footer {
    align-self: flex-end;

    &:after {
      content: '';
      position: absolute;
      background-color: #b4cbba;
      width: 100vw;
      left: 0;
      height: 100%;
      z-index: 0;
      border-top: 2px solid #1c2f1c;
    }

    span {
      z-index: 1;
      margin-top: -0.3rem;
    }

    .discord {
      justify-content: flex-end;
      z-index: 1;

      a {
        max-height: 2rem;
        width: 6rem;
      }
    }
  }
}
</style>
