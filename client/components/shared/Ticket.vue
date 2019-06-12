<template>
  <div class="ticket" :class="'ticket--' + status">
    <div class="ticket__top">
      <h3 class="ticket__title">{{title}}</h3>
      <div v-if="stakeholder" class="ticket__tag">{{stakeholder}}</div>
    </div>
    <div class="ticket__bottom">
      <p class="ticket__content-meta">{{location}}</p>
      <p class="ticket__content-meta" v-if="time && date"><span class="bold">{{time}}</span> - {{date}}</p>
    </div>
  </div>
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
      }
    },
    computed: {
      date() {
        if (!this.created) return ''
        const date = new Date(this.created)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
      },
      time() {
        if (!this.created) return ''
        const date = new Date(this.created)
        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/css/config/main.scss';

  .ticket {
    margin: $margin-s 0;
    padding: $padding-m;
    background-color: $color-white;
    border-radius: $rounding-s;
    @include shadow(1rem);
    display: block;
    max-width: 40rem;
    @media screen and (min-width: 40rem) {
      padding: $padding-l;
    }
    &__top {
      margin-bottom: $margin-xs;
    }
    &__top, &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__title {
      margin-bottom: 0;
      font-size: 1rem;
      @media screen and (min-width: 40rem) {
        font-size: 1.25rem;
      }
    }
    &__tag {
      background-color: $color-grey-low;
      padding: $padding-xs $padding-m;
      border-radius: $rounding-s;
      font-size: .875rem;
    }
    &__content-meta {
      margin-bottom: 0;
      font-size: .875rem;
    }
    &--open {
      .ticket__title {
        color: $color-primary;
      }
    }
    &--working {
      .ticket__title {
        color: $color-secondary;
      }
    }
    &--closed {
      .ticket__title {
        color: $color-tertiary;
      }
    }
    &--default {
      .ticket__title {
        color: $color-grey-dark;
      }
    }
  }

</style>
