<template>
  <main>
    <Accordion :title="'Laadpaal'" :options="laadpaalOptions"/>
    <Accordion :title="'Laadpaal'" :options="laadpaalOptions"/>
    <Accordion :title="'Laadpaal'" :options="laadpaalOptions"/>
    <Accordion :title="'Laadpaal'" :options="laadpaalOptions"/>

    <div class="divider"></div>
    <!-- <BigHeader :name="'Folkert'"/> -->
    <ChatBubble :time="'12:39 vandaag'" :context="'operator'">
      Goedemorgen! Wat vervelend dat een niet elektrisch voertuig geparkeerd staat.
      <span
        class="bold"
      >Kunt u laten zien waar het is?</span>
    </ChatBubble>

    <ChatBubble :time="'14:30 vandaag'" :context="'user'">
      Het adres van de laadpaal is:
      <span class="bold">
        Nieuwe Herenstraat 32
        1033 SE Amsterdam
      </span>
    </ChatBubble>

    <div class="divider"></div>
  </main>
</template>

<script>
import BigHeader from '~/components/client/BigHeader.vue'
import ChatBubble from '~/components/client/ChatBubble.vue'
import Accordion from '~/components/client/Accordion.vue'

export default {
  components: {
    BigHeader,
    ChatBubble,
    Accordion
  },
  data() {
    return {
      laadpaalOptions: [
        {
          title: 'Werkt niet',
          slug: 'laadpaal-werkt-niet'
        },
        {
          title: 'Is defect',
          slug: 'laadpaal-is-defect'
        },
        {
          title: 'Is te lang bezet',
          slug: 'laadpaal-te-lang-bezet'
        },
        {
          title: 'Niet te bereiken',
          slug: 'laadpaal-niet-tebereiken'
        },
        {
          title: 'Anders',
          slug: 'laadpaal/anders'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~assets/css/config/main.scss';

main {
  padding: $padding-m;
  background-color: $color-grey-low;
}
</style>

