import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, TouchableHighlight} from 'react-native';
import { DrawerNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Ionicons from 'react-native-vector-icons/Ionicons'; // Supported builtin module
import Application from '../TaskListApp'
import MapView from '../components/MapView'
import TheHeader from '../components/Header'
import Pic from '../drawerMenu.png'

const styles = StyleSheet.create({
  header:{
      backgroundColor: '#00c07f',
      alignItems: 'center',
      justifyContent: 'center',

  },
  headerText:{
      color: 'white',
      fontSize: 18,
      padding: 26,

  },

});

const HomeScreen = ({navigation}) => (
	  <View >
  <View style={styles.header}>

<TouchableHighlight 
	style={{position: 'absolute', left: 10}}
		
      onPress={() => navigation.navigate('DrawerToggle')}
      
    >
    <Image style={{width: 30, height: 30}} source={Pic}/>
    </TouchableHighlight>
    
        <Text style={styles.headerText}>WillDo</Text>

      </View>

    <Application/>
  </View>
);

const ProfileScreen = ({navigation}) => (
  	  <View>
  <View style={styles.header}>

<TouchableHighlight 
	style={{position: 'absolute', left: 10}}
		
      onPress={() => navigation.navigate('DrawerToggle')}
      
    >
    <Image style={{width: 30, height: 30}} source={Pic}/>
    </TouchableHighlight>
    
        <Text style={styles.headerText}>WillDo</Text>

      </View>
    <MapView/>
  </View>
   
    
    
  
);



const RootDrawer = DrawerNavigator({
  // ble: {
  //   screen: ble,
  //   navigationOptions: {
  //     drawerLabel: 'ble',
  //     // drawerIcon: ({ tintColor, focused }) => (
  //     //   <Ionicons
  //     //     name={focused ? 'ios-home' : 'ios-home-outline'}
  //     //     size={26}
  //     //     style={{ color: tintColor }}
  //     //   />
  //     // ),
  //   },
  // },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Notes',
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
      drawerLabel: 'Map',
      // drawerIcon: ({ tintColor, focused }) => (
      //   <Ionicons
      //     name={focused ? 'ios-person' : 'ios-person-outline'}
      //     size={26}
      //     style={{ color: tintColor }}
      //   />
      // ),
    },
  },
});

export default RootDrawer;