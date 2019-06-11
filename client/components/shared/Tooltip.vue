<template>
  <div ref="tooltip" class="tooltip" :class="visible ? 'visible' : ''">
    <div x-arrow></div>
    <slot></slot>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  export default {
    props: {
      el: Object,
      placement: {
        type: String,
        default: 'top'
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show(e) {
        new Popper(e.target, this.$refs.tooltip, {
          placement: this.placement
        });
        this.toggle()
      },
      toggle() {
        this.visible = !this.visible
      }
    }
  }
</script>

<style lang="scss">
  @import '~/assets/css/config/main.scss';
  $popup-arrow-size: .5rem;
  .tooltip {
    padding: $padding-m;
    border-radius: $rounding-s;
    background-color: $color-grey-dark;
    color: $color-white;
    @include shadow($size: 2rem, $alpha: .15);
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
    max-width: 90%;
    font-size: .875rem;
    position: absolute;
    top: 0;
    left: 0;
    &.visible {
      opacity: 1;
      pointer-events: all;
    }
    [x-arrow] {
      width: $popup-arrow-size;
      height: $popup-arrow-size;
      background-color: inherit;
      z-index: 2;
      position: absolute;
      transform: rotate(45deg);
    }
    &[x-placement="bottom"] {
      margin-top: $popup-arrow-size;
      [x-arrow] {
        top: -$popup-arrow-size / 2;
      }
    }
    &[x-placement="left"] {
      margin-right: $popup-arrow-size;
      [x-arrow] {
        right: -$popup-arrow-size / 2;
      }
    }
    &[x-placement="top"] {
      margin-bottom: $popup-arrow-size;
      [x-arrow] {
        bottom: -$popup-arrow-size / 2;
      }
    }
    &[x-placement="right"] {
      margin-left: $popup-arrow-size;
      [x-arrow] {
        left: -$popup-arrow-size / 2;
      }
    }

    p, h3, h2, li {
      color: $color-white;
    }
    h3, h2 {
      font-size: 1rem;
    }
    p, li {
      font-size: .875rem;
    }
  }
</style>
