<template>
  <draggable
    v-model="tickets"
    :group="group"
    class="d-tickets__list-holder"
    handle=".allow-drag"
    :sort="false"
    @change="update"
    v-if="tickets.length > 0"
  >
    <transition-group name="tg-tickets" class="d-tickets__list" tag="ul">
      <li
        class="d-tickets__list-item"
        v-for="ticket in tickets"
        :class="allowed(ticket) ? 'allow-drag' : ''"
        :key="ticket.title"
      >
        <Ticket
          :title="ticket.title"
          :stakeholder="ticket.stakeholder"
          :location="ticket.location"
          :created="ticket.created"
          :status="ticket.status"
        />
      </li>
      <!-- <li
        class="d-tickets__list-item d-tickets__list-item--empty"
        v-if="tickets.length === 0"
        key="no-tickets"
      >Er zijn geen meldingen in deze categorie</li>-->
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
      padding: $padding-m;
      opacity: 1;
      color: $color-grey-dark;
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
