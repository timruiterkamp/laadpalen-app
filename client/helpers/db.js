const DB = {
  execute(query, auth) {
    return fetch('http://localhost:3001/graphql', {
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
