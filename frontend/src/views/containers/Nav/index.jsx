import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import * as actionCreators from '../../../state-management/actions/actionCreators';
import './style.css';

class Nav extends Component {
  componentDidMount() {
    const { history } = this.props;

    if (!localStorage.nickname) {
      history.push('/login');
    } else {
      history.push('/chat');
    }
  }
  render() {
    return (
      <div>
        <Helmet
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
          title="Chat app"
        />
      </div>
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Nav.propTypes = {
  history: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => Object.assign({}, state);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

const navWithRouter = withRouter(Nav);

export default connect(mapStateToProps, mapDispatchToProps)(navWithRouter);
