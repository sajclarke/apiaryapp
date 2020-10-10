import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import * as db from '../utils/Firebase'
import { styles } from '../styles'

function Map({ navigation }) {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [isRefreshing, setRefreshing] = useState(false); // Set loading to true on component mount
    const [markers, setMarkers] = useState([]); // Initial empty array of users

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('view map')
            // do something
            fetchPosts()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        // fetchPosts()
    }, []);

    const fetchPosts = async () => {

        setLoading(true)
        const user_id = await getAuth()
        console.log('map:user id', user_id)

        try {
            const posts = await db.getPosts(user_id)
            console.log('markers', posts)
            // this.setState({ DATA: posts, isRefreshing: false })
            setMarkers(posts);
            setLoading(false)
        } catch (e) {
            console.error(e)
        }
    }

    const getAuth = async () => {
        try {
            let value = await AsyncStorage.getItem('@auth_id')
            if (value === null) {
                // value not previously stored
                const user_id = uuidv4()
                await AsyncStorage.setItem('@auth_id', user_id)
                value = await AsyncStorage.getItem('@auth_id')
            }

            return value
        } catch (e) {
            // error reading value
            console.error(e)
        }
    }

    if (loading) {
        return <ActivityIndicator />;
    }



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MapView
                style={styles.map}
                region={{
                    latitude: markers.length > 0 ? markers[0]?.latitude : 37.78825,
                    longitude: markers.length > 0 ? markers[0]?.longitude : -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {markers?.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        title={item.text}
                        description={item.notes}
                    >
                    </Marker >
                ))}
            </MapView>
        </View>
    );
}

export default Map