// @flow

import * as userAccessActions from '@microbusiness/common-react/src/userAccess/Actions';
import { UserAccessStatus } from '@microbusiness/common-react';
import React, { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { Linking } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies
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

  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  render = () => (
    <SignUpSignIn
      onSignInWithFacebookClicked={this.onSignInWithFacebookClicked}
      onSignInClicked={this.onSignInClicked}
      onSignUpClicked={this.onSignUpClicked}
      signUpOrSignInIsInProgress={
        this.props.signInStatus === UserAccessStatus.IN_PROGRESS || this.props.signUpStatus === UserAccessStatus.IN_PROGRESS
      }
      handleClickHyperLink={this.handleClickHyperLink}
      title={this.props.title}
      titleTextColor={this.props.titleTextColor}
      enableFacebookSignIn={this.props.enableFacebookSignIn}
      enableCreateAccount={this.props.enableCreateAccount}
      backgroundImageUrl={this.props.backgroundImageUrl}
      termAndConditionUrl={this.props.termAndConditionUrl}
      companyName={this.props.companyName}
      labelTextColor={this.props.labelTextColor}
      inputPlaceholderTextColor={this.props.inputPlaceholderTextColor}
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
  termAndConditionUrl: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  labelTextColor: PropTypes.string,
  inputPlaceholderTextColor: PropTypes.string,
};

UserSignInSignUpContainer.defaultProps = {
  enableFacebookSignIn: true,
  enableCreateAccount: true,
  backgroundImageUrl: null,
  titleTextColor: null,
  inputPlaceholderTextColor: null,
  labelTextColor: null,
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
    termAndConditionUrl: props.termAndConditionUrl,
    companyName: props.companyName,
    inputPlaceholderTextColor: props.inputPlaceholderTextColor,
    labelTextColor: props.labelTextColor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignInSignUpContainer);
