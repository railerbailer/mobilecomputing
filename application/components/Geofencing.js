import React, { Component } from 'react';
import {
  NativeAppEventEmitter,
} from 'react-native';
import RNGeofence from 'react-native-geo-fence';
import _ from 'lodash';
 
 
export default class Home extends Component {
 
  componentDidMount() {
    // trigger geofencing 
    this.initiateGeofencing();
    // listen to native "GeofenceEvent" event triggered by "react-native-geo-fence" 
    this.listeners = [
      NativeAppEventEmitter.addListener('GeofenceEvent', this.handleNativeEvents),
    ];
  }
 
  componentWillUnmount() {
    // stop geofencing 
    RNGeofence.stopGeofencing();
    // remove listener 
    _.each(this.listeners, l => l.remove());
  }
 
  handleNativeEvents = (event) => {
    /*
    * event contains an object as below
    *
    * {
    *   event: 'geofenceTrigger',
    *   data: [{
    *     transition: 'Entered', // transition is either "Entered" or "Exited" explains if user entered or exited geofence
    *     key: 'qyuwhbhh783',
    *     latitude: 6.4334191,
    *     longitude: 3.4345843,
    *   }]
    * }
    *
    * data contains an array of geofences triggered.
    * It is always an array, even if only one geofence was triggered
    *
    * */
 
    console.log('Native Event: ', event);
 
    // do something else with event object and geofences 
  };
 
  initiateGeofencing = () => {
    // create an array of geofences you want to get notified for as below 
    const geofencesArray = [{
      key: 'qyuwhbhh783', // must be unique, used internally to return unique geofence 
      latitude: 6.4334191,
      longitude: 3.4345843,
    }, {
      key: '6273hbbvdhbf',
      latitude: 34.8372645,
      longitude: 19.763423,
    }, {
      key: 'hjd09283745',
      latitude: 12.2519453,
      longitude: 9.8125365,
    }];
 
    // create radius and expiry time 
    const geofenceRadiusInMetres = 500; // geofence radius 
    const geofenceExpirationInMilliseconds = 86400000; // geofence expiration time 
 
    // add geofences array to module 
    RNGeofence.populateGeofenceList(
      geofencesArray,
      geofenceRadiusInMetres,
      geofenceExpirationInMilliseconds,
    );
 
    // start tracking geofences 
    RNGeofence.beginGeofencing();
    console.log(RNGeofence.beginGeofencing())
  };
 
  render() {
    return null;
  }
}