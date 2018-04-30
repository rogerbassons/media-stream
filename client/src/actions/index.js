import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_STREAMS = 'RECEIVE_STREAMS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'
export const RECEIVE_TOKENUSER = 'RECEIVE_TOKENUSER'
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const RECEIVE_LIVESTREAMKEY = 'RECEIVE_LIVESTREAMKEY'

var url = window.location.hostname
var port = window.location.port
if (port !== 0) {
  url += ":" + port
}
var base = "http://" + url + "/api/"

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data
})

export const receiveStreams = json => ({
  type: RECEIVE_STREAMS,
  streams: json.data
})

export const receiveVideo = json => ({
  type: RECEIVE_VIDEO,
  video: json.data
})


export const receiveTokenUser = (json, username) => ({
  type: RECEIVE_TOKENUSER,
  token: json.data.token,
  username: username
})

export const deleteToken = () => ({
  type: DELETE_TOKEN
})

export const receiveLiveStreamKey = json => ({
  type: RECEIVE_LIVESTREAMKEY,
  livekey: json.data.key
})

export const fetchVideos = () => {
  return function(dispatch) {
    axios.get(base + 'videos/last/')
    .then(function(response) {
	dispatch(receiveVideos(response))
    })
  }
}

export const fetchStreams = () => {
  return function(dispatch) {
    axios.get(base + 'streams/last/')
    .then(function(response) {
        dispatch(receiveStreams(response))
    })
  }
}

export const searchVideos = (text) => {
  return function(dispatch) {
    axios.get(base + 'videos/?search=' + text)
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const getVideo = (id, token) => {
    return function(dispatch) {
      let instance = axios.create({
        baseURL: base + 'videos/' + id + '/',
      });
      if (token !== null) {
        instance = axios.create({
          baseURL: base + 'videos/' + id + '/',
          headers: {'Authorization': 'Token ' + token}
        });
      }
      instance.get()
      .then(function(response) {
        dispatch(receiveVideo(response))
      })
    }
}

export const startLive = (title, description, token) => {
  return function(dispatch) {
    axios.post(
      base + 'streams/',
      {title : title, description : description},
      { headers: {
        'Authorization': 'Token ' + token
      }}
    ).then(function(response) {
        dispatch(receiveLiveStreamKey(response))
    })
  }
}

export const sendTitleDescription = (videoId, title, description, token) => {
  return function(dispatch) {
    axios.put(
      base + 'videos/' + videoId + '/',
      {title : title, description : description},
      { headers: {
        'Authorization': 'Token ' + token
      }}
    ).then(function(response) {
      if (response.status !== 204) {
        dispatch(receiveVideo(response))
      }
    })
  }
}

export const uploadFile= (file, title, description, token) => {
  return function(dispatch) {
    axios.post(
      base + 'videos/',
      file,
      { headers: {
        'Authorization': 'Token ' + token,
        'Content-Type' : 'multipart/form-data'
      }}
    ).then(function(response) {
        dispatch(sendTitleDescription(response.data.videoId, title, description, token))
    })
  }
}

export const likeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + 'videos/' + id + "/like/",
      headers: {'Authorization': 'Token ' + token}
    });
    instance.put()
    .then(function(response) {
      if (response.status !== 204) {
        dispatch(receiveVideo(response))
      }
    })
  }
}

export const unlikeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + 'videos/' + id + '/unlike/',
      headers: {'Authorization': 'Token ' + token}
    });
    instance.put()
    .then(function(response) {
      if (response.status !== 204) {
        dispatch(receiveVideo(response))
      }
    })
  }
}

export const deleteLikeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + 'videos/' + id + "/like/",
      headers: {'Authorization': 'Token ' + token}
    });
    instance.delete()
    .then(function(response) {
        dispatch(receiveVideo(response))
    })
  }
}

export const deleteUnlikeVideo = (id, token) => {
  return function(dispatch) {
    const instance = axios.create({
      baseURL: base + 'videos/' + id + '/unlike/',
      headers: {'Authorization': 'Token ' + token}
    });
    instance.delete()
    .then(function(response) {
        dispatch(receiveVideo(response))
    })
  }
}

export const doLogin = (user, pass) => {
  return function(dispatch) {
    axios.post(base + 'login/', {
      username: user,
      password: pass
    })
    .then(function(response) {
      dispatch(receiveTokenUser(response, user))
    })
  }
}

export const commentVideo = (comment, id, token) => {
  return function(dispatch) {
    var config = {
      headers: {'Authorization': 'Token ' + token}
    };
    axios.put(base + 'videos/' + id + '/comments/', {text: comment}, config)
    .then(function(response) {
      dispatch(receiveVideo(response))
    })
  }
}
