import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Form from '../components/Form';

const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Details</Text>
            <Form />
        </View>
    )
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
        // alignContent: "right",
        // paddingHorizontal: 10
        // justifyContent: "center"
    },
    sectionText: {
        color: "#333",
        fontSize: 18,
        lineHeight: 24,
        // fontWeight: 'bold',
        // flex: 1,
        // flexWrap: 'wrap',
        // textTransform: "uppercase",
        paddingTop: 10

        // marginBottom: 10
    },
    topView: {

        width: '100%',
        height: 50,
        marginVertical: 10,
        backgroundColor: '#eee',
        borderColor: '#eee',
        borderWidth: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    bottomView: {

        width: '100%',
        height: 50,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },

    textStyle: {

        color: '#fff',
        fontSize: 22
    }
});