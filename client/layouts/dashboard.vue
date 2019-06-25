<template>
  <div>
    <Notifications/>
    <DashboardHeader/>
    <main class="dashboard">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import DashboardHeader from '~/components/dashboard/DashboardHeader'
import Notifications from '~/components/dashboard/notifications'

export default {
  //middleware: 'auth-token',
  components: {
    DashboardHeader,
    Notifications
  }
}
</script>

<style lang="scss">
@import '~/assets/css/config/main.scss';
.dashboard {
  overflow-x: hidden;
  background-color: $color-grey-low;
  min-height: 100vh;
  @media screen and (min-width: 60rem) {
    padding-left: 12.5rem;
  }
}
.d-container {
  padding: $padding-xl * 3 $padding-m $padding-l;
  // max-width: 60rem;
  @media screen and (min-width: 40rem) {
    padding: $padding-xl * 3 $padding-l $padding-l;
  }
  @media screen and (min-width: 60rem) {
    padding: $padding-xl * 2.5 $padding-l * 2 $padding-l * 2;
  }
  // margin: 0 auto;
  img {
    max-width: 100%;
    height: auto;
    display: block;
    @include shadow($size: 1rem, $alpha: 0.1);
    border-radius: $rounding-s;
    margin-bottom: 1rem;
  }
}
</style>
