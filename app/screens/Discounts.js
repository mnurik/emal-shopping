import React, { Component } from 'react';
import { Container, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';

import styles from './../style/index';
import Header from './../components/Header/Header';
import { getGeneratedCodes } from './../utils/services';
import { getItem as getFromStorage } from './../utils/storage';

export default class Discounts extends Component {
  state = { codes: [] };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    getFromStorage('user').then(user => getGeneratedCodes(user.Id).then(codes => this.setState({ codes })));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={styles.whiteFont} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.whiteFont}>Discount List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={this.state.codes}
            renderRow={item => (
              <ListItem>
                <Body>
                  <Text>{item.Code}</Text>
                  <Text numberOfLines={1} note>
                    {item.SupplierName}
                  </Text>
                  <Text numberOfLines={1} note>
                    {item.SupplierProductName}
                  </Text>
                </Body>
                <Right>
                  <Text note>{item.CreateDate.split('T')[0]}</Text>
                  <Text note>{item.EndDate.split('T')[0]}</Text>
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
