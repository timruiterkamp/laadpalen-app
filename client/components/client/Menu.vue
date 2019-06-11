<template>
  <ul class="menu">
    <nuxt-link class="menu__item" to="#">
      <svg class="menu__item-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
      <span class="menu__item-text">Voeg toe</span>
    </nuxt-link>

    <nuxt-link class="menu__item" to="#">
      <svg class="menu__item-icon">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
        <line x1="8" y1="2" x2="8" y2="18"></line>
        <line x1="16" y1="6" x2="16" y2="22"></line>
      </svg>
      <span class="menu__item-text">Meldingen</span>
    </nuxt-link>

    <nuxt-link class="menu__item" to="#">
      <svg class="menu__item-icon">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
        <path
          d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        ></path>
      </svg>
      <span class="menu__item-text">Berichten</span>
    </nuxt-link>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
$widthHeight: 24px;

.menu {
  height: 6rem;
  width: 100%;
  position: fixed;
  display: flex;
  list-style-type: none;
  color: $color-white;
  justify-content: space-around;
  left: 0;
  bottom: 0;
  @include linear-gradient($color-primary);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 5%;
    transition: background-color 0.3s ease-in-out;
    color: $color-white;
    text-decoration: none;
    font-family: $font-body;
    &:hover {
      background-color: rgba($color-white, 0.1);
    }
    &-icon {
      width: $widthHeight;
      height: $widthHeight;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      stroke: $color-white;
      margin-bottom: $margin-xs / 2;
    }
    &-text {
      font-weight: bold;
      line-break: unset;
    }
  }
}
</style>
