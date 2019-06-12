<template>
  <div class="c-chat">
    <SmallHeader/>

    <div class="c-chat__content">
      <h4 class="c-chat__title">
        <span class="bold">Melding:</span>
        {{ $route.params.chat }}
      </h4>

      <ChatBubble :time="'12:39 vandaag'" :context="'operator'">
        Goedemorgen! Wat vervelend dat een niet elektrisch voertuig geparkeerd staat.
        <span
          class="bold"
        >Kunt u laten zien waar het is?</span>
      </ChatBubble>

      <a class="btn btn--primary" @click="modalLocation">Deel locatie</a>
    </div>

    <Modal ref="modalLocation">
      <h1>hello</h1>
    </Modal>
  </div>
</template>

<script>
import SmallHeader from '~/components/client/SmallHeader.vue'
import ChatBubble from '~/components/client/ChatBubble.vue'
import Modal from '~/components/shared/Modal.vue'

export default {
  layout: 'client',
  components: {
    SmallHeader,
    ChatBubble,
    Modal
  },
  methods: {
    modalLocation(e) {
      e.preventDefault()

      console.log('test')
    },
    modalLocation(e) {
      this.$refs.modalLocation.show(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.c-chat {
  &__content {
    padding: $padding-m;

    .btn {
      margin: 0 auto;
    }
  }
  &__title {
    margin-bottom: $margin-xl;
    font-size: 1rem;
    font-weight: 100;
    text-align: center;
  }
}
</style>

