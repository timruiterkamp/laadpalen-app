<template>
  <section class="ticket" :class="'ticket--' + status">
    <div class="ticket__top">
      <h3 class="ticket__title">{{title}}</h3>
      <div
        v-if="showStakeholder ? stakeholder : status"
        class="ticket__tag"
        :class="showStakeholder ? '' : status"
      >{{showStakeholder ? shortenedStakeholder : translatedStatus}}</div>
    </div>
    <div class="ticket__bottom">
      <div class="ticket__content-meta ticket__content-meta--location">
        <p class="ticket__content-meta__text">{{location}}</p>
      </div>
      <div class="ticket__content-meta ticket__content-meta--datetime" v-if="time && date">
        <p class="ticket__content-meta__text">
          <span class="bold">{{time}}</span>
          - {{date}}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'This ticket has no title'
    },
    location: {
      type: String,
      default: 'Unknown location'
    },
    created: {
      type: String,
      default: ''
    },
    stakeholder: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'default'
    },
    showStakeholder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    date() {
      if (!this.created) return ''
      const date = new Date(this.created)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${day < 10 ? '0' + day : day}/${
        month < 10 ? '0' + month : month
      }/${year}`
    },
    time() {
      if (!this.created) return ''
      const date = new Date(this.created)
      const hours = date.getUTCHours()
      const minutes = date.getUTCMinutes()
      return `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`
    },
    translatedStatus() {
      if (this.status === 'open') return 'gemeld'
      if (this.status === 'working') return 'in behandeling'
      if (this.status === 'closed') return 'afgehandeld'
      return 'geen status'
    },
    shortenedStakeholder() {
      const stakeholder = this.stakeholder.toLowerCase().trim()
      if (stakeholder === 'gemeente amsterdam') return 'gemeente'
      if (stakeholder === 'nuon') return 'nuon'
      if (stakeholder === 'idolaad') return 'idolaad'
      return 'algemeen'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';
.allow-drag {
  .ticket {
    &:hover {
      .ticket__content-meta--location {
        .ticket__content-meta__text {
          animation: metascroll 3s infinite linear;
        }
      }
    }
  }
}
.ticket {
  margin: $margin-xs 0;
  padding: $padding-m;
  background-color: $color-white;
  border-radius: $rounding-s;
  @include shadow(1rem);
  display: block;
  max-width: 40rem;
  &__top {
    margin-bottom: $margin-xs;
  }
  &__top,
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__title {
    margin-bottom: 0;
    font-size: 1rem;
    margin-right: $margin-s;
  }
  &__tag {
    background-color: $color-grey-low;
    padding: $padding-xs $padding-s;
    border-radius: $rounding-s;
    font-size: 0.75rem;
    white-space: nowrap;
    // overflow: hidden;
    @media screen and (min-width: 40rem) {
      padding: $padding-xs $padding-m;
    }
    &.open {
      color: $color-white;
      background-color: $color-tertiary;
    }
    &.working {
      color: $color-white;
      background-color: $color-secondary;
    }
    &.closed {
      color: $color-white;
      background-color: $color-primary;
    }
  }
  &__content-meta {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    max-width: 60%;
    -ms-overflow-style: none; // IE 10+
    scrollbar-width: none; // Firefox
    position: relative;
    &--location {
      flex: 1;
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 20%;
        min-width: 2rem;
        background-color: white;
        background: linear-gradient(
          to left,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0)
        );
        opacity: 0.5;
        content: '';
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &__text {
      margin-bottom: 0;
      display: block;
    }
  }
  @keyframes metascroll {
    20% {
      transform: translateX(0);
    }
    80% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  &--open {
    .ticket__title {
      color: $color-tertiary;
    }
  }
  &--working {
    .ticket__title {
      color: $color-secondary;
    }
  }
  &--closed {
    .ticket__title {
      color: $color-primary;
    }
  }
  &--default {
    .ticket__title {
      color: $color-grey-dark;
    }
  }
  &.focus {
    animation: grow 1s infinite alternate ease-in-out;
  }
  @keyframes grow {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
}
</style>
