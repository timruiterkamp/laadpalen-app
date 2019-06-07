<template>
  <div ref="popup" class="popup" :class="visible ? 'visible' : ''">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      el: Object
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show(e) {
        const rect = e.target.getBoundingClientRect()
        this.setCoords(window.scrollY + rect.top - 8, rect.left + rect.width / 2)
        this.toggle()
      },
      toggle() {
        this.visible = !this.visible
      },
      setCoords(top, left) {
        this.$refs.popup.style = `top: ${top}px; left: ${left}px;`
      }
    }
  }
</script>

<style lang="scss">
  @import '~/assets/css/config/main.scss';
  .popup {
    padding: $padding-m;
    border-radius: $rounding-s;
    background-color: $color-grey-dark;
    color: $color-white;
    display: table;
    position: absolute;
    box-shadow: 0px 1.5rem 1rem rgba(0,0,0,0.08);
    opacity: 0;
    transition: opacity .3s;
    transform: translate(-50%, -100%);
    pointer-events: none;
    &.visible {
      opacity: 1;
      pointer-events: all;
    }
    &::after {
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%) rotate(45deg);
      width: .5rem;
      height: .5rem;
      background-color: inherit;
      content: "";
    }
  }
</style>
