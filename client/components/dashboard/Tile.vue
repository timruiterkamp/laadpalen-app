<template>
  <article class="d-tile">
    <slot></slot>
  </article>
</template>

<style lang="scss">
@import '~/assets/css/config/main.scss';
.d-tile {
  padding: $padding-m;
  background-color: $color-white;
  border-radius: $rounding-m;
  display: table;
  @include shadow();
}
</style>
