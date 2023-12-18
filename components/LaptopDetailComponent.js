import React, { Component, useState } from 'react';
import { View, Text, FlatList, Modal, Button, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { SliderBox } from 'react-native-image-slider-box';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';


class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 12 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}

class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      author: '',
      comment: '',
    };
  }
  render() {
    return (
      <View>
        <View style={{ justifyContent: 'center', margin: 20 }}>
          <Rating startingValue={this.state.rating} showRating={true}
            onFinishRating={(value) => this.setState({ rating: value })} />
          <View style={{ height: 20 }} />
          <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
            onChangeText={(text) => this.setState({ author: text })} />
          <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
            onChangeText={(text) => this.setState({ comment: text })} />
          <View style={{ marginBottom: 20 }}>
            <Button title='SUBMIT' color='blue'
              onPress={() => this.handleSubmit()} />
          </View>
          <Button title='CANCEL' color='#BDBDBD'
            onPress={() => this.props.onPressCancel()} />
        </View>
      </View>
    );
  }
  handleSubmit() {
    this.props.postComment(this.props.lapId, this.state.rating, this.state.author, this.state.comment);
    this.props.onPressCancel();
  }
}

class RenderSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 0,
    };
  }
  render() {
    const images = [
      baseUrl + this.props.lap.image1,
      baseUrl + this.props.lap.image2,
      baseUrl + this.props.lap.image3
    ];
    return (
      <Card onLayout={this.onLayout}>
        <SliderBox images={images} parentWidth={this.state.width - 30} />
      </Card>
    );
  }
  onLayout = (evt) => {
    this.setState({
      width: evt.nativeEvent.layout.width,
      height: evt.nativeEvent.layout.height,
    });
  };
}

class RenderLap extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      else if (dx > 200) return 2; // left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add to cart',
            'Are you sure you wish to add ' + lap.name + ' to your cart?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.cart ? alert('Already existed in your cart') : this.props.onPressCart() } },
            ]
          );
        }
        else if (recognizeDrag(gestureState) === 2) {
          this.props.onPressComment();
        }
        return true;
      }
    });

    //render
    const lap = this.props.lap;
    if (lap != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Card.Title>{lap.name}</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>{lap.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse name={this.props.cart ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
              onPress={() => this.props.cart ? alert('Already existed in your cart') : this.props.onPressCart()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='blue'
              onPress={() => this.props.onPressComment()} />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    laptops: state.laptops,
    comments: state.comments,
    cart: state.cart
  }
};
import { postCart, postComment } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postCart: (lapId) => dispatch(postCart(lapId)),
  postComment: (lapId, rating, author, comment) => dispatch(postComment(lapId, rating, author, comment))

});

class Lapdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  render() {
    const lapId = parseInt(this.props.route.params.lapId);
    const lap = this.props.laptops.laptops[lapId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.lapId === lapId);
    const cart = this.props.cart.some((el) => el === lapId);

    return (
      <ScrollView>

        <Animatable.View animation='flipInY' duration={2000} delay={1000}>
          <RenderSlider lap={lap} />
        </Animatable.View>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderLap lap={lap} cart={cart} onPressCart={() => this.addtoCart(lapId)} onPressComment={() => this.setState({ showModal: true })} />
        </Animatable.View>
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
          <RenderComments comments={comments} />
        </Animatable.View>
        <Modal animationType={'slide'} visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ModalContent lapId={lapId}
            onPressCancel={() => this.setState({ showModal: false })} postComment={this.props.postComment} />
        </Modal>
      </ScrollView>

    );
  }
  addtoCart(lapId) {
    this.props.postCart(lapId);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lapdetail);