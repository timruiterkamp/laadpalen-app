export const getters = {
  GET_STAKEHOLDER(state) {
    return state.stakeholder
  }
}

export const mutations = {
  SET_STAKEHOLDER(state, value) {
    state.stakeholder = value
  }
}

export const state = () => ( {
  stakeholder: 'NUON'
} )
