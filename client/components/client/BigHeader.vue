<template>
  <section class="big-header">
    <h1 class="big-header__logo">Laadpalen app</h1>
    <div class="big-header__title">
      <h2 class="bold">Hey {{name}}</h2>
      <h3>Welk probleem wil je melden?</h3>
    </div>

    <!-- <div class="big-header__wave">
      <div class="svg-container">
        <svg viewBox="0 0 286.33 149.3">
          <path
            d="M286.33,0.28v91.53c-116.65,0-86.51,26.23-178.05,26.79C64.73,118.87,0,149.3,0,149.3L0,0L286.33,0.28z"
          ></path>
        </svg>
      </div>
    </div>-->
  </section>
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
  min-height: 14rem;
  display: block;
  @include linear-gradient($color-primary);
  padding: $padding-xl * 2 $padding-s 0 $padding-l;
  @include shadow(1rem);

  &__wave {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
  }

  &__logo {
    color: $color-white;
    font-weight: 100;
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
  }

  &__title {
    h2,
    h3 {
      display: block;
      color: $color-white;
      padding: 0;
      margin: 0;
    }
  }
  path {
    fill: $color-primary;
  }
}
</style>