import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

import Form from '../components/Form'

import * as db from '../utils/Firebase'
import { styles } from '../styles'

function PostScreen() {

    // const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

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

    const handleAddPost = async (data) => {
        // console.log(data)
        // console.log(db)

        const user_id = await getAuth()
        console.log('user id', user_id)

        // address, imgPath, latitude, longitude, numberTotal, userId, notes
        await db.addPost({ ...data, userId: user_id })
    }

    return (
        <ScrollView>
            <View style={styles.screenContainer}>
                <Form onAdd={handleAddPost} />
            </View>
        </ScrollView>


    );
}

export default PostScreen;