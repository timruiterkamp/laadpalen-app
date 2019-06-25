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
      return this.$store.getters.GET_NAME
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

  &__title {
    color: $color-white;
    font-weight: 100;
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
