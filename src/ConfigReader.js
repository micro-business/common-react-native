// @flow

import Immutable, { Set } from 'immutable';
import Config from 'react-native-config';

export default class ConfigReader {
  static getDefaultEnvironment = () => (Config.DEFAULT_ENVIRONMENT ? Config.DEFAULT_ENVIRONMENT.trim() : 'PROD');

  static getEnvironments = () =>
    Config.ENVIRONMENTS
      ? Immutable.fromJS(Config.ENVIRONMENTS.split(','))
        .map(_ => _.trim())
        .toSet()
      : Set();

  constructor(environment) {
    this.environment = environment ? environment : ConfigReader.getDefaultEnvironment();
  }

  getValue = key => Config[key];

  getPrefixedValue = key => Config[this.environment + '_' + key];

  getGraphQLEndpointUrl = () => this.getPrefixedValue('GRAPHQL_ENDPOINT_URL');
}
