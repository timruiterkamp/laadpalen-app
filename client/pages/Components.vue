<template>
  <main>
    <h1>Header one</h1>
    <h2>Header two</h2>
    <h3>Header three</h3>
    <h4>Header four</h4>

    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,</p>
    <p> the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who</p>
    <a href>This is a link</a>

    <div class="divider">
    </div>

    <a href class="btn btn--primary">This is a button</a>
    <a href class="btn btn--secondary">This is a button</a>
    <a href class="btn btn--tertiary">This is a button</a>

    <div class="divider">
    </div>

    <Ticket title="Some card title" location="Herengracht 23" date="06/06/2019" time="14:02" tag="default" />
    <Ticket title="Some card title" location="Herengracht 23" date="06/06/2019" time="14:02" tag="open" status="open"/>
    <Ticket title="Some card title" location="Herengracht 23" date="06/06/2019" time="14:02" tag="working" status="working"/>
    <Ticket title="Some card title" location="Herengracht 23" date="06/06/2019" time="14:02" tag="closed" status="closed"/>

    <div class="divider">
    </div>

    <Toggle :checked.sync="filter1">Toggled: {{filter1}}</Toggle>
    <Toggle :checked.sync="filter2">Toggled: {{filter2}}</Toggle>
  </main>
</template>

<script>
import Ticket from '~/components/shared/Ticket.vue'
import Toggle from '~/components/dashboard/Toggle.vue'
export default {
  components: {
    Ticket,
    Toggle
  },
  data() {
    return {
      filter1: true,
      filter2: false
    }
  }
}

</script>

<style langs="scss">
  main {
    padding: 2rem 1rem;
  }
  .divider {
    margin: 3rem 0;
    height: 1px;
    background-color: #f2f2f2;
    display: block;
    content: "";
  }
</style>
