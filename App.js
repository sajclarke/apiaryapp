import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './src/screens/FeedScreen';
import AddPostScreen from './src/screens/AddPostScreen';
import MapScreen from './src/screens/MapScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import InfoScreen from './src/screens/InfoScreen';
// import Todos from './src/screens/Todos';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();

function HomeScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Feed" component={Home} />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitle: props => 'Details',
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }} />
    </HomeStack.Navigator>
  )
}

function Home() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Feed" component={Feed} />
      <TopTab.Screen name="Map" component={MapScreen} />
    </TopTab.Navigator>
  );
}

// function Map() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Map</Text>
//       <MapView
//         style={styles.map}
//         region={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//       </MapView>
//     </View>
//   );
// }


// function Details() {
//   return (
//     <View style={styles.container}>
//       <Text>Feed Details</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

function MyTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Sightings"
        component={AddPostScreen}
        options={{
          tabBarLabel: 'Sightings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      /> */}
      <BottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <Icon name="info-circle" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      {/* <MyTabs /> */}
      <RootStack.Navigator>
        <RootStack.Screen name="Apiary" component={MyTabs} />
        {/* <RootStack.Screen name="Profile" component={Profile} />
        <RootStack.Screen name="Settings" component={Notifications} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
