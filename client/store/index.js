import DB from '~/helpers/db.js'

export const getters = {
  GET_STAKEHOLDER(state) {
    return state.stakeholder
  },
  GET_TOKEN(state) {
    return state.authToken
  },
  GET_LOADINGSTATION_DATA(state) {
    return state.loadingStations
  },
  GET_MESSAGES_NOTIFICATIONS(state) {
    return state.messagesNotifications
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
  },
  INCREMENT_MESSAGES_NOTIFICATIONS(state) {
    state.messagesNotifications++
  },
  RESET_MESSAGES_NOTIFICATIONS(state) {
    state.messagesNotifications = 0
  }
}

export const actions = {
  FETCH_LOADINGSTATION_DATA({ commit, state }) {
    return DB.execute(
      `query {
        loadingstations {
          _id
          city
          longitude
          latitude
          address
          postalcode
          provider
          sockets
          usedsockets
          status
          issues {
            _id
          }
        }
      }`,
      state.authToken
    )
      .then(res => res.loadingstations.slice(0, 200))
      .then(res => {
        return res.map(station => {
          const issueIds = station.issues
          if (issueIds && issueIds.length > 0) {
            return new Promise((resolve, reject) => {
              const promises = issueIds.map(issue => {
                return DB.execute(
                  `
                query {
                  issue(id: "${issue._id}") {
                    _id
                    status
                    location
                    title
                  }
                }
              `, state.authToken)
              .then(data => {
                if (!data) {
                  console.error('No issue with id: ', issue._id, ' was found at loadingstation: ', station._id)
                }
                return data.issue
              })
              .catch(err => reject(err))
            })
            Promise.all(promises)
              .then(issues => {
                station.issues = issues
                resolve(station)
              })
              .catch(err => reject(err))
          })
        }
        return new Promise(resolve => resolve(station))
      })
      .catch(console.error)
  }
}

export const state = () => ({
  stakeholder: 'NUON',
  authToken: '',
  loadingStations: [],
  messagesNotifications: 0
})
