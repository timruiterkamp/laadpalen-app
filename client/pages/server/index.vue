<template>
  <div>
    <h1>Send something to the client</h1>
    <input v-model="title" placeholder="edit me">

    <p>title is: {{ title }}</p>
    <input v-model="description" placeholder="edit me">

    <p>description is: {{ description }}</p>
    <input v-model="location" placeholder="edit me">

    <p>location is: {{ location }}</p>
    <input v-model="polenumber" placeholder="edit me">

    <p>polenumber is: {{ polenumber }}</p>
    <input v-model="image" placeholder="edit me">

    <p>image is: {{ image }}</p>
    <a href="#" class="btn btn--primary" @click="sendData">Send</a>
    <a href="#" class="btn btn--primary" @click="getData">get</a>
    <div v-if="queryResult && queryResult.length">
      <li v-for="(result, index) in queryResult" :key="result.title + index">title: {{result.title}}</li>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import socketIOClient from 'socket.io-client'

export default {
  data() {
    return {
      token: '',
      queryResult: null,
      mutationResult: null,
      title: '',
      description: '',
      location: '',
      polenumber: '',
      image: '',
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL,
      data: ''
    }
  },
  methods: {
    sendCreatedMessage(title) {
      const socket = socketIOClient(this.endpoint)
      socket.emit('issue created', title) // change 'red' to this.state.color
    },
    async getData() {
      // const token = await this.getAuth()

      fetch(this.endpoint + '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN
        },
        body: JSON.stringify({
          query:
            'query { issues { title stakeholders { title } creator { email } messages { message } }}'
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.data)
          this.queryResult = res.data.issues[0]
          return this.sendCreatedMessage(res)
        })
        .catch(err => console.log(err))
    },
    async sendData() {
      // prettier-ignore
      const data = {
        title: this.title,
        description: this.description,
        location: this.location,
        status: "open",
        polenumber: +this.polenumber,
        createdAt: new Date().toISOString(),
        image: this.image,
        stakeholderId: "5d00f4aed7597a3c181949e0"
      }

      fetch(this.endpoint + '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN
        },
        body: JSON.stringify({
          query: `mutation { createIssue(issueInput:{title: "${
            data.title
          }", description: "${data.description}", status: "${
            data.status
          }", location: "${data.location}", image: "${
            data.image
          }", stakeholderId: "${data.stakeholderId}", createdAt: "${
            data.createdAt
          }", polenumber: ${
            data.polenumber
          }, confirmed: 0}) { title creator { email } stakeholders { title } createdAt} }`
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          return this.sendCreatedMessage(res)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
</style>
