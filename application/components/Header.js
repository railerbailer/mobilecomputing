import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
const styles = StyleSheet.create({
  header:{
      backgroundColor: '#00c07f',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd',

  },
  headerText:{
      color: 'white',
      fontSize: 18,
      padding: 26,

  },

});

export default class Header extends Component{
  render(){
    return(

            <View style={styles.header}>

        <Text style={styles.headerText}>WillDo</Text>

      </View>



    )
  }
}






