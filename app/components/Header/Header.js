import React from 'react';
import PropTypes from 'prop-types';
import styles from './../../style/index';
import { View } from 'react-native';
import { Left, Button, Icon, Body, Title, Right, Header } from 'native-base';

const SubHeading = ({ navigation, title = '' }) => [
  <Left key="left">
    <Button transparent onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" style={styles.whiteFont} />
    </Button>
  </Left>,
  <Body key="body">
    <Title style={styles.whiteFont}>{title}</Title>
  </Body>,
  <Right key="right" />
];

SubHeading.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  title: PropTypes.string
};

export default ({ children, ...rest }) => (
  <Header style={styles.header} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
    {children ? children : <SubHeading {...rest} />}
  </Header>
);
