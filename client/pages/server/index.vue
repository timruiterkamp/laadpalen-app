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
      image: ''
    }
  },
  methods: {
    async getData() {
      // const token = await this.getAuth()

      fetch('http://localhost:3001/graphql', {
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
        })
        .catch(err => console.log(err))
    },
    async sendData() {
      const data = {
        title: this.title,
        description: this.description,
        location: this.location,
        status: 'open',
        polenumber: this.polenumber,
        createdAt: new Date().toISOString().toString(),
        image: this.image,
        stakeholderId: '5d00f4aed7597a3c181949e0'
      }

      console.log

      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN
        },
        body: JSON.stringify({
          query: `mutation { createIssue(issueInput:{title: ${data.title}, description: ${data.description}, status: ${data.status}, location: ${data.location}, image: ${data.image}, stakeholderId: "5d00f4aed7597a3c181949e0", createdAt: ${data.createdAt}, polenumber: ${data.polenumber}, confirmed: 0}) { title creator { email } stakeholders { title } createdAt} }`
        })
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
</style>
