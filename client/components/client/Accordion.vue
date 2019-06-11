<template>
  <div class="accordion">
    <div class="accordion__header" @click="showOptions">
      <div class="accordion__header-title">{{title}}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="accordion__header-icon"
        :class="{ 'accordion__header-icon-active': show }"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <transition
      name="accordion"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
    >
      <ul class="accordion__options" v-show="show">
        <li
          class="accordion__options-item"
          v-for="(item, i) in options"
          :key="`accordion-item-${i}`"
        >
          <nuxt-link :to="item.slug" class="accordion__options-item-anchor">{{item.title}}</nuxt-link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="accordion__options-item-icon"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    title: {
      type: String,
      deafult: 'No title',
      required: true
    },
    options: {
      type: Array,
      deafult: 'No title',
      required: true
    }
  },
  methods: {
    showOptions() {
      this.show = !this.show
    },
    beforeEnter(el) {
      el.style.height = '0'
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave(el) {
      el.style.height = '0'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
$widthHeight: 24px;

.accordion {
  margin-bottom: $margin-s;
  &__header {
    padding: $padding-m $padding-l;
    border-radius: $rounding-s;
    @include linear-gradient($color-grey-dark);
    @include shadow(1.5rem);
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    &:hover {
      @include linear-gradient(darken($color-grey-dark, 5%));
    }
    &-title {
      color: $color-white;
    }
    &-icon {
      fill: none;
      stroke: $color-white;
      height: $widthHeight;
      width: $widthHeight;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.3s ease-in-out;
      &-active {
        transform: rotate(180deg);
      }
    }
  }
  &__options {
    overflow: hidden;
    transition: 0.3s;
    list-style-type: none;
    padding: 0;
    background-color: $color-white;
    border-radius: 0 0 $rounding-s $rounding-s;
    &-item {
      position: relative;
      &-icon {
        position: absolute;
        right: $padding-xl;
        top: calc(50% - (#{$widthHeight} / 2));
        fill: none;
        stroke: $color-grey-dark;
        height: $widthHeight;
        width: $widthHeight;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: transform 0.3s ease-in-out;
        transform: rotate(270deg);
      }
      &:after {
        position: absolute;
        bottom: 0;
        height: 1px;
        width: 100%;
        background-color: $color-grey-low;
        display: block;
        content: '';
      }
      &:last-of-type {
        &:after {
          content: none;
        }
      }
      &-anchor {
        padding: $padding-m $padding-l;
        color: $color-grey-dark;
        text-decoration: none;
        user-select: none;
        width: 100%;
        position: relative;
        display: block;
      }
      &:hover {
        a {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
