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
            mapVisible: false,
            databaseSave: [],
            id: this.props.item.id,
            text: this.props.item.text || '',
            completed: this.props.item.completed || false,
            date: this.props.item.date,
            deadline: null,
             onPressMarker: {
        
             latitude: 48.3358,
             longitude: 14.321, 

        
            },
        };
    }
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
    onFirebaseSave(){
        this.setState({databaseSave: {id: this.state.id || uuid.v4(), text: this.state.text, completed: this.state.completed, date: this.onCreateDate() }})
    }
    

 
    onSaveItem (e) {
        e.preventDefault();
        if (this.props.onSaveItem !== null) {
           this.props.onSaveItem({ id: this.state.id || uuid.v4(), text: this.state.text, completed: this.state.completed, date: this.onCreateDate(), deadline: this.state.deadline });
           this.onFirebaseSave(); 
           
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

        const title = !this.state.id ? 'Add New Item' : 'Show Item';
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
                    placeholder="select date"
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
                        onValueChange={(value) => this.setState({ mapVisible: value })}
                        value={this.state.SavePosition} />
                        <Text style={styles.mapVisible}>Bitte</Text>
                        
                       
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
