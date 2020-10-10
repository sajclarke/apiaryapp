import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
// import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import * as db from '../utils/Firebase'

// import Constants from 'expo-constants';
// import { withFirebaseHOC } from '../utils'
// You can import from local files
import Card from '../components/Card';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;


class FeedScreen extends React.Component {

    // static navigationOptions = {
    //     headerShown: false,
    // };
    state = { DATA: null, isRefreshing: false }


    componentDidMount() {
        this.fetchPosts()

        const { navigation } = this.props;

        navigation.addListener('focus', () => {
            // do something
            this.onRefresh()
        });
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    fetchPosts = async () => {


        const user_id = await this.getAuth()
        console.log('user id', user_id)

        try {
            const posts = await db.getPosts(user_id)
            console.log(posts)
            this.setState({ DATA: posts, isRefreshing: false })
        } catch (e) {
            console.error(e)
        }
    }

    getAuth = async () => {
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

    onRefresh = () => {
        this.setState({ isRefreshing: true })
        this.fetchPosts()
    }

    onRemove = async (id) => {
        await db.removePost(id)
        this.onRefresh()
    }

    showDetails = (entry) => {
        this.props.navigation.navigate("Details", {
            itemId: entry.id,
            item: entry,
        })
    }

    emptyComponent = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                <Text style={{ color: '#aaa', fontSize: 30, fontWeight: 'bold', textAlign: 'center', paddingBottom: 40 }}>Your reports will be listed here</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Add")}>
                    <View style={{ textAlign: 'center', paddingHorizontal: 20 }}>
                        <Text style={[styles.buttonText]}>Submit a report</Text>
                    </View>
                </TouchableOpacity>
            </View>);
    }

    render() {

        if (this.state.DATA != null) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                            <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>ID: {item.key}</Text>
                                <Text>Title: {item.title}</Text>
                            </View>
                        )}
                    />
                    {/* <FlatList
                        style={{ paddingTop: 20 }}
                        data={this.state.DATA}
                        keyExtractor={this.state.DATA.key}
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        ListEmptyComponent={() => this.emptyComponent()}
                        renderItem={({ item }) => (

                            <Card
                                postId={item.key}
                                title={item.text}
                                subTitle={`${item.numberTotal} monkey(s) seen`}
                                image={{
                                    uri:
                                        item.image
                                }}
                                icon="star"
                                nbStar={2}
                                iconColor={"#FFC57C"}
                                viewPost={() => this.showDetails(item)}
                                removePost={(id) => this.onRemove(id)}
                            />
                        )}
                    /> */}

                </View>
            );
        } else {
            return (
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: '#ecf0f1',
        paddingLeft: 8,
        paddingRight: 8,
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "green",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#FFF", fontWeight: "bold", fontSize: 18, textTransform: 'uppercase'
    },
});

export default FeedScreen;
