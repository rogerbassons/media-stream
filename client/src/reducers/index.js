import { combineReducers } from 'redux'
import {
  RECEIVE_VIDEOS,
  RECEIVE_VIDEO,
  RECEIVE_TOKEN,
  DELETE_TOKEN
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

function token(state = null, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
    return {
      token: action.token
    }
    case DELETE_TOKEN:
    return {
      token: null
    }
    default:
    return state
  }
}

const rootReducer = combineReducers({
  videos,
  video,
  token
})

export default rootReducer
