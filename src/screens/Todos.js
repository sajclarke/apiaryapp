import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Form from '../components/Form'

import * as db from '../utils/Firebase'
import { styles } from '../styles'

function Todos() {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firestore()
            .collection('todos')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data(), documentSnapshot.id)
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log(users)
                setUsers(users);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    if (loading) {
        return <ActivityIndicator />;
    }

    const handleAddTodo = async (data) => {
        // console.log(data)
        // console.log(db)
        await db.addTodo(data)
    }

    return (
        <View style={{ flex: 1, paddingTop: 100, paddingLeft: 10, paddingRight: 10 }}>
            <Form onAdd={handleAddTodo} />
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>ID: {item.key}</Text>
                        <Text>Title: {item.title}</Text>
                    </View>
                )}
            />

        </View>

    );
}

export default Todos;