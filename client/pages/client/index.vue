<template>
  <div class="c-home">
    <BigHeader name="Folkert"/>

    <div class="c-home__content">
      <h4 class="c-home__title">Mijn probleem heeft te maken met:</h4>

      <Accordion :title="'De laadpaal'" :options="laadpaalOptions"/>
      <Accordion :title="'Mijn betaalpas'" :options="paymentOptions"/>
      <Accordion :title="'De laadplaats'" :options="parkingOptions"/>
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
          slug: 'laadpaal-defect',
          flow: 1
        },
        {
          title: 'Is bezet door een niet-elektrisch voertuig',
          slug: 'laadpaal-bezet-door-niet-EV',
          flow: 0
        },
        {
          title: 'Wordt al geruime tijd bezet',
          slug: 'laadpaal-te-lang-bezet',
          flow: 0
        },
        {
          title: 'Is onbereikbaar',
          slug: 'laadpaal-onbereikbaar',
          flow: 0
        },
        {
          title: 'Heeft een ander probleem',
          slug: 'laadpaal-overig',
          flow: 1
        }
      ],
      paymentOptions: [
        {
          title: 'Werkt niet',
          slug: 'pas-werkt-niet',
          flow: 1
        },
        {
          title: 'Is kapot',
          slug: 'pas-werkt-niet',
          flow: 1
        },
        {
          title: 'Heb ik niet bij me',
          slug: 'pas-werkt-niet',
          flow: 1
        },
        {
          title: 'Ik heb een ander probleem',
          slug: 'pas-werkt-niet',
          flow: 1
        }
      ],
      parkingOptions: [
        {
          title: 'Is bezet door een niet-elektrisch voertuig',
          slug: 'laadpaal-bezet-door-niet-EV',
          flow: 0
        },
        {
          title: 'Wordt al geruime tijd bezet',
          slug: 'laadpaal-te-lang-bezet',
          flow: 0
        },
        {
          title: 'Is onbereikbaar',
          slug: 'laadpaal-onbereikbaar',
          flow: 0
        }
      ],
      other: [
        {
          title: 'Start chat',
          slug: 'laadpaal-overig',
          flow: 1
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
    max-width: 40rem;
    margin: 0 auto;
    padding: $padding-m;
  }
  &__title {
    margin-top: 0;
    font-weight: 100;
    text-align: center;
    @media screen and (max-width: 25rem) {
      font-size: 5vw;
    }
  }
}
</style>
