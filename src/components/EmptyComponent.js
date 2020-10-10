import React from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

import { styles } from '../styles'

const EmptyComponent = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
            <Text style={{ color: '#aaa', fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 40 }}>
                Your reports will be listed here
                </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Sightings")}>
                <View style={{ textAlign: 'center', paddingHorizontal: 20 }}>
                    <Text style={[styles.buttonText]}>Submit a report</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyComponent