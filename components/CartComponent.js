import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

// redux
import { connect } from 'react-redux';
import { deleteCart } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        laptops: state.laptops,
        cart: state.cart
    }
};
const mapDispatchToProps = (dispatch) => ({
    deleteCart: (lapId) => dispatch(deleteCart(lapId))
});

class Cart extends Component {
    render() {
        if (this.props.laptops.isLoading) {
            return (<Loading />);
        } else if (this.props.laptops.errMess) {
            return (<Text>{this.props.laptops.errMess}</Text>);
        } else {
            const laptops = this.props.laptops.laptops.filter((lap) => this.props.cart.some((el) => el === lap.id));
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                <SwipeListView data={laptops}
                    renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                    renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
                    keyExtractor={(item) => item.id.toString()}
                    rightOpenValue={-100} />
                    </Animatable.View>
            );
        }
    }
    renderMenuItem(item, index) {
        const { navigate } = this.props.navigation;
        return (
            <ListItem key={index} onPress={() => navigate('Lapdetail', { lapId: item.id })}>
                <Avatar source={{ uri: baseUrl + item.image1 }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    renderHiddenItem(item, index) {
        return (
            <View style={{ alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, backgroundColor: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Delete Laptop?',
                            'Are you sure you wish to delete this lap: ' + item.name + '?',
                            [
                                { text: 'Cancel', onPress: () => { /* nothing */ } },
                                { text: 'OK', onPress: () => this.props.deleteCart(item.id) }
                            ]
                        );
                    }}>
                    <Text style={{ color: '#FFF' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);