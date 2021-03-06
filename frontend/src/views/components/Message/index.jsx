import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import './style.css';

export default class Message extends Component {
  render() {
    const {
      name,
      text,
      time } = this.props;


    return (
      <Card style={{ padding: '12px', margin: '1%' }}>
        <div className="message-name">{name}</div>
        <div className="message-time small hidden-xs">{time}</div>
        <div className="message-text">{text}</div>
        <div className="clearfix" />
      </Card>
    );
  }
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
