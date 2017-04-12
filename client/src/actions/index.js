import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

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
    axios.get('http://localhost:8000/videos/last')
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const searchVideos = (text) => {
  return function(dispatch) {
    axios.get('http://localhost:8000/videos?search=' + text)
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const getVideo = (id) => {
  return function(dispatch) {
    axios.get('http://localhost:8000/videos/' + id)
    .then(function(response) {
      dispatch(receiveVideo(response))
    })
  }
}

export const likeVideo = (id) => {
  return function(dispatch) {
    axios.put('http://localhost:8000/videos/videos/' + id + '/like')
    .then(function(response) {
      dispatch(getVideo(id))
    })
  }
}

export const unlikeVideo = (id) => {
  return function(dispatch) {
    axios.put('http://localhost:8000/videos/videos/' + id + '/unlike')
    .then(function(response) {
      dispatch(getVideo(id))
    })
  }
}

export const doLogin = (user, pass) => {
  return function(dispatch) {
    axios.post('http://localhost:8000/login', {
      username: user,
      password: pass
    })
    .then(function(response) {
      dispatch(receiveToken(response))
    })
  }
}
