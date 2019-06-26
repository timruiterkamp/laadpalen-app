<template>
  <header class="big-header">
    <h3 class="big-header__title">
      <span class="bold">Hey {{name}},</span>
      Welk probleem wil je melden?
    </h3>
  </header>
</template>

<script>
export default {
  computed: {
    name() {
      return (
        this.$store.getters.GET_NAME.charAt(0).toUpperCase() +
        this.$store.getters.GET_NAME.slice(1)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.big-header {
  min-height: 10rem;
  display: block;
  @include linear-gradient($color-primary);
  // padding: $padding-m * 2 $padding-s 0 $padding-l;
  @include shadow(1rem);
  display: flex;
  justify-content: left;
  align-items: center;

  &__wave {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
  }

  &__title {
    padding: 1rem;
    color: $color-white;
    font-weight: 100;
    max-width: 40rem;
    width: 100%;
    font-size: 1.5rem;
    max-width: 40rem;
    margin: 0 auto;
    span {
      display: block;
      margin-bottom: $margin-xs;
    }
  }
  path {
    fill: $color-primary;
  }
}
</style>
