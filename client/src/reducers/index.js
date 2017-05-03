import { combineReducers } from 'redux'
import {
  RECEIVE_VIDEOS,
  RECEIVE_STREAMS,
  RECEIVE_VIDEO,
  RECEIVE_TOKENUSER,
  DELETE_TOKEN,
  RECEIVE_LIVESTREAMKEY
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

function streams(state = [], action) {
  switch (action.type) {
    case RECEIVE_STREAMS:
    return {
      streams: action.streams,
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
    case RECEIVE_TOKENUSER:
    return {
      token: action.token,
      username: action.username
    }
    case DELETE_TOKEN:
    return {
      token: null,
      username: null,
    }
    default:
    return state
  }
}

function livekey(state = null, action) {
  switch (action.type) {
    case RECEIVE_LIVESTREAMKEY:
    return {
      livekey: action.livekey
    }
    default:
    return state
  }
}


const rootReducer = combineReducers({
  videos,
  video,
  token,
  livekey,
  streams
})

export default rootReducer
