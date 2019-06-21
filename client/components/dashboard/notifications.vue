<template>
  <div v-if="notificationTrigger" class="notification-message" :class="'notification-message--' + status">{{this.message}} <span class="bold">{{this.issue}}</span></div>
</template>
<script>
import socketIOClient from 'socket.io-client'
import { setTimeout } from 'timers'

export default {
  layout: 'default',
  data() {
    return {
      endpoint: 'localhost:3001',
      message: '',
      issue: '',
      status: '',
      notificationTrigger: false,
      timeout: 5000
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)
    socket.on('issue has been created', data => {
      this.notificationTrigger = true
      this.message = 'Nieuwe melding gemaakt:'
      this.issue = issue.title
      this.status = issue.status

      this.$store.commit('INCREMENT_MESSAGES_NOTIFICATIONS')

      setTimeout(() => {
        this.notificationTrigger = false
      }, this.timeout)
    })

    socket.on('issue status has been updated', issue => {
      this.notificationTrigger = true
      this.message = 'Melding bijgewerkt:'
      this.issue = issue.title
      this.status = issue.status

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
  top: 2rem;
  right: 2rem;
  width: 20rem;
  height: auto;
  border-left: .5rem solid $color-grey-dark;
  border-radius: $rounding-s;
  background-color: white;
  z-index: 100;
  animation: fadeIn 0.7s ease-in-out forwards;
  opacity: 0;
  padding: 1rem;
  font-size: .875rem;
  @include shadow(2rem, $color-grey-dark, .15);
  &--open {
    border-left: .5rem solid $color-tertiary;

  }
  &--working {
    border-left: .5rem solid $color-secondary;

  }
  &--closed {
    border-left: .5rem solid $color-primary;

  }
  .bold {
    font-size: 1rem;
    display: block;
  }
  /* box-shadow: 0 2px 8px 50px rgba(0, 0, 0, 0.15); */

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX('-3rem');
    }
    100% {
      opacity: 1;
      transform: translateX('0');
    }
  }
}
</style>
