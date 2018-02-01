import React from 'react';
import { View, Text, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import Application from '../TaskListApp'
import MapView from '../components/MapView'
import TheHeader from '../components/Header'

const HomeScreen = () => (
  <View>
  <TheHeader/>
    <MapView/>
  </View>
);

const ProfileScreen = (navigation) => (
  <View>
    <TheHeader/>
    <Button
      onPress={() => navigation.navigate('DrawerToggle')}
      title="Open Drawer"
    />
    <Application/>
  </View>
);



const RootDrawer = DrawerNavigator({
  ble: {
    screen: ble,
    navigationOptions: {
      drawerLabel: 'ble',
      // drawerIcon: ({ tintColor, focused }) => (
      //   <Ionicons
      //     name={focused ? 'ios-home' : 'ios-home-outline'}
      //     size={26}
      //     style={{ color: tintColor }}
      //   />
      // ),
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      // drawerIcon: ({ tintColor, focused }) => (
      //   <Ionicons
      //     name={focused ? 'ios-home' : 'ios-home-outline'}
      //     size={26}
      //     style={{ color: tintColor }}
      //   />
      // ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootDrawer;