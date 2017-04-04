import { combineReducers } from 'redux'
//import videos from './videos'
import {
  RECEIVE_VIDEOS,
  GET_VIDEOS
} from '../actions'

/*
const initialState = {
  videos: []
}

function mediaApp(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return Object.assign({}, state, {
         videos: action.videos
      })
    default:
      return state
  }
}
export default mediaApp
*/

function videos(state = [], action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        videos: action.videos
      }
    case RECEIVE_VIDEOS:
      return {
        videos: action.videos
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  videos
})

export default rootReducer
