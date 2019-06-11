<template>
  <main>
    <h1>Header one</h1>
    <h2>Header two</h2>
    <h3>Header three</h3>
    <h4>Header four</h4>

    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,</p>
    <p>the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who</p>
    <a href>This is a link</a>

    <div class="divider"></div>

    <a href class="btn btn--primary">This is a button</a>
    <a href class="btn btn--secondary">This is a button</a>
    <a href class="btn btn--tertiary">This is a button</a>

    <div class="divider"></div>

    <Ticket
      title="Some card title"
      location="Herengracht 23"
      date="06/06/2019"
      time="14:02"
      tag="default"
    />
    <Ticket
      title="Some card title"
      location="Herengracht 23"
      date="06/06/2019"
      time="14:02"
      tag="open"
      status="open"
    />
    <Ticket
      title="Some card title"
      location="Herengracht 23"
      date="06/06/2019"
      time="14:02"
      tag="working"
      status="working"
    />
    <Ticket
      title="Some card title"
      location="Herengracht 23"
      date="06/06/2019"
      time="14:02"
      tag="closed"
      status="closed"
    />

    <div class="divider"></div>

    <Toggle :checked.sync="filter1">Toggled: {{filter1}}</Toggle>
    <Toggle :checked.sync="filter2">Toggled: {{filter2}}</Toggle>

    <div class="divider"></div>

    <div class="button-holder">
      <button class="btn btn--primary" @click="showTooltipOne">Toggle top popup</button>
      <button class="btn btn--primary" @click="showTooltipTwo">Toggle left popup</button>
      <button class="btn btn--primary" @click="showTooltipThree">Toggle bottom popup</button>
      <button class="btn btn--primary" @click="showTooltipFour">Toggle right popup</button>
    </div>

    <Tooltip ref="tooltip1" placement="top">
      <p>Since this is a top aligned tooltip (most common) i decided to put a lot of content in it so we can see how it works on small screen sizes.</p>
    </Tooltip>
    <Tooltip ref="tooltip2" placement="right">
      <h3>This is title</h3>
      <p>This is tooltip content</p>
    </Tooltip>
    <Tooltip ref="tooltip3" placement="bottom">
      <h3>This is a very long tooltip title</h3>
      <p>With a lenghty size of tooltip content for all your tooltip content needs</p>
    </Tooltip>
    <Tooltip ref="tooltip4" placement="left">This is tooltip content</Tooltip>
  </main>
</template>

<script>
import Ticket from '~/components/shared/Ticket.vue'
import Toggle from '~/components/dashboard/Toggle.vue'
import Tooltip from '~/components/shared/Tooltip.vue'

export default {
  components: {
    Ticket,
    Toggle,
    Tooltip
  },
  data() {
    return {
      filter1: true,
      filter2: false
    }
  },
  methods: {
    showTooltipOne(e) {
      this.$refs.tooltip1.show(e)
    },
    showTooltipTwo(e) {
      this.$refs.tooltip2.show(e)
    },
    showTooltipThree(e) {
      this.$refs.tooltip3.show(e)
    },
    showTooltipFour(e) {
      this.$refs.tooltip4.show(e)
    }
  }
}
</script>

<style langs="scss">
main {
  padding: 2rem 1rem;
}
.button-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
}
</style>
