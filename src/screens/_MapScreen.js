import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Card from '../components/Card'

import * as db from '../utils/Firebase'
import { styles } from '../styles'

function MapScreen({ navigation }) {

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
            console.log('posts', posts)
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

    // useEffect(() => {
    //     console.log('view map')
    //     const subscriber = firestore()
    //         .collection('reports')
    //         .onSnapshot(querySnapshot => {
    //             const data = [];

    //             querySnapshot.forEach(documentSnapshot => {
    //                 // console.log(documentSnapshot.data(), documentSnapshot.id)
    //                 data.push({
    //                     ...documentSnapshot.data(),
    //                     key: documentSnapshot.id,
    //                 });
    //             });
    //             console.log(data)
    //             setMarkers(data);
    //             setLoading(false);
    //         });

    //     // Unsubscribe from events when no longer in use
    //     return () => subscriber();
    // }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Map</Text>
            <MapView
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {markers.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: report.lat, longitude: report.lon }}
                        title={report.title}
                        description={report.comments}
                    >
                    </Marker >
                ))}
            </MapView>
        </View>
    )

}

export default MapScreen