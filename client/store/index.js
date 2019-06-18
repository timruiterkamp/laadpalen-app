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
  FETCH_LOADINGSTATION_DATA({commit}) {
    return fetch('http://localhost:3001/api/laadpalen')
      .then(res => res.json())
      .then(res => commit('SET_LOADINGSTATION_DATA', res.data))
  }
}

export const state = () => ({
  stakeholder: 'NUON',
  authToken: '',
  loadingStations: []
})
