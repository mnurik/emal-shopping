import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem } from 'native-base';
import Proptypes from 'prop-types';
import { getGeneratedCodes } from './../utils/services';
import * as storage from './../utils/storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});

export default class Discounts extends Component {
  state = { codes: [] };

  componentDidMount() {
    storage.getItem('user').then(user => getGeneratedCodes(user.Id).then(codes => this.setState({ codes })));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>List</Title>
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
