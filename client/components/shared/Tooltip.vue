<template>
  <section ref="tooltip" class="tooltip" :class="classes">
    <div x-arrow></div>
    <slot></slot>
  </section>
</template>

<script>
import Popper from 'popper.js'
export default {
  props: {
    el: Object,
    placement: {
      type: String,
      default: 'top'
    },
    status: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    classes() {
      let classes = 'tooltip--' + this.status
      if (this.visible) {
        classes += ' visible'
      }
      return classes
    }
  },
  methods: {
    show(e) {
      new Popper(e.target, this.$refs.tooltip, {
        placement: this.placement
      })
      this.toggle()
    },
    toggle() {
      this.visible = !this.visible
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/config/main.scss';
$popup-arrow-size: 0.5rem;
.tooltip {
  padding: $padding-m;
  border-radius: $rounding-s;
  color: $color-white;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  max-width: 90%;
  font-size: 0.875rem;
  position: absolute;
  top: 0;
  left: 0;
  &--default {
    background-color: $color-grey-dark;
    @include shadow($size: 2rem, $alpha: 0.15);
  }
  &--primary {
    background-color: $color-primary;
    @include shadow(2rem, $color-primary, 0.5);
  }
  &--secondary {
    background-color: $color-secondary;
    @include shadow(2rem, $color-secondary, 0.5);
  }
  &--tertiary {
    background-color: $color-tertiary;
    @include shadow(2rem, $color-tertiary, 0.5);
  }
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
  &[x-placement='bottom'] {
    margin-top: $popup-arrow-size;
    [x-arrow] {
      top: -$popup-arrow-size / 2;
    }
  }
  &[x-placement='left'] {
    margin-right: $popup-arrow-size;
    [x-arrow] {
      right: -$popup-arrow-size / 2;
    }
  }
  &[x-placement='top'] {
    margin-bottom: $popup-arrow-size;
    [x-arrow] {
      bottom: -$popup-arrow-size / 2;
    }
  }
  &[x-placement='right'] {
    margin-left: $popup-arrow-size;
    [x-arrow] {
      left: -$popup-arrow-size / 2;
    }
  }
}
</style>
