import React, { Component } from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import * as uuid from 'uuid';
import PropTypes from 'prop-types'; // ES6
import DatePicker from 'react-native-datepicker'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textinput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        margin: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 0,
        paddingBottom: 0
    },
    completed: {
        flexDirection: 'row',
        
        alignItems: 'center'
    },
    completedtext: {
        fontSize: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 24
    }
});

class ViewItem extends Component {
    constructor (props) {
        super(props);

        this.state = {
            mapVisible: this.props.item.mapVisible || false ,
            id: this.props.item.id,
            text: this.props.item.text || '',
            completed: this.props.item.completed || false,
            date: this.props.item.date,
            deadline: null,
           
            position: {
        
             latitude:  0,
             longitude: 0, 
            }, 
            pushNotification: false,
            
        };
    }
  //   componentWillMount() {
  //   this.watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       this.setState({
  //         watcherPosition:{
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         } ,
  //         error: null,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
  //   );
  // }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }
   
    geofencing(currentPosLat, WatcherPosLat, currentPosLong, WatcherPosLong){
      let PlusWatcherPosLat = WatcherPosLat+0.005
      let MinusWatcherPosLat = WatcherPosLat-0.005

      let PlusWatcherPosLong = WatcherPosLong+0.005
      let MinusWatcherPosLong = WatcherPosLong-0.005

      console.log(currentPosLat, PlusWatcherPosLat)
      console.log(currentPosLat, MinusWatcherPosLat)
      console.log(currentPosLong, PlusWatcherPosLong)
      console.log(currentPosLong, MinusWatcherPosLong)
       if(currentPosLat<=PlusWatcherPosLat&&
          currentPosLat>=MinusWatcherPosLat&&

        currentPosLong<=PlusWatcherPosLong&&
        currentPosLong>=MinusWatcherPosLong){
        console.log('SUCCESS')
      alert('yolo', 'yo')
      }
      else{
        console.log('ERROR',WatcherPosLat, currentPosLat )
      }
    }
      

 
    onSaveItem (e) {
        e.preventDefault();
        if (this.props.onSaveItem !== null) {
           this.props.onSaveItem({ 
                id: this.state.id || uuid.v4(), 
                text: this.state.text, 
                completed: this.state.completed, 
                date: this.onCreateDate(), 
                deadline: this.state.deadline, 
                position: this.state.position, 
                mapVisible: this.state.mapVisible,
                pushNotification: this.state.pushNotification,
            });
           
        }
    }

    onCancel (e) {
        e.preventDefault();
        if (this.props.onCancel !== null) {
            this.props.onCancel();
        }
    }
// skapad av mig
    onCreateDate(){
        
        let d = new Date()
        return(d);
        
    }
  

    render () {
      console.log('HEJHOPP',this.props.currentPosition.latitude)
      console.log(this.props.currentPosition.latitude, this.state.position.latitude)
      console.log(this.props.currentPosition.longitude, this.state.position.longitude)
      this.geofencing(this.props.currentPosition.latitude, this.state.position.latitude, this.props.currentPosition.longitude, this.state.position.longitude)
                
        const title = !this.state.id ? 'Add New Item' : 'Edit Item';
        return (
            <View>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ text: text })}
                    placeholder="Enter Task"
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    autoFocus={true}
                    keyboardType="default"
                    maxLength={500}
                    value={this.state.text}
                    style={styles.textinput} />
                  <View style={styles.completed}>
                  
                  <DatePicker
                    style={{width: 140}}
                    date={this.state.deadline}
                    mode="datetime"
                    placeholder="select deadline"
                    format="YYYY-MM-DD"
                    minDate={new Date()}
                    maxDate="2028-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({deadline: date})}}
                  />

                  </View>
                   
                <View style={styles.completed}>
                    
                    <Switch
                        onTintColor='green'
                        onValueChange={(value) => this.setState({ completed: value })}
                        value={this.state.completed} />
                        <Text style={styles.completedtext}>Completed?</Text>

                       
                </View>
                <View style={styles.completed}>
                     <Switch
                        onTintColor='green'
                        onValueChange={(value) => this.setState({ pushNotification: value })}
                        value={this.state.pushNotification} />
                        <Text style={styles.completedtext}>Add a push reminder</Text>
                </View>
                <View style={styles.completed}>
                    <Switch
                        onTintColor='green'
                        onValueChange={(value) => this.setState({ mapVisible: value })}
                        value={this.state.mapVisible} />
                        <Text style={styles.completedtext}>Add a location reminder</Text>
                 
                       
                </View>
                <View style={styles.buttons}>
                
                    <Button
                        title="SUBMIT"

                        onPress={(e) => this.onSaveItem(e)}/>
                    <Button
                        color='#888888'
                        title="Cancel"
                        onPress={(e) => this.onCancel(e)}/>
                </View>
                
            </View>
            {this.state.mapVisible ? 
            <MapView 
                  
                  onPress={e => this.setState({position: e.nativeEvent.coordinate})}
                  style={{ flex: 1, width: "100%", minHeight: 300 }}
                  region={{
                  latitude: this.props.currentPosition.latitude,
                  longitude: this.props.currentPosition.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}>

                {this.props.allItems.map((marker, key) => (
                  
                    <MapView.Marker 
                      key={key}
                      coordinate={marker.position}
                      // onPress={e => this.setState({position: e.nativeEvent.coordinate})}
                      title={marker.text}
                    />
                  

                ))}
                    <MapView.Marker
                    coordinate={{
                  latitude: this.state.position.latitude,
                  longitude:this.state.position.longitude,}}
                    >
                      
                    </MapView.Marker>
                  <MapView.Circle 
                center={{
                  latitude: this.state.position.latitude,
                  longitude:this.state.position.longitude,}}

                  strokeWidth={2}
                  strokeColor='red'
                  radius={150}
                  fill='red'
                >
                </MapView.Circle>
              

                 

    </MapView>
    : null}
            </View>
        );
    }
}

ViewItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        completed: PropTypes.bool
    }),
    onSaveItem: PropTypes.func,
    onCancel: PropTypes.func
};

ViewItem.defaultProps = {
    item: {},
    onSaveItem: null,
    onCancel: null
};

export default ViewItem;
