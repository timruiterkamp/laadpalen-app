<template>
  <div class="c-chat">
    <SmallHeader title="Geef je probleem door!"/>

    <div class="c-chat__content">
      <h4 class="c-chat__title">
        <span class="bold">Melding:</span>
        {{ $route.q.chat }}
      </h4>
      <transition-group name="messages">
        <div class="c-chat__block" v-for="step in currentSteps" :key="step.context + step.count">
          <ChatBubble :time="step.timestamp" :context="step.context">
            <span v-if="step.message" v-html="step.message"></span>
            <img v-if="step.img" :src="step.img.src" class="c-chat__img">
          </ChatBubble>
          <button
            v-if="step.action && step.action.el === 'button' && index === step.count + 1"
            class="btn btn--secondary"
            @click="(e) => $refs[step.action.modal].show(e)"
          >{{step.action.text}}</button>
          <div
            v-if="step.action && step.action.el === 'input' && index === step.count + 1"
            class="c-chat__file-group"
          >
            <label class="c-chat__file-label btn btn--secondary">
              camera openen
              <input
                class="c-chat__file-input"
                type="file"
                accept="image/*"
                capture="environment"
                @change="e => handleFiles(e, step.count + 1)"
              >
            </label>
          </div>
          <nuxt-link
            v-if="step.action && step.action.el === 'link' && index === step.count + 1"
            :to="step.action.href"
            class="btn btn--secondary"
          >
            {{step.action.text}}
          </nuxt-link>
        </div>
      </transition-group>
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

        <button class="btn btn--primary btn--center" @click="handleLocation">bevestig gekozen paal</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import SmallHeader from '~/components/client/SmallHeader.vue'
import ChatBubble from '~/components/client/ChatBubble.vue'
import Modal from '~/components/shared/Modal.vue'
import Atlas from '~/components/shared/Atlas.vue'
import TweenLite from 'gsap'

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
      ],
      steps: [
        {
          count: 0,
          context: 'operator',
          message:
            'Goedemorgen! Wat vervelend dat een niet elektrisch voertuig geparkeerd staat. <span class="bold">Kunt u laten zien waar het is?</span>',
          action: {
            el: 'button',
            text: 'Deel locatie',
            modal: 'modalLocation'
          }
        },
        {
          count: 1,
          context: 'user',
          message: 'Dit is de locatie van de laadpaal.'
        },
        {
          count: 2,
          context: 'operator',
          message: 'Kunt u een <span class="bold">foto</span> van de situatie maken? We hebben <span class="bold">het nummerbord</span> nodig om de melding goed af te handelen.',
          action: {
            el: 'input',
            text: 'Maak foto'
          }
        },
        {
          count: 3,
          context: 'user',
          message: '',
          img: {
            src: ''
          }
        },
        {
          count: 4,
          context: 'operator',
          message: 'Dankuwel. Wij nemen de melding in behandeling. U kunt de <span class="bold">status</span> van de melding terug vinden in uw <span class="bold">meldingen tab</span>.',
          action: {
            el: 'link',
            text: 'Naar meldingen',
            href: '/client/notifications'
          }
        }
      ],
      index: 0
    }
  },
  mounted() {
    setTimeout(() => (this.index = this.index + 1), 0)
  },
  computed: {
    currentSteps() {
      if (!this.steps[this.index - 1] && this.index > 0) {
        return this.steps
      }
      if (this.index === 0) {
        return []
      }
      this.genTimeStamp(this.index - 1)
      return this.steps.slice(0, this.index)
    }
  },
  watch: {
    currentSteps(completed) {
      if (completed.length === this.steps.length) {
        console.log('DONE');
      }
    }
  },
  methods: {
    modalLocation(e) {
      this.$refs.modalLocation.show(e)
    },
    addStep() {
      this.index = this.index + 1
      const ScrollToPlugin = require('gsap/ScrollToPlugin')
      const body = document.querySelector('body')
      const bottom = body.getBoundingClientRect().height
      TweenLite.to(window, 3, { scrollTo: bottom, delay: 0.3 })
    },
    genTimeStamp(index) {
      const stamp = this.time(new Date())
      this.steps[index].timestamp = stamp
    },
    format(time) {
      return time < 10 ? '0' + time : time
    },
    time(date) {
      const hours = this.format(date.getUTCHours())
      const minutes = this.format(date.getUTCMinutes())
      const day = this.format(date.getDate())
      const month = this.format(date.getMonth() + 1)
      const year = this.format(date.getFullYear())
      return `${hours}:${minutes} - ${day}/${month}/${year}`
    },
    handleLocation() {
      this.$refs.modalLocation.hide()
      this.addStep()
      setTimeout(this.addStep, 1000)
    },
    handleFiles(e, index) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          this.steps[index].img.src = reader.result
          this.addStep()
          setTimeout(this.addStep, 1000)
        })
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.c-chat {
  padding-bottom: $padding-xl * 2;
  &__block {
    margin-bottom: $margin-xs;
  }
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
  &__img {
    width: 100%;
    height: auto;
    display: block;
  }
  &__file-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
}

.messages-enter-active,
.messages-leave-active {
  transition: all 1s;
}
.messages-enter, .messages-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
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
      line-height: 1;
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
