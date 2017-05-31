import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Card, Paper } from 'material-ui/Card';
import { Message } from '..';
import './style.css';

export default class MessageList extends Component {

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    this.prevHeight = node.scrollHeight;
  }
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);

    if (node.scrollHeight - node.scrollTop - node.clientHeight === node.scrollHeight - this.prevHeight) {
      node.scrollTop = node.scrollHeight;
    }
    this.prevHeight = node.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    const list = messages.map((elem, index) => {
      const now = new Date(elem.time);
      const time = now.toLocaleString();
      const text = decodeURI(elem.text);
      const name = elem.name;


      return (
        <Card style={{ marginBottom: '11px' }} >
          <Message
            key={index}
            name={name}
            text={text}
            time={time}
          />
        </Card>
      );
    });

    return (
      <Card>
        {list}
      </Card>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};
