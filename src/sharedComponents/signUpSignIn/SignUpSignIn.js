// @flow

import emailValidator from 'email-validator';
import { Map, Set } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, ScrollView, View, ImageBackground, Picker } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Col, Row } from 'react-native-easy-grid';
import { Button, Input, FormValidationMessage, Icon, Text } from 'react-native-elements';
import Styles from './Styles';

class SignInSignUp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: Map({
        signInInputAreaHidden: true,
        signInButtonPressed: false,
        signInEmailAddress: '',
        signInEmailAddressChanged: false,
        signInPassword: '',
        signInPasswordChanged: false,
        signUpInputAreaHidden: true,
        signUpButtonPressed: false,
        signUpEmailAddress: '',
        signUpEmailAddressChanged: false,
        signUpPassword: '',
        signUpPasswordChanged: false,
        signUpConfirmPassword: '',
        signUpConfirmPasswordChanged: false,
      }),
    };
  }

  onSignInEmailAddressChanged = text => {
    this.setState(({ data: prevData }) => ({ data: prevData.set('signInEmailAddress', text.toLowerCase()).set('signInEmailAddressChanged', true) }));
  };

  onSignInPasswordChanged = text => {
    this.setState(({ data: prevData }) => ({ data: prevData.set('signInPassword', text).set('signInPasswordChanged', true) }));
  };

  onSignUpEmailAddressChanged = text => {
    this.setState(({ data: prevData }) => ({ data: prevData.set('signUpEmailAddress', text.toLowerCase()).set('signUpEmailAddressChanged', true) }));
  };

  onSignUpPasswordChanged = text => {
    this.setState(({ data: prevData }) => ({ data: prevData.set('signUpPassword', text).set('signUpPasswordChanged', true) }));
  };

  onSignUpConfirmPasswordChanged = text => {
    this.setState(({ data: prevData }) => ({ data: prevData.set('signUpConfirmPassword', text).set('signUpConfirmPasswordChanged', true) }));
  };

  onSignInClicked = () => {
    const { data } = this.state;
    const { onSignInClicked } = this.props;

    if (data.get('signInInputAreaHidden')) {
      this.setState(({ data: prevData }) => ({ data: prevData.set('signInInputAreaHidden', false).set('signUpInputAreaHidden', true) }));
    } else {
      this.setState(({ data: prevData }) => ({ data: prevData.set('signInButtonPressed', true) }));

      if (!this.getSignInEmailErrorMessage(true) && !this.getSignInPasswordErrorMessage(true)) {
        onSignInClicked(data.get('signInEmailAddress'), data.get('signInPassword'));
      }
    }
  };

  onSignUpClicked = () => {
    const { data } = this.state;
    const { onSignUpClicked } = this.props;

    if (data.get('signUpInputAreaHidden')) {
      this.setState(({ data: prevData }) => ({ data: prevData.set('signInInputAreaHidden', true).set('signUpInputAreaHidden', false) }));
    } else {
      this.setState(({ data: prevData }) => ({ data: prevData.set('signUpButtonPressed', true) }));

      if (!this.getSignUpEmailErrorMessage(true) && !this.getSignUpPasswordErrorMessage(true) && !this.getSignUpConfirmPasswordErrorMessage(true)) {
        onSignUpClicked(data.get('signUpEmailAddress'), data.get('signUpPassword'));
      }
    }
  };

  getSignInEmailErrorMessage = buttonPressed => {
    const { data } = this.state;

    if (data.get('signInEmailAddressChanged') || buttonPressed) {
      const emailAddress = data.get('signInEmailAddress');

      if (emailAddress) {
        return emailValidator.validate(emailAddress) ? null : 'Email address is badly formatted.';
      }

      return 'Email address is required.';
    }

    return null;
  };

  getSignInPasswordErrorMessage = buttonPressed => {
    const { data } = this.state;

    if (data.get('signInPasswordChanged') || buttonPressed) {
      return data.get('signInPassword') ? null : 'Password is required.';
    }

    return null;
  };

  getSignUpEmailErrorMessage = buttonPressed => {
    const { data } = this.state;

    if (data.get('signUpEmailAddressChanged') || buttonPressed) {
      const emailAddress = data.get('signUpEmailAddress');

      if (emailAddress) {
        return emailValidator.validate(emailAddress) ? null : 'Email address is badly formatted.';
      }

      return 'Email address is required.';
    }

    return null;
  };

  getSignUpPasswordErrorMessage = buttonPressed => {
    const { data } = this.state;

    if (data.get('signUpPasswordChanged') || buttonPressed) {
      const password = data.get('signUpPassword');

      if (!password || password.trim().length === 0) {
        return 'Password is required.';
      } else if (password.trim().length < 6) {
        return 'Password length must be at least 6 characters.';
      } else if (password.trim().length > 100) {
        return 'Password length cannot be longer than 100 characters.';
      }

      return null;
    }

    return null;
  };

  getSignUpConfirmPasswordErrorMessage = buttonPressed => {
    const { data } = this.state;

    if (data.get('signUpConfirmPasswordChanged') || buttonPressed) {
      if (this.getSignUpPasswordErrorMessage(buttonPressed)) {
        return null;
      }

      const password = data.get('signUpPassword');
      const confirmPassword = data.get('signUpConfirmPassword');

      if (password.localeCompare(confirmPassword) === 0) {
        return null;
      }

      return 'Please re-enter your password.';
    }

    return null;
  };

  renderErrorMessage = errorMessage => {
    if (errorMessage) {
      return (
        <FormValidationMessage> 
          {' '}
          {errorMessage}
        </FormValidationMessage>
      );
    }
    return <View />;
  };

  renderFacebookButton = () => {
    const { onSignInWithFacebookClicked } = this.props;

    return (
      <Button
        title="Sign in with Facebook"
        icon={<Icon name="facebook" type="material-community" />}
        backgroundColor="#3b5998"
        buttonStyle={Styles.button}
        onPress={onSignInWithFacebookClicked}
      />
    );
  };

  renderSignInArea = () => {
    const { errorMessageColor, inputPlaceholderTextColor, inputTextColor } = this.props;
    const { data } = this.state;
    const signInButtonPressed = data.get('signInButtonPressed');
    const emailErrorMessage = this.getSignInEmailErrorMessage(signInButtonPressed);
    const passwordErrorMessage = this.getSignInPasswordErrorMessage(signInButtonPressed);

    return (
      <View>
        {!data.get('signInInputAreaHidden') && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
              <Input
                onChangeText={this.onSignInEmailAddressChanged}
                value={data.get('signInEmailAddress')}
                placeholder="Email"
                placeholderTextColor={inputPlaceholderTextColor}
                inputStyle={{ color: inputTextColor }}
                keyboardType="email-address"
                leftIcon={<Icon name="at" type="font-awesome" size={24} />}
                errorStyle={{ color: errorMessageColor }}
                displayError={emailErrorMessage ? true : false}
                errorMessage={emailErrorMessage}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
              <Input
                onChangeText={this.onSignInPasswordChanged}
                value={data.get('signInPassword')}
                placeholderTextColor={inputPlaceholderTextColor}
                placeholder="Password"
                inputStyle={{ color: inputTextColor }}
                secureTextEntry
                leftIcon={<Icon name="unlock" type="font-awesome" size={24} />}
                errorStyle={{ color: errorMessageColor }}
                displayError={passwordErrorMessage ? true : false}
                errorMessage={passwordErrorMessage}
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
              />
            </View>
          </View>
        )}
        <Button
          title="Continue with Email"
          onPress={this.onSignInClicked}
          buttonStyle={Styles.button}
          containerViewStyle={Styles.signInButtonContainerViewStyle}
          icon={<Icon name="email" type="material-community" />}
          backgroundColor="#3b5998"
        />
      </View>
    );
  };

  renderSignUpArea = () => {
    const { errorMessageColor, inputPlaceholderTextColor, inputTextColor } = this.props;
    const { data } = this.state;
    const signUpButtonPressed = data.get('signUpButtonPressed');
    const emailErrorMessage = this.getSignUpEmailErrorMessage(signUpButtonPressed);
    const passwordErrorMessage = this.getSignUpPasswordErrorMessage(signUpButtonPressed);
    const confirmPasswordErrorMessage = this.getSignUpConfirmPasswordErrorMessage(signUpButtonPressed);

    return (
      <View>
        {!data.get('signUpInputAreaHidden') && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
              <Input
                onChangeText={this.onSignUpEmailAddressChanged}
                value={data.get('signUpEmailAddress')}
                placeholder="Email"
                placeholderTextColor={inputPlaceholderTextColor}
                inputStyle={{ color: inputTextColor }}
                keyboardType="email-address"
                leftIcon={<Icon name="at" type="font-awesome" size={24} />}
                errorStyle={{ color: errorMessageColor }}
                displayError={emailErrorMessage ? true : false}
                errorMessage={emailErrorMessage}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
              <Input
                onChangeText={this.onSignUpPasswordChanged}
                value={data.get('signUpPassword')}
                placeholder="Password"
                placeholderTextColor={inputPlaceholderTextColor}
                inputStyle={{ color: inputTextColor }}
                secureTextEntry
                leftIcon={<Icon name="unlock" type="font-awesome" size={24} />}
                errorStyle={{ color: errorMessageColor }}
                displayError={passwordErrorMessage ? true : false}
                errorMessage={passwordErrorMessage}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
              <Input
                onChangeText={this.onSignUpConfirmPasswordChanged}
                value={data.get('signUpConfirmPassword')}
                placeholder="Re-enter Password"
                placeholderTextColor={inputPlaceholderTextColor}
                inputStyle={{ color: inputTextColor }}
                secureTextEntry
                leftIcon={<Icon name="unlock" type="font-awesome" size={24} />}
                errorStyle={{ color: errorMessageColor }}
                displayError={confirmPasswordErrorMessage ? true : false}
                errorMessage={confirmPasswordErrorMessage}
              />
            </View>
          </View>
        )}
        <Button
          raised
          title="Create Account"
          onPress={this.onSignUpClicked}
          buttonStyle={Styles.button}
          containerViewStyle={Styles.signUpButtonContainerViewStyle}
          icon={<Icon name="md-log-in" type="ionicon" />}
          backgroundColor="#3b5998"
        />
      </View>
    );
  };

  renderSignUpOrSignInIsInProgressIndicator = () => {
    const { signUpOrSignInIsInProgress } = this.props;

    if (signUpOrSignInIsInProgress) {
      return (
        <Row>
          <Col>
            <ActivityIndicator animating={signUpOrSignInIsInProgress} size="large" color="#3b5998" style={Styles.activityIndicator} />
          </Col>
        </Row>
      );
    }

    return <View />;
  };

  renderSignUpSignInView = () => {
    const {
      title,
      titleTextColor,
      logoImageUrl,
      enableFacebookSignIn,
      enableCreateAccount,
      handleClickHyperLink,
      termAndConditionUrl,
      companyName,
      environments,
      currentEnvironment,
      onEnvironmentSelected,
      displayEnvironmentSelector,
    } = this.props;
    const style = titleTextColor ? { color: titleTextColor } : Styles.title;

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={Styles.topContainer}>
          <Text h2 style={style}>
            {title}
          </Text>
          {logoImageUrl ? <FastImage style={Styles.logo} source={{ uri: logoImageUrl }} /> : <View />}
        </View>
        {this.renderSignUpOrSignInIsInProgressIndicator()}
        {enableFacebookSignIn && this.renderFacebookButton()}
        {this.renderSignInArea()}
        {enableCreateAccount && this.renderSignUpArea()}
        <View style={Styles.termAndConditionContainter}>
          <Text style={style}>
By tapping Continue you agree to the following
          </Text>
          <Text onPress={() => handleClickHyperLink(termAndConditionUrl)} style={Styles.hyperLink}>
            Terms & Conditions
          </Text>
          <Text style={style}>
            © Copyright 2017-
            {new Date().getFullYear()} 
            {' '}
            {companyName}
            , all rights reserved.
          </Text>
        </View>
        {displayEnvironmentSelector && (
          <Picker style={style} selectedValue={currentEnvironment} onValueChange={onEnvironmentSelected}>
            {environments.map(environment => <Picker.Item key={environment} label={environment} value={environment} />)}
          </Picker>
        )}
      </ScrollView>
    );
  };

  render = () => {
    const { backgroundColor, backgroundImage, backgroundImageUrl } = this.props;
    const style = {
      backgroundColor,
      flex: 1,
    };

    if (backgroundImage) {
      return (
        <ImageBackground style={Styles.backgroundImage} source={{ uri: backgroundImageUrl }}>
          {this.renderSignUpSignInView()}
        </ImageBackground>
      );
    }

    return (
      <View style={style}>
        {this.renderSignUpSignInView()}
      </View>
    );
  };
}

SignInSignUp.propTypes = {
  onSignInWithFacebookClicked: PropTypes.func.isRequired,
  onSignInClicked: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired,
  signUpOrSignInIsInProgress: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  titleTextColor: PropTypes.string.isRequired,
  enableFacebookSignIn: PropTypes.bool.isRequired,
  enableCreateAccount: PropTypes.bool.isRequired,
  handleClickHyperLink: PropTypes.func.isRequired,
  termAndConditionUrl: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  labelTextColor: PropTypes.string.isRequired,
  inputPlaceholderTextColor: PropTypes.string.isRequired,
  logoImageUrl: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  displayEnvironmentSelector: PropTypes.bool.isRequired,
  currentEnvironment: PropTypes.string.isRequired,
  environments: PropTypes.instanceOf(Set).isRequired,
  onEnvironmentSelected: PropTypes.func.isRequired,
  backgroundImageUrl: PropTypes.string,
  errorMessageColor: PropTypes.string,
  inputTextColor: PropTypes.string,
};

SignInSignUp.defaultProps = {
  backgroundImageUrl: null,
  errorMessageColor: 'red',
  inputTextColor: 'white',
};

export default SignInSignUp;
