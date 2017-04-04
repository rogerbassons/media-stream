import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data.results
})

export function fetchVideos() {
  return function(dispatch) {
    axios.get('http://localhost:8000/videos/')
    .then(function(response) {
      console.log(response.data.results)
      dispatch(receiveVideos(response))
    })
  }
}

/*export const getVideos = dispatch => {
console.log(arguments)
return dispatch(fetchVideos())
}*/
