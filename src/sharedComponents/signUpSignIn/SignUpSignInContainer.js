// @flow

import * as userAccessActions from 'micro-business-common-react/src/userAccess/Actions';
import { UserAccessStatus } from 'micro-business-common-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignUpSignIn from './SignUpSignIn';

class UserSignInSignUpContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  onSignInWithFacebookClicked = () => {
    this.props.userAccessActions.signInWithFacebook('public_profile,email', 'individual');
  };

  onSignInClicked = (emailAddress, password) => {
    this.props.userAccessActions.signInWithUsernameAndPassword(emailAddress, password);
  };

  onSignUpClicked = (emailAddress, password) => {
    this.props.userAccessActions.signUpWithUsernameAndPassword(emailAddress, password, emailAddress, 'individual');
  };

  render = () => (
    <SignUpSignIn
      onSignInWithFacebookClicked={this.onSignInWithFacebookClicked}
      onSignInClicked={this.onSignInClicked}
      onSignUpClicked={this.onSignUpClicked}
      signUpOrSignInIsInProgress={
        this.props.signInStatus === UserAccessStatus.IN_PROGRESS || this.props.signUpStatus === UserAccessStatus.IN_PROGRESS
      }
      title={this.props.title}
    />
  );
}

UserSignInSignUpContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  signInStatus: PropTypes.number.isRequired,
  signUpStatus: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    signInStatus: state.userAccess.get('signInStatus'),
    signUpStatus: state.userAccess.get('signUpStatus'),
    title: props.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignInSignUpContainer);
