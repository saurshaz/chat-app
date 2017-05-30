import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'material-ui';
import * as actionCreators from '../../../state-management/actions/actionCreators';
// import './style.css'
import {
  DevPanel,
  MessageWindow,
  UsersList } from '../../components';

class App extends Component {

  render() {
    const {
      sockets,
      messageList,
      user,
      usersList,
      actions,
    } = this.props;

    return (
      <div>
        <DevPanel
          connect={actions.socketsConnect}
          connected={sockets.connected}
          disconnect={actions.socketsDisconnect}
          loaded={sockets.loaded}
          message={sockets.message}
        />
        <div className="row chat-app ">
          <Card className={`col-md-9 messagewindow-wrapper ${messageList.hidden ? 'list-showed' : ''}`}>
            <MessageWindow
              messages={messageList.messages}
              socketsSend={actions.socketsSend}
              toggleUsersList={actions.toggleUsersList}
            />
          </Card>
        </div>

      </div>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.object.isRequired,
  messageList: React.PropTypes.object.isRequired,
  sockets: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  usersList: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => Object.assign({}, state);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
