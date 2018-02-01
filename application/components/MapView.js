import React, { Component } from 'react';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import {View, Text, Alert} from 'react-native'
import TheHeader from './Header'

class TheMap extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
     
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
render(){
	return(
		<View>
		<View style={{height: 50}}><Text style={{color: '#00c07f',
      fontSize: 18,
      padding: 26,}}>See your saved locations for notes</Text></View>
<MapView 
                  
                  
                  style={{ flex: 1, width: "100%", minHeight: 450, }}
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
         
            </MapView>
            </View>

)}


}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.tasks
    };
}

export default connect(mapStateToProps)(TheMap);