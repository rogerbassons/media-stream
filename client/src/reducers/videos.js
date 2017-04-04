import {
  RECEIVE_VIDEOS
} from '../actions'

function videos(state = [], action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return {
        videos: action.videos
      }
    default:
      return state
  }
}

export default videos
