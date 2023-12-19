import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class ModalContent extends Component {
  render() {
    return (
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Your Order</Text>
        <Text style={styles.modalText}>Laptop: {this.props.selectedLaptop ? this.props.selectedLaptop.name : 'Not selected'}</Text>
        <Text style={styles.modalText}>Date and Time: {format(this.props.date, 'dd/MM/yyyy - HH:mm')}</Text>
        <Button title='Close' color='#7cc' onPress={() => this.props.onPressClose()} />
      </View>
    );
  }
}

//redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    laptops: state.laptops
  };
};

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 0, // Set it as a number
      date: new Date(),
      showDatePicker: false,
      showModal: false,
      selectedLaptop: null, // Add this line
    };
  }
  render() {
    const { laptops } = this.props;
    return (
      <ScrollView>
        <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Choose your laptop</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(value, index) => {
                const selectedLaptop = laptops.laptops[index];
                this.setState({ guests: value, selectedLaptop }, () => {
                  // Show an alert when the user selects a laptop
                  if (selectedLaptop) {
                    Alert.alert('Laptop Selected', `You chose ${selectedLaptop.name}`);
                  }
                });
              }}
            >
              {/* Add an empty item as the first option */}
              <Picker.Item label="Choose a laptop" value="" />

              {/* Map through the laptops */}
              {laptops.laptops.map((lap) => (
                <Picker.Item key={lap.id} label={lap.name} value={lap.id.toString()} />
              ))}
            </Picker>
          </View>

          {/* <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/No-Smoking?</Text>
            <Switch style={styles.formItem} value={this.state.smoking} onValueChange={(value) => this.setState({ smoking: value })} />
          </View> */}
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Time to get</Text>
            <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
            <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy - HH:mm')}</Text>
            <DateTimePickerModal mode='datetime' isVisible={this.state.showDatePicker}
              onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
              onCancel={() => this.setState({ showDatePicker: false })} />
          </View>
          <View style={styles.formRow}>
            <Button title='Order' color='#7cc' onPress={() => this.handleOrder()} />
          </View>
          <Modal animationType={'slide'} visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}>
            <ModalContent
              selectedLaptop={this.state.selectedLaptop} // Pass the selectedLaptop prop
              date={this.state.date}
              onPressClose={() => this.setState({ showModal: false })}
            />
          </Modal>
        </Animatable.View>

      </ScrollView>
    );
  }
  handleOrder() {
    const { selectedLaptop, date } = this.state;
  
    if (!selectedLaptop) {
      Alert.alert('Please Select a Laptop', 'You must choose a laptop before placing an order.');
      return;
    }
  
    Alert.alert(
      'Your Order OK?',
      `${selectedLaptop.name}\nTime to get: ${date.toISOString()}`,
      [
        { text: 'Cancel', onPress: () => this.resetForm() },
        {
          text: 'OK',
          onPress: () => {
            this.addOrderToCalendar(this.state.date);
            this.presentLocalNotification(date);
            this.resetForm();
          },
        },
      ]
    );
  }
  
  async presentLocalNotification(date) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Your Order',
          body: 'Order for ' + date + ' requested',
          sound: true,
          vibrate: true
        },
        trigger: null
      });
    }
  }
  async addOrderToCalendar(date) {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
        const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        const eventId = await Calendar.createEventAsync(newCalendarID, {
            title: 'Pre Order',
            startDate: date,
            endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000),
            timeZone: 'Asia/Viet_Nam',
            location: '227/55 Pham Dang Giang, Binh Hung Hoa, Binh Tan, Ho Chi Minh, Viet Nam'
        });
        alert('Your new event ID is: ' + eventId);
    }
}
  resetForm() {
    this.setState({
      guests: 0,
      date: new Date(),
      showDatePicker: false
    });
  }
}
export default connect(mapStateToProps)(Order);

const styles = StyleSheet.create({
  formRow: { alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', margin: 20 },
  formLabel: { fontSize: 18, flex: 2 },
  formItem: { flex: 1 },
  modal: { justifyContent: 'center', margin: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', backgroundColor: '#7cc', textAlign: 'center', color: 'white', marginBottom: 20 },
  modalText: { fontSize: 18, margin: 10 }
});