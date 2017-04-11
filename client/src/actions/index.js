import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data.results
})

export const receiveVideo = json => ({
  type: RECEIVE_VIDEO,
  video: json.data.results
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
    axios.get('http://localhost:8000/videos?id=' + id)
    .then(function(response) {
      console.log(response)
      dispatch(receiveVideo(response))
    })
  }
}
