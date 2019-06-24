<template>
  <section class="container">
    <h1>Navigation</h1>
    <nuxt-link to="/client">Go to client</nuxt-link>
    <nuxt-link to="/dashboard">Go to dashboard</nuxt-link>
    <nuxt-link to="/components">Go to components</nuxt-link>
    <nuxt-link to="/server">Go to server</nuxt-link>
  </section>
</template>

<script>
export default {
  mounted() {
    console.log(
      process.env.NODE_ENV == 'development'
        ? process.env.DEV_URL
        : process.env.PROD_URL
    )
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('hello')
    // }
    // console.log(process.env.NODE_ENV)
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  a {
    margin-bottom: 10px;
  }
}
</style>
