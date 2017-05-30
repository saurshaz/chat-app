import React, { Component, PropTypes } from 'react'

export default class DevPanel extends Component{
  componentDidMount(){
    if(!this.props.connected){
      this.props.connect()
    }
  }
  componentWillUnmount() {
    if(this.props.connected){
      this.props.disconnect()
    }
  }
  onConnectBtnClick(){
    if(!this.props.connected){
      this.props.connect()
    }
  }
  onDisconnectBtnClick(){
    if(this.props.connected){
      this.props.disconnect()
    }
  }
  onShowBtnClick(){
    console.log(window.localStorage) //eslint-disable-line no-console
  }
  onClearBtnClick(){
    window.localStorage.clear()
  }
  render(){
    const { 
      loaded, 
      connected, 
      message, } = this.props

    return(
      <div className="panel panel-default" hidden>
        <div className="panel-heading">
          {`loaded = '${loaded}', connected='${connected}', message='${message}'`}
        </div>
        <div className="panel-body">
          <div className="well" style={{display: 'inline-block', width: '50%'}}>
            <button 
              className="btn btn-primary btn-block"
              onClick={::this.onConnectBtnClick}
              disabled={connected}
            >
              Connect
            </button>
            <button 
              className="btn btn-danger btn-block"
              onClick={::this.onDisconnectBtnClick}
              disabled={!connected}>
              Disconnect
            </button>
          </div>
          <div className="well" style={{display: 'inline-block', width: '50%'}}>
            <button 
              className="btn btn-success  btn-block"
              onClick={::this.onShowBtnClick}>
              Show LS
            </button>
            <button 
              className="btn btn-warning  btn-block" 
              onClick={::this.onClearBtnClick}>
              Clear LS
            </button>
          </div>
        </div>
      </div>
    )
  }
}

DevPanel.propTypes = {
  loaded: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired
}