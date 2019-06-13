<template>
  <div>
    <h1>Send something to the client</h1>
    <a href="#" class="btn btn--primary" @click="send">Send</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serverObj: {
        title: 'laadpaal kapot',
        description: 'Op de vijverberg is het niet lit',
        status: 'open',
        location: 'De vijverberg 201',
        image: 'String.jpg',
        stakeholderId: '5cf8eb7c01707a2031a38e1d',
        created: '2019-06-12T10:52:22.783Z',
        polenumber: 18293,
        confirmed: 0
      }
    }
  },
  methods: {
    send() {
      console.log(this.serverObj)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/config/main.scss';
</style>
