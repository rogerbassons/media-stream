import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data.results
})

export const receiveSearch = json => ({
  type: RECEIVE_SEARCH,
  videos: json.data.results
})

export const fetchVideos = () => {
  return function(dispatch) {
    axios.get('http://localhost:8000/videos/last')
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export function searchVideos(text) {
  return function(dispatch) {
    axios.get('http://localhost:8000/videos?search=' + text)
    .then(function(response) {
      dispatch(receiveSearch(response))
    })
  }
}
