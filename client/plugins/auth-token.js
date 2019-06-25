export default function({ app, store }) {
  app.router.onReady(() => {
    if (!store.getters.GET_TOKEN) {
      fetch('http://localhost:3001/graphql', {
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
