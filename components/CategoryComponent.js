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

class Category extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.laptops.isLoading) {
      return <Loading />;
    } else if (this.props.laptops.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      // Lọc giá trị duy nhất của category
      const uniqueCategories = [...new Set(this.props.laptops.laptops.map(item => item.category))];
  
      return (
        <FlatList
          data={uniqueCategories}
          renderItem={({ item }) => this.renderCategoryItem(item)}
          keyExtractor={(item) => item}
        />
      );
    }
  }

  renderCategoryItem(category) {
    const { navigate } = this.props.navigation;
    const laptopsForCategory = this.props.laptops.laptops.filter(item => item.category === category);
    const laptopToShow = laptopsForCategory[0];
    return (
      <Animatable.View animation='fadeInRightBig' duration={2000} key={category}>
        <ListItem onPress={() => navigate('Menu', { category })}>
          <Avatar source={{ uri: baseUrl + laptopToShow.category_logo }} />
          <ListItem.Title>{laptopToShow.category}</ListItem.Title>
        </ListItem>
      </Animatable.View>
    );
  }
}

export default connect(mapStateToProps)(Category);