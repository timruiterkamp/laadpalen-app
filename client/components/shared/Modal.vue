<template>
  <transition name="modal">
    <div v-if="visible" class="modal">
      <div @click="hide" class="modal__background"></div>
      <div class="modal__inner">
        <div class="modal__inner-close" @click="hide">
          <svg class="modal__inner-icon">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        <slot name="header"></slot>

        <div class="modal__content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show(e) {
      this.visible = true
      document.body.style.overflowY = 'hidden'
    },
    hide() {
      this.visible = false
      document.body.style.overflowY = 'scroll'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';
$widthHeight: 2.5rem;

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;

  &__background {
    top: 0;
    left: 0;
    z-index: 99;
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: rgba($color-grey-dark, 0.8);
    z-index: 5;
  }

  &__inner {
    background-color: $color-white;
    border-radius: $rounding-s;
    min-height: 20%;
    width: 90%;
    max-width: 40rem;
    position: relative;
    transition: transform 0.5s, opacity 0.3s;
    z-index: 9;

    &-close {
      position: absolute;
      border-radius: $widthHeight;
      top: calc(#{-$widthHeight / 2});
      right: calc(#{-$widthHeight / 2});
      height: $widthHeight;
      width: $widthHeight;
      @include linear-gradient($color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9;
      &:hover {
        @include linear-gradient(darken($color-primary, 5%));
        .modal__inner-icon {
          transform: rotate(90deg);
        }
      }
    }
    &-icon {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: $color-white;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.3s;
    }
  }
  &__content {
    padding: $padding-m;
  }
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  .modal__inner {
    transform: translateY(2rem);
  }
}
</style>
