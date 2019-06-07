<template>
  <div class="big-header">
    <h2 class="big-header__title">
      <span class="bold">Hey {{name}}</span>
      Welk probleem wil je melden?
    </h2>

    <div class="big-header__wave">
      <div class="svg-container">
        <svg viewBox="0 0 286.33 149.3">
          <path
            d="M286.33,0.28v91.53c-116.65,0-86.51,26.23-178.05,26.79C64.73,118.87,0,149.3,0,149.3L0,0L286.33,0.28z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'No name'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.big-header {
  min-height: 20rem;
  display: block;
  // @include linear-gradient($color-primary);
  padding: $padding-xl * 2 $padding-s 0 $padding-l;
  &__wave {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    height: 300px;
  }

  &__title {
    color: $color-white;
    span {
      display: block;
    }
  }
  path {
    fill: $color-primary;
  }
}
</style>