<template>
  <main>
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
  </main>
</template>

<script>
import BigHeader from '~/components/client/BigHeader.vue'
import ChatBubble from '~/components/client/ChatBubble.vue'

export default {
  components: {
    BigHeader,
    ChatBubble
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

