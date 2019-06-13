<template>
  <div>
    <h1>Send something to the client</h1>
    <a href="#" class="btn btn--primary" @click="send">Send</a>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      token: ''
    }
  },
  methods: {
    getAuth() {
      return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `{ login(email: "test@test.com", password:"tester") {token} }`
        })
      })
        .then(res => res.json())
        .then(res => res.data.login.token)
        .catch(err => console.log(err))
    },
    async send() {
      const token = await this.getAuth()
      console.log(token)

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          query:
            'mutation { createIssue(issueInput:{title: "laadpaal kapot", description: "Op de vijverberg is het niet lit", status: "open", location: "De vijverberg 201", image: "String.jpg", stakeholderId: "5cf8eb7c01707a2031a38e1d", created: "2019-06-12T10:52:22.783Z", polenumber: 18293, confirmed: 0}) { title } }'
        })
      })
        .then(res => res.json())
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    //   return fetch('http://localhost:3001/graphql', {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({ query: this.query })
    //   })
    //     .then(response => response.json())
    //     .then((data, res) => {
    //       console.log(data)
    //       if (data.errors) {
    //         console.log('Issue unsuccessfully created')
    //         res.send('Issue unsuccessfull')
    //       } else {
    //         console.log('--- Issue aangemaakt ---')
    //         console.log('req.file = ')
    //         console.log(req.file)

    //         if (req.file) {
    //           // als er een image wordt meegestuurd
    //           fs.rename(
    //             req.file.path,
    //             req.file.destination + data.data.createIssue._id + '.jpeg',
    //             err => {
    //               if (err) {
    //                 console.log(err)
    //               }
    //             }
    //           )
    //         }

    //         // req.session.currentIssue = data.data.createComplaint._id
    //         // res.redirect('/complaint/success')
    //       }
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
</style>
