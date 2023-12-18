import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';
import { getDatabase, ref, child, onValue } from 'firebase/database';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

class RenderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history1: '',
            history2: ''
        }
    }
    render() {
        if (this.props.isLoading) {
            return (
                <Card>
                    <Card.Title>Our History</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            );
        } else if (this.props.errMess) {
            return (
                <Card>
                    <Card.Title>Our History</Card.Title>
                    <Card.Divider />
                    <Text>{this.props.errMess}</Text>
                </Card>
            );
        } else return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Our History</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{this.state.history1}</Text>
                    <Text style={{ margin: 10 }}>{this.state.history2}</Text>
                </Card>
            </Animatable.View>
        );
    }
    componentDidMount() {
        const dbRef = ref(getDatabase());
        onValue(child(dbRef, 'history/'), (snapshot) => {
            const value = snapshot.val();
            this.setState({
                history1: value.history1,
                history2: value.history2,
            });
        });
    }
}
class RenderLeadership extends Component {
    render() {
        if (this.props.isLoading) {
            return (
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            );
        } else if (this.props.errMess) {
            return (
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <Text>{this.props.errMess}</Text>
                </Card>
            );
        } else {
            return (
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <FlatList data={this.props.leaders}
                        renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
                        keyExtractor={(item) => item.id.toString()} />
                </Card>
            );
        }
    }
    renderLeaderItem(item, index) {
        return (
            <ListItem key={index}>
                <Avatar rounded source={{ uri: baseUrl + item.image1 }} />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
}

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        leaders: state.leaders
    }
};

class About extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <RenderHistory />
                </Animatable.View>
                <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
                    <RenderLeadership
                        leaders={this.props.leaders.leaders}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess} />
                </Animatable.View>
            </ScrollView>
        );
    }

}
export default connect(mapStateToProps)(About);