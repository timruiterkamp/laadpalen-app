export const getters = {
  GET_STAKEHOLDER(state) {
    return state.stakeholder
  },
  GET_TOKEN(state) {
    return state.authToken
  },
  GET_LOADINGSTATION_DATA(state) {
    return state.loadingStations
  }
}

export const mutations = {
  SET_STAKEHOLDER(state, value) {
    state.stakeholder = value
  },
  SET_TOKEN(state, value) {
    state.authToken = value
  },
  SET_LOADINGSTATION_DATA(state, value) {
    state.loadingStations = value
  }
}

export const actions = {
  FETCH_LOADINGSTATION_DATA({commit, state}) {
    return fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.authToken
      },
      body: JSON.stringify({
        query:
          'query { loadingstations { city longitude latitude address postalcode provider sockets usedsockets status _id }}'
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.data)
      commit('SET_LOADINGSTATION_DATA', res.data.loadingstations.slice(0, 200))
    })
  }
}

export const state = () => ({
  stakeholder: 'NUON',
  authToken: '',
  loadingStations: []
})
