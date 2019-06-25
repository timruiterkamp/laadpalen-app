const DB = {
  execute(query, auth) {
    const env =
      process.env.NODE_ENV == 'development'
        ? process.env.DEV_URL
        : process.env.PROD_URL

    return fetch(env + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(res => res.data)
      .catch(console.error)
  }
}

export default DB
