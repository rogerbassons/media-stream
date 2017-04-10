import { combineReducers } from 'redux'
import {
  RECEIVE_VIDEOS,
  RECEIVE_SEARCH
} from '../actions'

function videos(state = [], action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return {
        videos: action.videos,
      }
    case RECEIVE_SEARCH:
      return {
        videos: action.videos,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  videos
})

export default rootReducer
