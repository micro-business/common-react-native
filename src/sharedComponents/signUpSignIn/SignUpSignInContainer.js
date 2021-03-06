// @flow

import * as userAccessActions from '@microbusiness/common-react/src/userAccess/Actions';
import { UserAccessStatus } from '@microbusiness/common-react';
import React, { Component } from 'react';
import { Alert, Linking } from 'react-native';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import SignUpSignIn from './SignUpSignIn';
import { ConfigReader } from '../..';

class SignInSignUpContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentEnvironment: ConfigReader.getDefaultEnvironment(),
  };

  componentDidMount = () => {
    AsyncStorage.getItem('@global:environment')
      .then(environment => {
        this.setState({ currentEnvironment: environment ? environment : ConfigReader.getDefaultEnvironment() });
      })
      .catch(() => {});
  };

  handleSignInWithFacebookClicked = () => {
    const { userAccessActions } = this.props;

    userAccessActions.signInWithFacebook('public_profile,email', 'individual');
  };

  handleSignInClicked = (emailAddress, password) => {
    const { userAccessActions } = this.props;

    userAccessActions.signInWithUsernameAndPassword(emailAddress, password);
  };

  handleSignUpClicked = (emailAddress, password) => {
    const { userAccessActions } = this.props;

    userAccessActions.signUpWithUsernameAndPassword(emailAddress, password, emailAddress, 'individual');
  };

  handleClickHyperLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  handleEnvironmentSelected = environment => {
    AsyncStorage.setItem('@global:environment', environment)
      .then(() => {
        RNRestart.Restart();
      })
      .catch(error => {
        Alert.alert(error.message);

        throw new error();
      });
  };

  render = () => {
    const {
      signInStatus,
      signUpStatus,
      title,
      titleTextColor,
      enableFacebookSignIn,
      enableCreateAccount,
      backgroundImageUrl,
      termAndConditionUrl,
      companyName,
      labelTextColor,
      inputPlaceholderTextColor,
      logoImageUrl,
      backgroundColor,
      displayEnvironmentSelector,
    } = this.props;
    const { currentEnvironment } = this.state;

    return (
      <SignUpSignIn
        onSignInWithFacebookClicked={this.handleSignInWithFacebookClicked}
        onSignInClicked={this.handleSignInClicked}
        onSignUpClicked={this.handleSignUpClicked}
        signUpOrSignInIsInProgress={signInStatus === UserAccessStatus.IN_PROGRESS || signUpStatus === UserAccessStatus.IN_PROGRESS}
        handleClickHyperLink={this.handleClickHyperLink}
        title={title}
        titleTextColor={titleTextColor}
        enableFacebookSignIn={enableFacebookSignIn}
        enableCreateAccount={enableCreateAccount}
        backgroundImageUrl={backgroundImageUrl}
        termAndConditionUrl={termAndConditionUrl}
        companyName={companyName}
        labelTextColor={labelTextColor}
        inputPlaceholderTextColor={inputPlaceholderTextColor}
        logoImageUrl={logoImageUrl}
        backgroundColor={backgroundColor}
        currentEnvironment={currentEnvironment}
        environments={ConfigReader.getEnvironments()}
        onEnvironmentSelected={this.handleEnvironmentSelected}
        displayEnvironmentSelector={displayEnvironmentSelector}
      />
    );
  };
}

SignInSignUpContainer.propTypes = {
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
  logoImageUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
  displayEnvironmentSelector: PropTypes.bool,
};

SignInSignUpContainer.defaultProps = {
  enableFacebookSignIn: true,
  enableCreateAccount: true,
  backgroundImageUrl: null,
  titleTextColor: null,
  inputPlaceholderTextColor: null,
  labelTextColor: null,
  logoImageUrl: null,
  backgroundColor: '#24232D',
  displayEnvironmentSelector: false,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInSignUpContainer);
