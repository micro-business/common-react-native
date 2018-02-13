// @flow

import React, { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { View } from 'react-native'; // eslint-disable-line import/no-extraneous-dependencies
import { SearchBar } from 'react-native-elements';
import debounce from 'lodash.debounce';
import Styles from './Styles';

class SearchBarWithDelay extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchKeyword: props.searchKeyword,
    };

    this.onSearchKeywordChanged = debounce(this.props.onSearchKeywordChanged, 300);
  }

  componentWillMount() {
    this.setState({
      searchKeyword: '',
    });

    this.props.onSearchKeywordChanged('');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchKeyword: nextProps.searchKeyword,
    });
  }

  searchKeywordChanged = searchKeyword => {
    this.setState(
      {
        searchKeyword,
      },
      () => this.onSearchKeywordChanged(searchKeyword),
    );
  };

  render = () => (
    <View style={Styles.container}>
      <SearchBar
        clearIcon={{ color: this.props.clearIconColor }}
        lightTheme
        noIcon
        autoFocus={this.props.autoFocus}
        containerStyle={Styles.search}
        inputStyle={Styles.searchInput}
        placeholder="Search..."
        textInputRef="textInputRef"
        placeholderTextColor={this.props.placeholderTextColor}
        value={this.state.searchKeyword}
        onChangeText={this.searchKeywordChanged}
      />
    </View>
  );
}

SearchBarWithDelay.propTypes = {
  searchKeyword: PropTypes.string,
  onSearchKeywordChanged: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  clearIconColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
};

SearchBarWithDelay.defaultProps = {
  searchKeyword: '',
  clearIconColor: 'white',
  placeholderTextColor: 'white',
};

export default SearchBarWithDelay;
