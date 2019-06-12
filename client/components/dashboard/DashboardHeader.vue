<template>
  <header class="d-header" :class="nav_open ? 'nav-open' : ''">
    <div class="d-header__top">
      <h1 class="d-header__title">Laadpalen</h1>
    </div>
    <nav class="d-nav">
      <ul class="d-nav__list">
        <li class="d-nav__list-item"><nuxt-link @click.native="toggleNav" class="d-nav__link" to="/dashboard">Overzicht</nuxt-link></li>
        <li class="d-nav__list-item"><nuxt-link @click.native="toggleNav" class="d-nav__link" to="/dashboard/meldingen">Meldingen</nuxt-link></li>
        <li class="d-nav__list-item"><nuxt-link @click.native="toggleNav" class="d-nav__link" to="/dashboard/inzichten">Inzichten</nuxt-link></li>
      </ul>
    </nav>
    <button class="d-header__menu-toggle" @click="toggleNav">{{nav_open ? 'sluit' : 'menu'}}</button>
    <div class="nav-bg" @click="toggleNav">
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        nav_open: false
      }
    },
    methods: {
      toggleNav() {
        this.nav_open = !this.nav_open
      }
    }
  }
</script>

<style lang="scss">
  @import '~/assets/css/config/main.scss';
  .d-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $color-white;
    @include shadow($size: .5rem, $alpha: .1);
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 60rem) {
      max-width: 12.5rem;
      height: 100%;
      max-height: 100vh;
      flex-direction: column;
    }
    &__top {
      padding: $padding-m;
      display: flex;
      align-items: center;
      @include linear-gradient($color-primary);
      color: $color-white;
      width: 100%;
      height: 3.5rem;
      @media screen and (min-width: 60rem) {
        height: auto;
        justify-content: center;
        flex-direction: column;
        padding: $padding-xl $padding-m;
      }
    }
    &__title {
      margin: 0;
      color: inherit;
      font-size: 1.25rem;
    }
    &__bottom {
      margin-top: auto;
    }
    &__menu-toggle {
      border: none;
      background: none;
      position: fixed;
      top: 0;
      right: 0;
      height: 3.5rem;
      padding: $padding-m;
      color: white;
      font-size: 1rem;
      &:focus {
        outline: none;
      }
      @media screen and (min-width: 60rem) {
        display: none;
      }
    }
    .nav-bg {
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: -2;
      background-color: rgba($color-grey-dark, .9);
      opacity: 0;
      pointer-events: none;
      transition: opacity .5s;
    }
    &.nav-open {
      .d-nav {
        transform: translateX(100vw);
        @media screen and (min-width: 60rem) {
          transform: translateX(0);
        }
      }
      .nav-bg {
        opacity: 1;
        pointer-events: all;
        @media screen and (min-width: 60rem) {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
  .d-nav {
    width: 12.5rem;
    left: -100vw;
    position: fixed;
    bottom: 0;
    height: 100vh;
    transition: transform .3s;
    background-color: $color-white;
    z-index: -1;
    padding-top: 3.5rem;
    @media screen and (min-width: 60rem) {
      padding-top: 0;
      position: relative;
      left: 0;
      height: auto;
      max-width: 100%;
    }
    &__list {
      list-style: none;
      padding: 0;
    }
    &__link {
      display: block;
      padding: $padding-m;
      text-decoration: none;
      width: 100%;
      background-color: $color-white;
      color: $color-grey-dark;
      transition: background .3s, color .3s;
      font-weight: lighter;
      &:hover {
        color: $color-white;
        background: lighten($color-grey-dark, 20%);
      }
      &.nuxt-link-exact-active {
        background-color: $color-grey-dark;
        color: $color-white;
        cursor: default;
        font-weight: 500;
      }
    }
  }
</style>
