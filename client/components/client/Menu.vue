<template>
  <ul class="menu">
    <div class="menu__holder">
      <nuxt-link class="menu__item" :to="{ path: '/client'}">
        <svg class="menu__item-icon">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <span class="menu__item-text">Maak melding</span>
      </nuxt-link>

      <nuxt-link class="menu__item" :to="{ path: '/client/kaart'}">
        <svg class="menu__item-icon">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
        <span class="menu__item-text">Kaart</span>
      </nuxt-link>

      <nuxt-link class="menu__item" :to="{ path: '/client/meldingen'}">
        <svg class="menu__item-icon">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path
            d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
          ></path>
        </svg>
        <span class="menu__item-text">
          Meldingen
          <transition name="pop-up">
            <div v-if="notifications > 0" class="menu__item-notification">{{notifications}}</div>
          </transition>
        </span>
      </nuxt-link>
    </div>
  </ul>
</template>

<script>
import socketIOClient from 'socket.io-client'

export default {
  data() {
    return {
      endpoint: 'localhost:3001'
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)

    socket.on('issue has been created', data => {
      this.$store.commit('INCREMENT_MESSAGES_NOTIFICATIONS')
    })

    socket.on('issue status has been updated', data => {
      this.$store.commit('INCREMENT_MESSAGES_NOTIFICATIONS')
      this.$store.commit('UPDATE_LOADINGSTATION', data)
    })
  },
  computed: {
    notifications() {
      return this.$store.getters.GET_MESSAGES_NOTIFICATIONS
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
$widthHeight: 24px;

.pop-up-enter-active,
.pop-up-leave-active {
  transition: all 0.5s;
}
.pop-up-enter, .pop-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10rem);
}

.menu {
  height: 5rem;
  width: 100%;
  position: fixed;
  display: flex;
  list-style-type: none;
  color: $color-white;
  justify-content: space-around;
  left: 0;
  bottom: 0;
  padding: 0;
  @include linear-gradient($color-primary);
  transition: all 0.3s;

  &__holder {
    width: 40rem;
    max-width: 40rem;
    display: flex;
  }

  &__item {
    flex-basis: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    color: $color-white;
    text-decoration: none;
    font-family: $font-body;
    &:hover {
      background-color: rgba($color-white, 0.1);
    }
    &-icon {
      transition: stroke-width 0.2s;
      width: $widthHeight;
      height: $widthHeight;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      stroke: $color-white;
      margin-bottom: $margin-xs;
    }
    &-text {
      white-space: nowrap;
      font-size: 0.8rem;
      font-weight: bold;
      position: relative;
    }
    &-notification {
      $widthHeight: 1.3rem;
      border-radius: $widthHeight;
      height: $widthHeight;
      width: $widthHeight;
      top: 0;
      right: 0.5rem;
      background-color: $color-secondary;
      position: absolute;
      transform: translateY(-2.3rem);
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 2;
      @include shadow(1rem);
    }
  }
}
.nuxt-link-exact-active {
  background-color: rgba($color-white, 0.2);
  .menu {
    &__item {
      &-icon {
        stroke-width: 3;
      }
      &-text {
        //font-weight: bold;
      }
    }
  }
}
</style>
