import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

const OverviewScreen = () => (
  <View style={styles.tab}>
    <Text></Text>
  </View>
); 
 
const NotesScreen = () => (
  <View>
  	<Text></Text>
  </View>
);   

const RemindersScreen = () => (
  <View style={styles.tab}>
    <Text></Text>
  </View>
);


export const RootTabs = TabNavigator({ 
  Overview: {
    screen: OverviewScreen,
  },
  Notes: {
    screen: NotesScreen,
  },
  Reminders: {
    screen: RemindersScreen,

  }

},

{
  
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    showIcon: true,
});


const styles = StyleSheet.create({
  tab:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});
export default RootTabs;

