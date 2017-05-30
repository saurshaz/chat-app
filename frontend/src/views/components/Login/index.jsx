import React, { Component } from 'react';
import { Card, RaisedButton, TextField } from 'material-ui/Card';
import './style.css';

export default class Login extends Component {
  componentDidMount() {
    this.refs.NicknameField.focus();
  }

  onJoinBtnClick() {
    localStorage.nickname = this.refs.NicknameField.value;
    location.reload();
  }

  onNicknameChange() {
    if (this.refs.NicknameField.value.trim() === '') {
      this.refs.joinBtn.setAttribute('disabled', true);
    } else {
      this.refs.joinBtn.removeAttribute('disabled');
    }
  }

  render() {
    return (
      <Card>
        <Card>
          <div>{'Introduce yourself:'}</div>
          <TextField
            hintText="Type your nickname..."
            onChange={::this.onNicknameChange}
          />
          <RaisedButton
            ref={'joinBtn'}
            label={'Join chat'}
            onClick={::this.onJoinBtnClick}
          />
        </Card>
      </Card>
    );
  }
}
