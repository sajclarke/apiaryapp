import React, { useState } from 'react';
import { TextInput, Alert, Button, Platform, PermissionsAndroid, Permission, ToastAndroid, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import GeocoderOsm from 'react-native-geocoder-osm';
// import Geocoder from 'react-native-geocoding';
import Toast from 'react-native-tiny-toast';

const UselessTextInput = (props) => {

    const [initialPosition, setPosition] = useState('')

    const [title, onChangeTitle] = useState('Example Title');
    const [description, onChangeDescription] = useState('Example Description');

    const handleSubmit = () => {
        props.onAdd({ title, description })
    }

    const hasLocationPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow  to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await this.hasLocationPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const findCoordinates = async () => {

        const locationEnabled = await hasLocationPermission();

        if (!locationEnabled) {
            return;
        }

        const toast = Toast.showLoading('Finding location....')
        // this.setState({ initialPosition: { coords: { latitude: 13.1412011, longitude: -59.6115804 } } })
        Geolocation.getCurrentPosition(
            position => {
                // const initialPosition = JSON.stringify(position);
                // this.setState({ initialPosition: position });
                setPosition(position)
                console.log(position)
                // let coor = {
                //     lat: -7.014681299999999,
                //     lng: 107.6392892
                // }
                // GeocoderOsm.getGeoCodePosition(position.latitude, position.longitude).then((res) => {
                //     // res is an Array of geocoding object
                //     console.log("getGeoCodePosition", res)
                // }).catch((e) => {
                //     console.log('getGeoCodePosition error', e)
                // });

                // Toast.hide(toast)

                // const coord_latitude = 13.1412011;
                // const coord_longitude = -59.6115804;

                GeocoderOsm.getGeoCodePosition(position.coords.latitude, position.coords.longitude).then((res) => {
                    // res is an Array of geocoding object
                    console.log("getGeoCodePosition", res);
                    let addressText = res[0].display_name;
                    console.log(addressText);
                    // this.setState({ location: addressText });

                    Toast.hide(toast)

                    return addressText;
                }).catch((e) => {
                    console.log('getGeoCodePosition error', e)
                });

                // Geocoder.from({ lat: coord_latitude, lng: coord_longitude })
                //     .then(json => {
                //         var addressComponent = json.results[0].address_components[0];
                //         console.log(addressComponent);
                //     })
                //     .catch(error =>
                //         console.warn(error)
                //     );
            },
            error => {
                console.log('Error', JSON.stringify(error))
                Alert.alert('Error', 'Cannot find your location because of the following error: ' + error.message)
                Toast.hide(toast)
                // await this.requestLocationPermission()
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        // this.watchID = Geolocation.watchPosition(position => {
        //     const lastPosition = JSON.stringify(position);
        //     this.setState({ lastPosition });
        // });
    }

    return (
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 10 }}
                onChangeText={text => onChangeTitle(text)}
                placeholder="Enter title"
                value={title}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 20 }}
                onChangeText={text => onChangeDescription(text)}
                placeholder="Enter description"
                value={description}
            />

            <Button
                title="Save New Recordss"
                onPress={handleSubmit}
            />
            <Button
                title="Get Location"
                onPress={findCoordinates}
            />
        </>
    );
}

export default UselessTextInput;