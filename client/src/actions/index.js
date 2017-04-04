import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data[0].videos
})

export function fetchVideos() {
  return function(dispatch) {
    axios.get('https://private-fb2453-test12911.apiary-mock.com/front')
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

/*export const getVideos = dispatch => {
console.log(arguments)
return dispatch(fetchVideos())
}*/
