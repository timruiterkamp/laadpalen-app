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
      <template v-slot:header>
        <Atlas height="20rem"/>

        <div class="modal__header">
          <p class="modal__header--text">
            Klik op de laadpaal waarover
            de melding gemaakt moet worden
          </p>
        </div>
      </template>

      <template v-slot:content>
        <ul class="modal__legenda">
          <li
            v-for="(item, i) in legendaItems"
            :key="`modal-item-${i}`"
            class="modal__legenda--item"
          >
            <span class="modal__legenda--color"></span>
            {{item}}
          </li>
        </ul>

        <div class="divider-s"></div>
      </template>
    </Modal>
  </div>
</template>

<script>
import SmallHeader from '~/components/client/SmallHeader.vue'
import ChatBubble from '~/components/client/ChatBubble.vue'
import Modal from '~/components/shared/Modal.vue'
import Atlas from '~/components/shared/Atlas.vue'

export default {
  layout: 'client',
  components: {
    SmallHeader,
    ChatBubble,
    Modal,
    Atlas
  },
  data() {
    return {
      legendaItems: [
        'Huidige locatie',
        'Laadpalen',
        'Niet beschikbaar',
        'Aangeraden plan'
      ]
    }
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

.modal {
  &__header {
    width: 100%;
    padding: $padding-xl $padding-m;
    background-color: $color-primary;
    &--text {
      margin: 0;
      color: $color-white;
    }
  }
  &__legenda {
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: $padding-m;
    &--item {
      width: 50%;
      display: flex;
      align-items: center;
      height: 1.8rem;
      &:nth-of-type(1) {
        .modal__legenda--color {
          background-color: blue;
        }
      }

      $colors: (
        $color-secondary,
        $color-grey-dark,
        $color-tertiary,
        $color-primary
      );

      @for $i from 1 through length($colors) {
        &:nth-of-type(#{$i}) {
          .modal__legenda--color {
            background-color: nth($colors, $i);
          }
        }
      }
    }
    &--color {
      $widthHeight: 15px;
      margin-right: 0.7rem;
      border-radius: $widthHeight;
      width: $widthHeight;
      height: $widthHeight;
    }
  }
}
</style>

