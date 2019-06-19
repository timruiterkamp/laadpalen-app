<template>
  <div v-if="notificationTrigger" class="notification-message">{{this.message}}</div>
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
      notificationTrigger: false
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)
    socket.on('issue has been created', data => {
      this.notificationTrigger = true
      this.message = 'Nieuwe issue binnengekomen'

      setTimeout(() => {
        this.notificationTrigger = false
      }, 3000)
    })

    socket.on('issue status has been updated', data => {
      this.notificationTrigger = true
      console.log(data)
      this.message = 'Issue is geupdated'

      setTimeout(() => {
        this.notificationTrigger = false
      }, 3000)
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/css/config/main.scss';

.notification-message {
  position: absolute;
  top: 25px;
  right: 25px;
  width: 250px;
  height: 75px;
  border-left: 2px solid green;
  background-color: white;
  z-index: 100;
  font-size: 1rem;
  animation: fadeIn 0.7s ease-in-out forwards;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  /* box-shadow: 0 2px 8px 50px rgba(0, 0, 0, 0.15); */

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX('-200px');
    }
    100% {
      opacity: 1;
      transform: translateX('0');
    }
  }
}
</style>
