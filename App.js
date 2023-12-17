import React, { Component } from 'react';
import Hello from './components/HelloComponent';
import Main from './components/MainComponent';
// redux
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();
import { initializeApp } from 'firebase/app';
const firebaseConfig = { databaseURL: "https://mobileapp-99e87-default-rtdb.asia-southeast1.firebasedatabase.app" };
initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;