import React, { Component, PropTypes } from 'react';
import { MessageList, MessageForm } from '..';
import './style.css';

export default class MessageWindow extends Component {
  hamburgerBtnClick() {
    // this.props.toggleUsersList();
  }
  render() {
    const { messages, socketsSend } = this.props;


    return (
      <div>
        <div>
          {'Chat'}
          <span
            hamburgerBtnClick={::this.hamburgerBtnClick}
          />
        </div>
        <MessageList
          messages={messages}
        />
        <MessageForm
          send={socketsSend}
        />
      </div>
    );
  }
}

MessageWindow.propTypes = {
  messages: PropTypes.array.isRequired,
  socketsSend: React.PropTypes.func.isRequired,
};
