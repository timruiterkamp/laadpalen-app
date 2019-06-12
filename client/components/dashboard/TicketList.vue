<template>
  <draggable v-model="tickets" :group="group" class="d-tickets__list-holder" handle=".allow-drag">
    <transition-group name="tg-tickets" class="d-tickets__list" tag="ul">
      <li class="d-tickets__list-item" v-if="tickets.length > 0" v-for="ticket in tickets" :class="allowed(ticket) ? 'allow-drag' : ''"  :key="ticket.title">
        <Ticket :title="ticket.title" :stakeholder="ticket.stakeholder" :location="ticket.location" :created="ticket.created" :status="ticket.status" />
      </li>
      <li v-else>No tickets in this list</li>
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
    tickets: {
      get() {
        return this.list
      },
      set(newList) {
        const list = newList
          .map(ticket => ({...ticket, status: this.status }))
        this.$emit('change', list)
      }
    },
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    },
  },
  methods: {
    allowed(ticket) {
      return ticket.stakeholder.toLowerCase() === this.stakeholder.toLowerCase()
    }
  }
}

</script>

<style lang="scss" scoped>
  .d-tickets__list {
    padding: 0;
    list-style: none;
    &-item {
      transition: all .3s;
      opacity: .5;
      &.allow-drag {
        opacity: 1;
        cursor: grab;
      }
    }
  }
  .tg-tickets-enter, .tg-tickets-leave-to {
    opacity: 0;
  }
  .tg-tickets-leave-active {
    position: absolute;
  }

</style>
