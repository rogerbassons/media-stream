import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Videos from '../components/Videos'
import {searchVideos} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Search extends Component {

  getSearch(props) {
    const { dispatch } = props
    dispatch(searchVideos(props.history.location.search.split('=')[1]))
  }

  constructor(props) {
    super(props)
    this.getSearch(props)
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.getSearch(nextProps)
    }
  }

  render() {
   const {videos} = this.props
   const isEmpty = videos.length === 0
   const search = this.props.location.search.split('=')[1].replace('+', ' ')
   return (
     <div>
       <p> Results for <i>{search}</i>:</p>
       {!isEmpty && <Videos videos={videos.videos} />}
    </div>
    )
  }
}

const mapStateToProps = state => {
  const { videos } = state
  return {
    videos
  }
}

export default connect(mapStateToProps)(withRouter(Search))
