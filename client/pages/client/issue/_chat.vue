<template>
  <div class="c-chat">
    <SmallHeader title="Geef je probleem door!"/>

    <div class="c-chat__content">
      <h4 class="c-chat__title">
        <span class="bold">Melding:</span>
        {{ ticket.title }}
      </h4>
      <transition-group name="messages">
        <div
          class="c-chat__block"
          v-for="(step, stepIndex) in currentSteps"
          :key="step.context + stepIndex"
        >
          <ChatBubble :time="step.timestamp" :context="step.context">
            <span v-if="step.message" v-html="step.message"></span>
            <span v-if="step.location" class="bold">{{loadingstation.address}}</span>
            <img v-if="step.img" :src="step.img.src" class="c-chat__img">
          </ChatBubble>
          <button
            v-if="step.action && step.action.el === 'button' && index === stepIndex + 1"
            class="btn btn--secondary"
            @click="(e) => $refs[step.action.modal].show(e)"
          >{{step.action.text}}</button>
          <div
            v-if="step.action && step.action.el === 'input' && index === stepIndex + 1"
            class="c-chat__file-group"
          >
            <label class="c-chat__file-label btn btn--secondary">
              camera openen
              <input
                class="c-chat__file-input"
                type="file"
                accept="image/*"
                capture="environment"
                @change="e => handleFiles(e, stepIndex + 1)"
              >
            </label>
          </div>
          <nuxt-link
            v-if="step.action && step.action.el === 'link' && index === stepIndex + 1"
            :to="step.action.href"
            class="btn btn--secondary"
          >{{step.action.text}}</nuxt-link>
        </div>
      </transition-group>
    </div>

    <Modal ref="modalLocation">
      <template v-slot:header>
        <Atlas height="45vh" :stations="stations" v-model="loadingstation"/>

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

        <button
          class="btn btn--secondary btn--center"
          :class="loadingstation.address ? '' : 'btn--disabled'"
          @click="loadingstation.address ? handleLocation() : () => {}"
        >{{loadingstation.address ? loadingstation.address : 'selecteer laadpaal'}}</button>
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
import DB from '~/helpers/db'
import socketIOClient from 'socket.io-client'

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
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL,
      legendaItems: [
        'Wordt aan gewerkt',
        'Beschikbaar',
        'Niet beschikbaar',
        'Problemen verholpen'
      ],
      ticket: {
        title: this.$route.params.chat.split('-').join(' ')
      },
      stations: this.$store.getters.GET_LOADINGSTATION_DATA,
      loadingstation: {},
      flows: [
        {
          stakeholder: '5d00f4b7d7597a3c181949e1',
          steps: [
            {
              context: 'operator',
              message:
                'Goedemorgen! Wat vervelend dat een niet elektrisch voertuig op de laadplek geparkeerd staat. <span class="bold">Kunt u laten zien waar het is?</span>',
              action: {
                el: 'button',
                text: 'Selecteer laadpaal',
                modal: 'modalLocation'
              }
            },
            {
              context: 'user',
              message: 'De locatie van de laadpaal is ',
              location: true
            },
            {
              context: 'operator',
              message:
                'Kunt u een <span class="bold">foto</span> van de situatie maken? We hebben <span class="bold">het nummerbord</span> nodig om de melding goed af te handelen.',
              action: {
                el: 'input',
                text: 'Maak foto'
              }
            },
            {
              context: 'user',
              message: '',
              img: {
                src: ''
              }
            },
            {
              context: 'operator',
              message:
                'Dankuwel. Wij nemen de melding in behandeling. U kunt de <span class="bold">status</span> van de melding terug vinden in uw <span class="bold">meldingen tab</span>.',
              action: {
                el: 'link',
                text: 'Naar meldingen',
                href: '/client/meldingen'
              }
            }
          ]
        },
        {
          stakeholder: '5d00f4aed7597a3c181949e0',
          steps: [
            {
              context: 'operator',
              message:
                'Goedemorgen! Wat vervelend dat de laadpaal niet werkt. <span class="bold">Kunt u laten zien om welke laadpaal het gaat?</span>',
              action: {
                el: 'button',
                text: 'Selecteer laadpaal',
                modal: 'modalLocation'
              }
            },
            {
              context: 'user',
              message: 'De locatie van de laadpaal is ',
              location: true
            },
            {
              context: 'operator',
              message:
                'Dankuwel. Wij nemen de melding in behandeling. U kunt de <span class="bold">status</span> van de melding terug vinden in uw <span class="bold">meldingen tab</span>.',
              action: {
                el: 'link',
                text: 'Naar meldingen',
                href: '/client/meldingen'
              }
            }
          ]
        }
      ],
      index: 0
    }
  },
  mounted() {
    // this.flow = this.flows[Number(this.$route.query.flow)]
    setTimeout(() => (this.index = this.index + 1), 0)
    if (this.stations.length === 0) {
      this.$store.dispatch('FETCH_LOADINGSTATION_DATA').then(() => {
        this.stations = this.$store.getters.GET_LOADINGSTATION_DATA
      })
    }
  },
  computed: {
    flow() {
      return this.flows[Number(this.$route.query.flow)]
    },
    currentSteps() {
      console.log(this.flow)
      const steps = this.flow.steps
      if (!steps[this.index - 1] && this.index > 0) {
        return steps
      }
      if (this.index === 0) {
        return []
      }
      this.genTimeStamp(this.index - 1)
      return steps.slice(0, this.index)
    },
    stakeholder() {
      return this.flow.stakeholder
    }
  },
  watch: {
    currentSteps(completed) {
      if (!this.flow) return
      if (completed.length === this.flow.steps.length) {
        this.createTicket()
      }
    }
  },
  methods: {
    addStep() {
      this.index = this.index + 1
      const ScrollToPlugin = require('gsap/ScrollToPlugin')
      const body = document.querySelector('body')
      const bottom = body.getBoundingClientRect().height
      TweenLite.to(window, 3, { scrollTo: bottom, delay: 0.3 })
    },
    genTimeStamp(index) {
      const stamp = this.time(new Date())
      this.flow.steps[index].timestamp = stamp
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
          this.flow.steps[index].img.src = reader.result
          this.addStep()
          setTimeout(this.addStep, 1000)
        })
        reader.readAsDataURL(file)
      }
    },
    createTicket() {
      const ticket = {
        title: this.ticket.title,
        createdAt: new Date().toISOString(),
        loadingstationId: this.loadingstation.id,
        address: this.loadingstation.address,
        stakeholderId: this.stakeholder
      }
      const socket = socketIOClient(this.endpoint)

      console.log('creating ticket... ', ticket)
      DB.execute(
        `mutation { createIssue(issueInput:{
          title: "${ticket.title}",
          description: "some desc",
          status: "open",
          stakeholderId: "${ticket.stakeholderId}",
          loadingstationId: "${ticket.loadingstationId}"
          createdAt: "${ticket.createdAt}",
          polenumber: 123,
          confirmed: 0,
          location: "${ticket.address}"
        }) { title location status stakeholders { title } loadingstation { longitude latitude address status }} }`,
        this.$store.getters.GET_TOKEN
      ).then(res => socket.emit('issue created', res.createIssue))
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
    max-width: 40rem;
    margin: 0 auto;
    padding: $padding-m;
  }
  &__content {
    padding: $padding-m;
    .btn {
      margin: 0 auto;
    }
  }
  &__title {
    margin-bottom: $margin-s;
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
    padding: 1rem;
    background-color: $color-primary;
    &--text {
      margin: 0;
      color: $color-white;
    }
  }

  .btn {
    margin-top: 0;
    margin-bottom: 0;
  }

  .divider-s {
    margin-bottom: 1rem;
  }
  &__legenda {
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: $padding-s;
    &--item {
      width: 50%;
      display: flex;
      align-items: center;
      height: 1.8rem;
      line-height: 1;
      font-size: 0.8rem;
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
