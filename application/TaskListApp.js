import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Alert, Modal, StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as taskActions from './redux/actions/tasks';
import ViewItem from './components/ViewItem';
import TaskList from './components/TaskList';
import { PermissionsAndroid, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';

class Application extends Component {
  constructor (props) {
    super(props);
    this.ref = firebase.firestore()
    this.state = {
      modalVisible: false,
      modalItem: {},
      mapVisible: true,
      
      onPressMarker: {
        
         latitude: 48.3358,
         longitude: 14.321, 

        
      },



    }
  }


// componentWillMount(){
//   this.ref.collection("todos").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
//   });
// }
componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          onPressMarker:{
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
    navigator.geolocation.clearWatch(this.watchId);
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

console.log('onPressMarker',this.state.onPressMarker.latitude)

    return (
      <View style={styles.container}>
      <MapView 
      onPress={e => this.setState({onPressMarker: e.nativeEvent.coordinate})}
      style={{ flex: 1, width: "100%" }}
      region={{
      latitude: this.state.onPressMarker.latitude,
      longitude: this.state.onPressMarker.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    }}>
{/*  <MapView.Marker
    
    title={'yolo'}
      coordinate={{
        latitude: this.state.onPressMarker.latitude,
      longitude: this.state.onPressMarker.longitude,
      }}
    />*/}
    {this.state.mapVisible ? 
    <MapView.Circle 
    center={{
      latitude: this.state.onPressMarker.latitude,
      longitude:this.state.onPressMarker.longitude,}}
      strokeWidth={2}
      strokeColor='red'
      radius={150}
      fill='red'
    >
    </MapView.Circle>

     : null}

    </MapView>
      
      
      

      <Text>{this.state.longitude}</Text>
        <Modal presentationStyle="pageSheet" animationType="fade" transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
          <ViewItem
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
          buttonColor="#9b59b6"
          onPress={() => this.setState({ modalItem: { id: null, text: '', completed: false }, modalVisible: true })} />
      
      </View>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    marginTop: 22
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
