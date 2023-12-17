import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Menu from './MenuComponent';
import Lapdetail from './LaptopDetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent'
import Contact from './ContactComponent'
import Order from './OrderComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Category from './CategoryComponent';

// redux
import { connect } from 'react-redux';
import { fetchLeaders, fetchLaptops, fetchComments, fetchPromos, logoutUser } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchLaptops: () => dispatch(fetchLaptops()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};

function TabNavigatorScreen() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName='Login'>
      <TabNavigator.Screen name='Login' component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={color} />)
        }} />
      <TabNavigator.Screen name='Register' component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='user-plus' type='font-awesome' size={size} color={color} />)
        }} />
    </TabNavigator.Navigator>
  );
}

function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator initialRouteName='LoginRegister'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <LoginNavigator.Screen name='LoginRegister' component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </LoginNavigator.Navigator>
  );
}

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <MenuNavigator.Screen name='Menu' component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Lapdetail' component={Lapdetail}
        options={{
          headerTitle: 'Lap Detail'
        }} />
    </MenuNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About' component={About}
        options={({ navigation }) => ({
          headerTitle: 'About',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

function OrderNavigatorScreen() {
  const OrderNavigator = createStackNavigator();
  return (
    <OrderNavigator.Navigator initialRouteName='Order'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <OrderNavigator.Screen name='Order' component={Order}
        options={({ navigation }) => ({
          headerTitle: 'Pre Order',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </OrderNavigator.Navigator>
  );
}

function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'My Favorites',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <FavoritesNavigator.Screen name='Lapdetail' component={Lapdetail}
        options={{ headerTitle: 'Lap Detail' }} />
    </FavoritesNavigator.Navigator>
  );
}

function CategoryNavigatorScreen() {
  const CategoryNavigator = createStackNavigator();
  return (
    <CategoryNavigator.Navigator
      initialRouteName='Category'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <CategoryNavigator.Screen name='Category' component={Category}
        options={({ navigation }) => ({
          headerTitle: 'Category',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <CategoryNavigator.Screen name='Menu' component={Menu}
        options={{ headerTitle: 'Menu' }} />
    </CategoryNavigator.Navigator>
  );
}


function CustomDrawerContent(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: baseUrl + 'images/batman.png' }} style={{ margin: 10, width: 80, height: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>HaiTH</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      {/* <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} /> */}
      {
        users.logged === false
          ? (<DrawerItem label='Help' icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />} onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />)
          : (<DrawerItem label={'[' + users.userinfo.username + '] Logout'} icon={({ focused, color, size }) => <Icon name='sign-out' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />} onPress={() => { logoutUser(); props.navigation.navigate('HomeScreen'); }} />)
      }
    </DrawerContentScrollView>
  );
}

function MainNavigatorScreen(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} users={users} logoutUser={logoutUser} />}>
      {
        users.logged === false
          ? (<MainNavigator.Screen name='LoginScreen' component={LoginNavigatorScreen}
            options={{
              title: 'Login', headerShown: false,
              drawerIcon: ({ focused, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
            }} />)
          : null
      }
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
        <MainNavigator.Screen name='CategoryScreen' component={CategoryNavigatorScreen}
        options={{
          title: 'Category', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      {/* <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen}
        options={{
          title: 'Menu', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} /> */}
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      {
        users.logged === true
          ? (<MainNavigator.Screen name='OrderScreen' component={OrderNavigatorScreen}
            options={{
              title: 'Pre Order', headerShown: false,
              drawerIcon: ({ focused, size }) => (<Icon name='cutlery' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
            }} />)
          : null
      }
      <MainNavigator.Screen name='FavoritesScreen' component={FavoritesNavigatorScreen}
        options={{
          title: 'My Favorites', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen users={this.props.users} logoutUser={this.props.logoutUser} />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchLaptops();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);