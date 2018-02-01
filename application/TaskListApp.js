import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Alert, Modal, StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as taskActions from './redux/actions/tasks';
import ViewItem from './components/ViewItem';
import TaskList from './components/TaskList';
import { PermissionsAndroid, ScrollView, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';
import geo from './components/Geofencing'

import TabNav from './navigation/TabNavigator'

import TheHeader from './components/Header'

class Application extends Component {
  constructor (props) {
    super(props);
    this.ref = firebase.firestore()
    this.state = {
      modalVisible: false,
      modalItem: {},
      mapVisible: true,
      watcherPosition: {
        
             latitude: 48.3358,
             longitude: 14.321, 
            },
     



    }
  }
    componentWillMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          watcherPosition:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          } ,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    
  }

// componentWillMount(){
//   this.ref.collection("todos").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
//   });
// }

geofencing(currentPosLat, WatcherPosLat, currentPosLong, WatcherPosLong, message){
      let PlusWatcherPosLat = WatcherPosLat+0.001
      let MinusWatcherPosLat = WatcherPosLat-0.001

      let PlusWatcherPosLong = WatcherPosLong+0.001
      let MinusWatcherPosLong = WatcherPosLong-0.001

      console.log(currentPosLat, PlusWatcherPosLat)
      console.log(currentPosLat, MinusWatcherPosLat)
      console.log(currentPosLong, PlusWatcherPosLong)
      console.log(currentPosLong, MinusWatcherPosLong)
       if(currentPosLat<=PlusWatcherPosLat&&
          currentPosLat>=MinusWatcherPosLat&&

        currentPosLong<=PlusWatcherPosLong&&
        currentPosLong>=MinusWatcherPosLong){
      console.log('SUCCESS')
      Alert.alert("Your position is close to: ", message)

              
      }
      else{
        console.log('ERROR',WatcherPosLat, currentPosLat )
      }
    }

  onSaveItem (item) {
      this.props.saveItem(item);
      this.setState({ modalVisible: false });
  }

  onDeleteItem (id) {
      this.props.deleteItem(id);
  }

  onCompleteItem (id, flag) {
      this.props.completeItem(id, flag);
  }

  onSelectItem (id) {
    this.setState({
      modalItem: this.props.items.find(item => item.id === id),
      modalVisible: true
    });
  }

  render() {



    return (


      <ScrollView >
      {/*<TabNav/>*/}

      
      

      <Text>{this.state.longitude}</Text>
        <Modal presentationStyle="pageSheet" animationType="fade" transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
          <ViewItem
            currentPosition={this.state.watcherPosition}
            allItems={this.props.items}
            item={this.state.modalItem}
            onSaveItem={(item) => this.onSaveItem(item)}
            onCancel={() => this.setState({ modalVisible: false })} />
        </Modal>

        <TaskList
          items={this.props.items}
          onCompleteItem={(id, flag) => this.onCompleteItem(id, flag)}
          onDeleteItem={(id) => this.onDeleteItem(id)}
          onSelectItem={(id) => this.onSelectItem(id)}/>
          <Text>{JSON.stringify(this.state.date)}</Text>
        <ActionButton
        style={{position: 'absolute', bottom: 20}}
          buttonColor="#00c07f"
          onPress={() => this.setState({ modalItem: { id: null, text: '', completed: false }, modalVisible: true })} />
       


    {/*   <MapView 
                  
                  
                  style={{ flex: 1, width: "100%", minHeight: 300 }}
                  region={{
                  latitude: this.state.watcherPosition.latitude,
                  longitude: this.state.watcherPosition.longitude,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}>

                {this.props.items.map((marker, key) => (
              

                    <MapView.Marker 
                      key={key}
                      coordinate={marker.position}
                      title={marker.text}
                    />
                  

                ))}
                {this.props.items.map((marker, key) => (
                this.geofencing(this.state.watcherPosition.latitude, 
                                marker.position.latitude, 
                                this.state.watcherPosition.longitude, 
                                marker.position.longitude,
                                marker.text)
                ))}
         
            </MapView>*/}



      </ScrollView>
    );
  }
}

Application.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })).isRequired,
    saveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    completeItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: '#F5FCFF',
    // marginTop: 22
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.tasks
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveItem: (item) => { dispatch(taskActions.saveItem(item)); },
        deleteItem: (id) => { dispatch(taskActions.deleteItem(id)); },
        completeItem: (id, flag) => { dispatch(taskActions.completeItem(id, flag)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
