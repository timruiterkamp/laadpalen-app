<template>
  <header class="big-header">
    <h1 class="big-header__logo">Laadpalen app</h1>
    <div class="big-header__title">
      <h2 class="bold">Hey {{name}}</h2>
      <h3>Welk probleem wil je melden?</h3>
    </div>
  </header>
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