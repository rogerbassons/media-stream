import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'
const base = "http://192.168.1.4:8000"

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data.results
})

export const receiveVideo = json => ({
  type: RECEIVE_VIDEO,
  video: json.data
})

export const receiveToken = json => ({
  type: RECEIVE_TOKEN,
  token: json.data.token
})

export const deleteToken = () => ({
  type: DELETE_TOKEN
})

export const fetchVideos = () => {
  return function(dispatch) {
    axios.get(base + '/videos/last')
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const searchVideos = (text) => {
  return function(dispatch) {
    axios.get(base + '/videos?search=' + text)
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const getVideo = (id) => {
  return function(dispatch) {
    axios.get(base + '/videos/' + id)
    .then(function(response) {
      dispatch(receiveVideo(response))
    })
  }
}

export const likeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + '/videos/' + id + "/like/",
      headers: {'Authorization': 'Token ' + token}
    });
    instance.put()
    .then(function(response) {
      dispatch(getVideo(id))
    })
  }
}

export const unlikeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + '/videos/' + id + '/unlike',
      headers: {'Authorization': 'Token ' + token}
    });
    instance.put()
    .then(function(response) {
      dispatch(getVideo(id))
    })
  }
}

export const doLogin = (user, pass) => {
  return function(dispatch) {
    axios.post(base + '/login', {
      username: user,
      password: pass
    })
    .then(function(response) {
      console.log(response)
      dispatch(receiveToken(response))
    })
  }
}
