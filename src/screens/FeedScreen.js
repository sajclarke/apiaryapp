import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Card from '../components/Card'
import EmptyComponent from '../components/EmptyComponent'

import * as db from '../utils/Firebase'
import { styles } from '../styles'

function FeedScreen({ navigation }) {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [isRefreshing, setRefreshing] = useState(false); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            fetchPosts()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        // fetchPosts()
        (async () => {
            console.log('view feed')
            const userId = await getAuth()
            const subscriber = firestore()
                .collection('reports')
                .where("userId", "==", userId.trim())
                .onSnapshot(querySnapshot => {
                    const users = [];

                    querySnapshot.forEach(documentSnapshot => {
                        // console.log(documentSnapshot.data(), documentSnapshot.id)
                        users.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    console.log('sightings', users)
                    setUsers(users);
                    setLoading(false);
                });

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        })
    }, []);

    const fetchPosts = async () => {

        // setRefreshing(true)
        const user_id = await getAuth()
        console.log('feed:user id', user_id)

        try {
            const posts = await db.getPosts(user_id)
            console.log('posts', posts)
            // this.setState({ DATA: posts, isRefreshing: false })
            setUsers(posts);
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

    const showDetails = (entry) => {
        navigation.navigate("Details", {
            itemId: entry.id,
            item: entry,
        })
    }



    const onRefresh = () => {
        // this.setState({ isRefreshing: true })
        fetchPosts()
    }



    const onRemove = (postId) => {
        console.log(postId)
        Alert.alert(
            "Are you sure?",
            "If you delete then this record will not be recoverable",
            [
                {
                    text: "Do not Delete",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => db.removePost(postId)
                }
            ],
            { cancelable: false }
        )
    }


    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.screenContainer}>
            <FlatList
                data={users}
                refreshing={isRefreshing}
                onRefresh={() => onRefresh()}
                ListEmptyComponent={() => <EmptyComponent navigation={navigation} />}
                renderItem={({ item }) => (
                    <Card
                        postId={item.id}
                        title={item.text}
                        subTitle={`${item.numberTotal} bee(s) seen`}
                        image={{
                            uri:
                                item.image
                        }}
                        icon="star"
                        nbStar={2}
                        iconColor={"#FFC57C"}
                        viewPost={() => showDetails(item)}
                        removePost={onRemove}
                    />
                )}
            />

        </View>

    );
}

export default FeedScreen;