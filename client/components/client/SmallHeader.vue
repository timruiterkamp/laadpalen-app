<template>
  <div class="small-header">
    <div class="c-container">
      <svg class="small-header__back" viewBox="0 0 50 50" @click="goBack">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>

      <h3 class="small-header__title">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'no title',
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';
$widthHeight: 40px;

.small-header {
  height: 5rem;
  display: block;
  @include linear-gradient($color-primary);
  padding: $padding-m $padding-s 0 $padding-l;
  @include shadow(1rem);
  .c-container {
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 100%;
  }

  &__back {
    cursor: pointer;
    height: $widthHeight;
    width: $widthHeight;
    fill: none;
    stroke: $color-white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform: translateY(3px);

    polyline {
      transform: scale(1.8);
    }
  }

  &__title {
    color: $color-white;
    font-size: 1.4rem;
    margin: 0;
    margin-left: $margin-s;
    span {
      display: block;
    }
  }
  path {
    fill: $color-primary;
  }
}
</style>
