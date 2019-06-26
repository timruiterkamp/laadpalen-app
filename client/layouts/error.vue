<template>
  <main class="container">
    <img src="~/static/car_error.svg">
    <h1 v-if="error.statusCode === 404">Pagina niet gevonden</h1>
    <h1 v-else>Er is een fout opgetreden</h1>
    <nuxt-link to="/">Terug naar home</nuxt-link>
  </main>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: $margin-xl;
}

img {
  max-width: 20rem;
  margin-bottom: $margin-m;
}
</style>
