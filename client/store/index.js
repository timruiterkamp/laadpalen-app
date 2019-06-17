export const getters = {
  GET_STAKEHOLDER(state) {
    return state.stakeholder
  },
  GET_TOKEN(state) {
    return state.authToken
  }
}

export const mutations = {
  SET_STAKEHOLDER(state, value) {
    state.stakeholder = value
  },
  SET_TOKEN(state, value) {
    state.authToken = value
  }
}

export const state = () => ({
  stakeholder: 'NUON',
  authToken: ''
})
