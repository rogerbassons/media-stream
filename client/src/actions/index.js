import axios from 'axios'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'
var url = window.location.hostname
var port = window.location.port
if (port !== 0) {
  url += ":" + port
}
url = "localhost:8000/"
const base = "http://" + url //+ "/api/"

export const receiveVideos = json => ({
  type: RECEIVE_VIDEOS,
  videos: json.data.results
})

export const receiveVideo = json => ({
  type: RECEIVE_VIDEO,
  video: json.data
})

export const receiveToken = json => ({
  type: RECEIVE_TOKEN,
  token: json.data.token
})

export const deleteToken = () => ({
  type: DELETE_TOKEN
})

export const fetchVideos = () => {
  return function(dispatch) {
    axios.get(base + 'videos/last/')
    .then(function(response) {
      dispatch(receiveVideos(response))
    })
  }
}

export const searchVideos = (text) => {
  return function(dispatch) {
    axios.get(base + 'videos?search=' + text)
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
      dispatch(receiveToken(response))
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
