<template>
  <transition name="fade">
    <div class="mask">
      <div class="modal">
        <header>
          <slot name="header">
            <h3>Default modal header</h3>
          </slot>
        </header>
        <div class="text-fade-wrapper">
          <div class="body">
            <slot name="body">
              Default modal body. Ut ultricies porta porttitor. Aenean quis leo
              eget risus placerat consequat in in odio. Sed tempus finibus
              tristique. Quisque mollis libero lectus, vel aliquam neque rhoncus
              eu. Suspendisse quis massa et arcu consequat euismod ac ac justo.
              Duis eleifend dapibus neque, ac tincidunt purus aliquam rhoncus.
              Sed vitae elit ut erat aliquam rutrum at a eros. Suspendisse
              ullamcorper luctus magna. In hac habitasse platea dictumst.
              Vestibulum gravida, tellus id feugiat lobortis, orci sapien
              fringilla arcu, quis cursus sapien lorem quis risus. Proin quis
              posuere quam. Duis vitae molestie ex, nec pretium nunc. In hac
              habitasse platea dictumst. Cras efficitur vulputate iaculis.
            </slot>
          </div>
        </div>
        <footer>
          <slot name="footer">
            <h4>Default modal footer</h4>
          </slot>
          <button class="ok" @click="$emit('close')">
            🆗
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  max-width: 18.75rem;
  margin: 0px auto;
  padding: 1.2rem 2rem;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  header {
    border-bottom: 2px dashed #3e743f;

    h3 {
      margin: 0 auto;
      color: #3e743f;
      text-shadow: 0px 1px 2px #cbd0cb;
    }
  }

  .body {
    margin: 20px 0;
    max-height: 10rem;
    overflow: auto;
  }

  footer {
    height: 2rem;
    h4 {
      position: absolute;
      left: 2rem;
      margin: 0;
    }

    button.ok {
      position: absolute;
      right: 2rem;
    }
  }
}
</style>
