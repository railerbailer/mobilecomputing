import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View, CheckBox } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'; // ES6
import Tester from './Test';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#00c07f',
        backgroundColor: 'white'
    },

    textcontainer: {
        maxWidth: '90%',
        padding: 20,
    },

    cbcontainer: {
        width: '10%',
    },

    itemtext: {
        fontSize: 12,
        color: 'black'
    },

    idtext: {
        fontSize: 6,
        color: '#808080'
    },

    completed: {
        textDecorationLine: 'line-through'
    }
});

class TaskListItem extends Component {
    constructor (props) {
        super(props);
    }

    get item () {
        return this.props.item;
    }

    // get icon () {
    //     const platform = Platform.OS === 'ios' ? 'ios' : 'md';
    //     const iconName = this.item.completed ? `${platform}-checkbox` : `${platform}-square-outline`;
    //     const iconColor = this.item.completed ? 'green' : 'black';
    //     return <Icon name={iconName} color={iconColor} size={20} style={{marginRight: 8}} />;
    // }

    onCompleteItem (e) {
        e.preventDefault();
        if (this.props.onCompleteItem !== null) {
            this.props.onCompleteItem(this.item.id, !this.item.completed);
        }
    }

    onSelectItem (e) {
        e.preventDefault();
        if (this.props.onSelectItem !== null) {
            this.props.onSelectItem(this.item.id);
        }
    }

    render () {
        return (
            <View style={styles.container}>

                <View style={styles.textcontainer}>
                
                    <TouchableHighlight onPress={(e) => this.onSelectItem(e)}>
                        <Text style={[styles.itemtext, this.item.completed && styles.completed]}>{this.item.text}</Text>
                    </TouchableHighlight>
                    <Text style={styles.idtext}>Deadline:{JSON.stringify(this.item.deadline)}</Text>
                    {/*<Text style={styles.idtext}>{this.item.id}</Text>*/}
                </View>
                <View style={styles.cbcontainer}>

                     <CheckBox value={this.item.completed} onChange={(e) => this.onCompleteItem(e)}/>
                    {/*<TouchableHighlight onPress={(e) => this.onCompleteItem(e)}>{this.icon}</TouchableHighlight>*/}
                </View>
            </View>
        );
    }
}

TaskListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    onCompleteItem: PropTypes.func,
    onSelectItem: PropTypes.func
};

TaskListItem.defaultProps = {
    onCompleteItem: null,
    onSelectItem: null
};

export default TaskListItem;
