import { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <h1>{'Error 404'}</h1>
        <p>{'page not found.'}</p>
      </div>
    );
  }
}
