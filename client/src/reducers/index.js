import { combineReducers } from 'redux'
import {
  RECEIVE_VIDEOS,
  RECEIVE_VIDEO
} from '../actions'

function videos(state = [], action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return {
        videos: action.videos,
      }
    default:
      return state
  }
}

function video(state = null, action) {
  switch (action.type) {
    case RECEIVE_VIDEO:
      return {
        video: action.video
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  videos,
  video
})

export default rootReducer
