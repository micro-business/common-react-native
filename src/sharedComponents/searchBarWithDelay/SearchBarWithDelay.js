// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import debounce from 'lodash.debounce';
import Styles from './Styles';

class SearchBarWithDelay extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchKeyword: props.searchKeyword,
    };

    const { onSearchKeywordChanged } = props;

    this.onSearchKeywordChanged = debounce(onSearchKeywordChanged, 300);
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      searchKeyword: nextProps.searchKeyword,
    };
  }

  searchKeywordChanged = searchKeyword => {
    this.setState(
      {
        searchKeyword,
      },
      () => this.onSearchKeywordChanged(searchKeyword),
    );
  };

  render = () => {
    const { clearIconColor, autoFocus, placeholderTextColor } = this.props;
    const { searchKeyword } = this.state;

    return (
      <View style={Styles.container}>
        <SearchBar
          clearIcon={{ color: clearIconColor }}
          lightTheme
          noIcon
          autoFocus={autoFocus}
          containerStyle={Styles.search}
          inputStyle={Styles.searchInput}
          placeholder="Search..."
          textInputRef="textInputRef"
          placeholderTextColor={placeholderTextColor}
          value={searchKeyword}
          onChangeText={this.searchKeywordChanged}
        />
      </View>
    );
  };
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
