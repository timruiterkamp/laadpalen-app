<template>
  <div class="c-home">
    <BigHeader name="Folkert"/>

    <div class="c-home__content">
      <h4 class="c-home__title">Mijn probleem heeft te maken met:</h4>

      <Accordion :title="'Laadpaal'" :options="laadpaalOptions"/>
      <Accordion :title="'Mijn betaalpas'" :options="paymentOptions"/>
      <Accordion :title="'Parkeerplekken'" :options="parkingOptions"/>
      <Accordion :title="'Overig'" :options="other"/>
    </div>
  </div>
</template>

<script>
import BigHeader from '~/components/client/BigHeader.vue'
import Accordion from '~/components/client/Accordion.vue'

export default {
  layout: 'client',
  components: {
    BigHeader,
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
      ],
      paymentOptions: [
        {
          title: 'Werkt niet',
          slug: 'laadpaal-werkt-niet'
        }
      ],
      parkingOptions: [
        {
          title: 'Er staat iemand in de weg',
          slug: 'laadpaal-werkt-niet'
        },
        {
          title: 'Auto staat te lang geparkeerd',
          slug: 'laadpaal-werkt-niet'
        }
      ],
      other: [
        {
          title: 'Ruimteschip ofzo heel raar dit',
          slug: 'laadpaal-werkt-niet'
        },
        {
          title: 'Start chat',
          slug: 'laadpaal-werkt-niet'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.c-home {
  &__content {
    padding: $padding-m;
  }
  &__title {
    font-weight: 100;
    text-align: center;
  }
}
</style>
