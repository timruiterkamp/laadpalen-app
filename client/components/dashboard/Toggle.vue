<template>
  <section class="toggle" :class="value ? 'toggle--checked' : ''">
    <label class="toggle__label">
      <div class="toggle__input-icon">
        <transition name="fade">
          <svg
            v-if="value"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-check"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </transition>
      </div>
      <input class="toggle__input" ref="input" type="checkbox" :checked="value" @input="emitChange">
      <div class="toggle__content">
        <slot></slot>
      </div>
    </label>
  </section>
</template>

<script type="text/javascript">
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitChange() {
      this.$emit('input', this.$refs.input.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.toggle {
  border-radius: $rounding-s;
  @include shadow(1rem);
  position: relative;
  margin: $margin-s 0;
  display: table;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background-color: $color-white;
  &:hover {
    .toggle__input-icon {
      svg {
        transform: scale(1.2);
      }
    }
  }
  &__input {
    opacity: 0;
    display: none;
  }
  &__label {
    border-radius: $rounding-s;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__content {
    padding: $padding-s * 1.25 $padding-m;
    padding-left: $padding-m * 3 + $padding-m;
    display: block;
    font-size: 1rem;
  }
  &__input-icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: $padding-m * 3;
    border-radius: $rounding-s 0 0 $rounding-s;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
    color: $color-white;
    transition: all 0.3s;
    @include linear-gradient($color-grey-medium);
    svg {
      width: 20px;
      transition: inherit;
    }
  }
  &--checked {
    .toggle__input-icon {
      @include linear-gradient($color-primary);
    }
  }
}
</style>
