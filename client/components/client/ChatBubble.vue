<template>
  <div class="chat-bubble" :class="'chat-bubble__' + context">
    <div class="chat-bubble__bubble">
      <p class="chat-bubble__text">
        <slot></slot>
      </p>
    </div>
    <span class="chat-bubble__time">{{time}}</span>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: 'No time'
    },
    context: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.chat-bubble {
  display: flex;
  flex-direction: column;
  &__bubble {
    padding: $padding-m;
    max-width: 80%;
    margin-bottom: $margin-xs;
    box-shadow: $shadow-m;
  }
  &__text {
    margin: 0;
  }
  &__time {
    margin-bottom: $padding-l;
    font-size: 0.9rem;
  }
  &__operator {
    .chat-bubble {
      &__bubble {
        border-radius: $rounding-s $rounding-s $rounding-s 0;
        background-color: $color-white;
      }
      &__text {
        color: $color-grey-dark;
      }
    }
  }
  &__user {
    .chat-bubble {
      &__bubble {
        border-radius: $rounding-s $rounding-s 0 $rounding-s;
        align-self: flex-end;
        @include linear-gradient($color-primary);
      }
      &__text {
        color: $color-white;
      }
      &__time {
        align-self: flex-end;
      }
    }
  }
}
</style>
