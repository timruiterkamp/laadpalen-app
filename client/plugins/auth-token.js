export default function({ app, store }) {
  app.router.onReady(() => {
    const env =
      process.env.NODE_ENV == 'development'
        ? process.env.DEV_URL
        : process.env.PROD_URL

    if (!store.getters.GET_TOKEN) {
      fetch(env + '/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{ login(email: "test@test.com", password:"tester") {token} }`
        })
      })
        .then(res => res.json())
        .then(res => {
          store.commit('SET_TOKEN', res.data.login.token)
        })
    }
  })
}
