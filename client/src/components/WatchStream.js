import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Stream from '../components/Stream'
import 'bootstrap/dist/css/bootstrap.css'

class WatchStream extends Component {

  render() {
    const username = this.props.history.location.search.split('=')[1]

    return (
    <div>

      <div className="row">
        <div className="col-md-12 movieblack">
          <div className="row">
            <div  className="col-md-2"></div>
            <div  className="col-md-8">
              <Stream username={username} />
            </div>
            <div  className="col-md-2"></div>
          </div>
        </div>
      </div>

    </div>
    )
  }
}

const mapStateToProps = state => {
  const { streams } = state
  return {
    streams
  }
}

export default connect(mapStateToProps)(withRouter(WatchStream))
