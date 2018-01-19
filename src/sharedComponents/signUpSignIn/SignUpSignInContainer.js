// @flow

import * as userAccessActions from '@microbusiness/common-react/src/userAccess/Actions';
import { UserAccessStatus } from '@microbusiness/common-react';
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
      titleTextColor={this.props.titleTextColor}
      enableFacebookSignIn={this.props.enableFacebookSignIn}
      enableCreateAccount={this.props.enableCreateAccount}
      backgroundImageUrl={this.props.backgroundImageUrl}
    />
  );
}

UserSignInSignUpContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  signInStatus: PropTypes.number.isRequired,
  signUpStatus: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleTextColor: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  enableFacebookSignIn: PropTypes.bool,
  enableCreateAccount: PropTypes.bool,
};

UserSignInSignUpContainer.defaultProps = {
  enableFacebookSignIn: true,
  enableCreateAccount: true,
  backgroundImageUrl: null,
  titleTextColor: null,
};

function mapStateToProps(state, props) {
  return {
    signInStatus: state.userAccess.get('signInStatus'),
    signUpStatus: state.userAccess.get('signUpStatus'),
    title: props.title,
    titleTextColor: props.titleTextColor,
    enableFacebookSignIn: props.enableFacebookSignIn,
    enableCreateAccount: props.enableCreateAccount,
    backgroundImageUrl: props.backgroundImageUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignInSignUpContainer);
