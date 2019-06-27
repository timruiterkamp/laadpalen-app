<template>
  <section
    v-if="notificationTrigger"
    class="notification-message"
    :class="'notification-message--' + status"
  >
    {{this.message}}
    <span class="bold">{{this.issue.title}}</span>
    <span class="small">{{this.issue.location}}</span>
  </section>
</template>
<script>
import socketIOClient from 'socket.io-client'
import { setTimeout } from 'timers'

export default {
  layout: 'default',
  data() {
    return {
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL,
      message: '',
      issue: {
        title: '',
        location: ''
      },
      status: '',
      notificationTrigger: false,
      timeout: 5000
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)
    socket.on('issue has been created', issue => {
      console.log(issue);
      this.notificationTrigger = true
      this.message = 'Nieuwe melding gemaakt: '
      this.issue.title = issue.title
      this.status = issue.status
      this.issue.location = issue.location

      this.$store.commit('INCREMENT_MESSAGES_NOTIFICATIONS')

      setTimeout(() => {
        this.notificationTrigger = false
      }, this.timeout)
    })

    socket.on('issue status has been updated', issue => {
      this.notificationTrigger = true
      this.message = 'Melding bijgewerkt:'
      this.issue.title = issue.title
      this.issue.location = issue.location
      this.status = issue.status
      console.log(issue)

      this.$store.commit('INCREMENT_MESSAGES_NOTIFICATIONS')

      setTimeout(() => {
        this.notificationTrigger = false
      }, this.timeout)
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/config/main.scss';

.notification-message {
  position: fixed;
  top: 4rem;
  left: calc(50% - 10rem);
  transform: translateX(3rem);
  @media screen and (min-width: 60rem) {
    top: 2rem;
    left: auto;
    right: 2rem;
  }
  animation: fadeIn 1s forwards;
  right: 2rem;
  width: 20rem;
  height: auto;
  border-left: 0.5rem solid $color-grey-dark;
  border-radius: $rounding-s;
  background-color: white;
  z-index: 100;
  opacity: 0;
  padding: 1rem;
  font-size: 0.875rem;
  @include shadow(2rem, $color-grey-dark, 0.15);
  &--open {
    border-left: 0.5rem solid $color-tertiary;
  }
  &--working {
    border-left: 0.5rem solid $color-secondary;
  }
  &--closed {
    border-left: 0.5rem solid $color-primary;
  }
  .bold {
    font-size: 1rem;
    display: block;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  /* box-shadow: 0 2px 8px 50px rgba(0, 0, 0, 0.15); */
}
</style>
