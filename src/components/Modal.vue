<template>
  <transition name="fade">
    <div class="mask">
      <div class="modal">
        <header>
          <slot name="header">
            <h3>default header</h3>
          </slot>
        </header>
        <div class="text-fade-wrapper">
          <div class="body">
            <slot name="body">
              default bodyefault bodyefault bodyefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodyefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodyefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodydefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodyefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodyefault bodyefault bodyefault
              bodyefault bodyefault bodyefault bodyefault bodyefault bodyefault
              body
            </slot>
          </div>
        </div>
        <footer>
          <slot name="footer">
            default footer
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
}
</style>
