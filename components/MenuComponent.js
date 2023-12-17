import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    laptops: state.laptops
  }
};

class Menu extends Component {
  constructor(props) { //Hàm contrustor mà chỉ có super thì có thể xóa
    super(props);
  }
  render() {
    if (this.props.laptops.isLoading) {
      return (<Loading />);
    } else if (this.props.laptops.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const { category } = this.props.route.params || {}; // Lấy dữ liệu truyền từ `CategoryComponent`

      const filteredLaptops = this.props.laptops.laptops.filter(item => item.category === category);

      return (
        <FlatList
          data={filteredLaptops}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;

    return (
      <Animatable.View animation='fadeInRightBig' duration={2000} key={index}>
        <ListItem onPress={() => navigate('Lapdetail', { lapId: item.id })}>
          <Avatar source={{ uri: baseUrl + item.image1 }} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Animatable.View>
    );
  }
  // onlapSelect(item) {
  //   this.setState({ selectedlap: item });
}
export default connect(mapStateToProps)(Menu);