<template>
  <draggable
    v-model="tickets"
    :group="group"
    class="d-tickets__list-holder"
    handle=".allow-drag"
    :sort="false"
    @change="update"
  >
    <transition-group name="tg-tickets" class="d-tickets__list" tag="ul">
      <li
        v-if="tickets.length > 0"
        class="d-tickets__list-item"
        v-for="ticket in tickets"
        :class="allowed(ticket) ? 'allow-drag' : ''"
        :key="ticket._id"
      >
        <Ticket
          :data-id="ticket._id"
          :title="ticket.title"
          :stakeholder="ticket.stakeholders.title"
          :location="ticket.location"
          :created="ticket.createdAt"
          :status="ticket.status"
        />
      </li>
      <li
        class="d-tickets__list-item d-tickets__list-item--empty"
        v-if="tickets.length === 0"
        key="no-tickets"
      >
        <span>Geen meldingen.</span>
        <span class="small">Sleep hier een melding naar toe om status up to date te brengen</span>
      </li>
    </transition-group>
  </draggable>
</template>

<script>
import Ticket from '~/components/shared/Ticket.vue'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    group: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'default'
    }
  },
  components: {
    Ticket
  },
  computed: {
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    },
    tickets: {
      get() {
        return this.list
      },
      set() {}
    }
  },
  methods: {
    update(e) {
      console.log(e)
      if (e.added) {
        const ticket = { ...e.added.element, status: this.status }
        this.$emit('change', ticket)
      }
    },
    allowed(ticket) {
      // console.log(ticket)
      // return ticket.stakeholder.title
      return (
        ticket.stakeholders.title.toLowerCase() ===
        this.stakeholder.toLowerCase()
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.d-tickets__list {
  padding: 0;
  list-style: none;
  &-item {
    transition: all 0.3s;
    opacity: 0.5;
    &--empty {
      height: $padding-xl + $padding-m * 3;
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-direction: column;
      margin: $margin-xs 0;
      opacity: 1;
      color: darken($color-grey-medium, 20%);
      border: 2px dashed $color-grey-medium;
      border-radius: $rounding-s;
      padding: $padding-s $padding-m;
      span {
        font-weight: bold;
        &.small {
          font-weight: normal;
        }

      }
    }
    &.allow-drag {
      opacity: 1;
      cursor: grab;
    }
  }
}
.tg-tickets-enter,
.tg-tickets-leave-to {
  opacity: 0;
}
.tg-tickets-leave-active {
  position: absolute;
}
</style>
