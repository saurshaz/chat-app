import React, { Component, PropTypes } from 'react';
import { Card, TextField } from 'material-ui';
import './style.css';

export default class MessageForm extends Component {
  componentDidMount() {
    this.refs.msgInput.focus();
  }
  onInputKeyPress(e) {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }
  handleSendBtnClick() {
    this.sendMessage();
    this.refs.msgInput.focus();
  }
  sendMessage() {
    const message = this.refs.msgInput.getValue().
trim();

    if (message) {
      this.props.send(message);
    }

    this.refs.msgInput.setState({ value: '' });
  }
  render() {
    return (
      <Card>
        <TextField
          hintText="Type your message..."
          style={{
            position: 'fixed',
            bottom: '10px',
            backgroundColor: 'yellow',
            width: '100%' }}
          ref="msgInput"
          onKeyPress={this.onInputKeyPress.bind(this)}
        />
        <div
          className="btn btn-primary center-block "
          onClick={::this.handleSendBtnClick}
        >{'Send'}</div>
      </Card>
    );
  }
}

MessageForm.propTypes = {
  send: PropTypes.func.isRequired,
};
