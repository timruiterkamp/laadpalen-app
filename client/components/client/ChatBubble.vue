<template>
  <div class="chat-bubble" :class="'chat-bubble--' + context">
    <div class="chat-bubble--bubble">
      <p class="chat-bubble--text">
        <slot></slot>
      </p>
    </div>
    <span class="chat-bubble--time">{{time}}</span>
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
  &--bubble {
    padding: $padding-m;
    max-width: 80%;
    margin-bottom: $margin-xs;
    box-shadow: $shadow-m;
  }
  &--text {
    margin: 0;
  }
  &--time {
    margin-bottom: $padding-l;
    font-size: 0.9rem;
  }
  &--operator {
    .chat-bubble {
      &--bubble {
        border-radius: $rounding-s $rounding-s $rounding-s 0;
        background-color: $color-white;
      }
      &--text {
        color: $color-grey-dark;
      }
    }
  }
  &--user {
    .chat-bubble {
      &--bubble {
        border-radius: $rounding-s $rounding-s 0 $rounding-s;
        align-self: flex-end;
        @include linear-gradient($color-primary);
      }
      &--text {
        color: $color-white;
      }
      &--time {
        align-self: flex-end;
      }
    }
  }
}
</style>
