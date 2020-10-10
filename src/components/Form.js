import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Button, Image, Platform, Pressable, PermissionsAndroid, Permission, Text, TouchableOpacity, ToastAndroid, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import GeocoderOsm from 'react-native-geocoder-osm';
import ImagePicker from 'react-native-image-picker';
// import Geocoder from 'react-native-geocoding';
import Toast from 'react-native-tiny-toast';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { styles } from '../styles'

const Form = (props) => {

    const [initialPosition, setPosition] = useState('unknown')
    const [imgSource, setImage] = useState(null)
    const [numberTotal, setNumberTotal] = useState(1)
    const [locationAddress, setLocationAddress] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [title, onChangeTitle] = useState('Example Title');
    const [description, onChangeDescription] = useState('Example Description');
    const [notes, onChangeNote] = useState('Example Description');

    useEffect(() => {
        // Toast.show('Warning: An error has occurred. Sorry about that', {
        //     position: 100,
        //     containerStyle: {
        //         backgroundColor: 'red'
        //     },
        //     textStyle: {
        //         color: 'white'
        //     },
        //     imgStyle: {},
        //     duration: 1000,
        //     mask: true,
        //     maskColor: `rgba(0, 0, 0, 0.3)`
        // })
    })

    const showError = (text) => (
        Toast.show(text, {
            position: 100,
            containerStyle: {
                backgroundColor: 'red'
            },
            textStyle: {
                color: 'white'
            },
            imgStyle: {},
            duration: 1000,
            mask: true,
            maskColor: `rgba(0, 0, 0, 0.3)`
        })
    )

    const handleSubmit = () => {
        console.log('submitted form', imgPath, locationAddress, numberTotal, latitude, longitude, notes)

        if (locationAddress.length < 1) {
            showError('Please add a location or a photo')
            return
            // } else if (!imgSource) {
            //     this.setState({ errorMessage: 'Please add a photo' })
            //     return
        } else if (numberTotal < 1) {
            showError('Please indicate how many monkeys you have seen')
            return
        } else if (initialPosition === 'unknown') {
            showError('Please add a location or a photo')
            return
        }

        const imgPath = imgSource.uri

        const { latitude, longitude } = initialPosition.coords

        const userId = uuidv4()

        props.onAdd({ imgPath, locationAddress, numberTotal, latitude, longitude, notes })
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
            const hasPermission = await hasLocationPermissionIOS();
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
                    setLocationAddress(addressText)

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

    /**
    * Select image method
    */
    const pickImage = () => {
        ImagePicker.showImagePicker({
            quality: 1,
            mediaType: "photo",
            cameraType: "back",
            allowsEditing: false,
            // noData: true,
            maxWidth: 8000,
            maxHeight: 8000,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }, async response => {
            console.log('camera response', response)
            if (response.didCancel) {
                // alert('You cancelled image picker 😟');
                console.log('You cancelled image picker 😟');
            } else if (response.error) {
                console.log('An error occured: ', response.error);
            } else {
                const imgSource = { uri: response.uri };

                var path = '';
                if (Platform.OS == 'ios')
                    path = response.uri.toString();
                else {
                    path = response.path.toString();
                }
                const image = {
                    image: response.uri.toString(),
                    path: path
                };

                console.log('imgpath', path)

                const { latitude, longitude } = response

                // if (latitude === '' || longitude === '') {

                // }

                let resultObj = {
                    imgSource: imgSource,
                    imgPath: path,
                    imageUri: response.uri,
                    initialPosition: { coords: { latitude: latitude, longitude: longitude } }
                }

                console.log('all image info', resultObj)
                console.log('img source location', imgSource)

                setImage(imgSource)

                findCoordinates()

                // this.setState(resultObj)

                // const geocodedResult = await GeocoderOsm.getGeoCodePosition(latitude, longitude).then((res) => {
                //     console.log("getGeoCodePosition", res);
                //     let addressText = res[0].display_name;
                //     console.log(addressText)
                //     this.setState({ location: addressText });
                // }).catch(async (e) => {
                //     console.log('getGeoCodePosition error', e)
                //     // alert('An error occurred getting the address location')

                //     const locationResults = await this.findCoordinates()
                //     console.log(locationResults)
                // });

                // result.location = geocodedResult
                // return result
                // Exif.getLatLong(path)
                //     .then((result) => {
                //         console.log(result)
                //         const { latitude, longitude } = result
                //         // console.log('OK: ' + latitude + ', ' + longitude)
                //         // this.setState({
                //         //     imgSource: source,
                //         //     imgPath: path,
                //         //     imageUri: response.uri,
                //         //     initialPosition: { coords: { latitude: latitude, longitude: longitude } }
                //         // });
                //         let resultObj = {
                //             imgSource: source,
                //             imgPath: path,
                //             imageUri: response.uri,
                //             initialPosition: { coords: { latitude: latitude, longitude: longitude } }
                //         }
                //         return resultObj
                //     })
                //     .then(async (result) => {
                //         // console.log(result)
                //         const { latitude, longitude } = result.initialPosition.coords

                //         const geocodedResult = await GeocoderOsm.getGeoCodePosition(latitude, longitude).then((res) => {
                //             // res is an Array of geocoding object
                //             console.log("getGeoCodePosition", res);
                //             let addressText = res[0].display_name;
                //             // console.log(addressText);
                //             return addressText
                //             // result.location = addressText
                //             // return result
                //             // this.setState({ location: addressText });
                //         }).catch((e) => {
                //             console.log('getGeoCodePosition error', e)
                //             alert('An error occurred getting the address location')
                //         });

                //         result.location = geocodedResult
                //         return result
                //     }).then((res) => {
                //         console.log('image result with location data', res)

                //         this.setState(res)
                //     })
                //     .catch(msg => {
                //         console.error('ERROR: ' + msg)
                //         alert('An error occurred getting image information')
                //     })



            }
        });
    };

    return (
        <View style={styles.screenContainer}>
            <View style={{ flexGrow: 1 }}>
                <Pressable
                    style={styles.button}
                    onPress={findCoordinates}
                >
                    <Text style={styles.buttonText}>Get Location</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={pickImage}
                >
                    <Text style={styles.buttonText}>Take Photo</Text>
                </Pressable>

                {initialPosition?.coords && (
                    <>
                        <Text>Latitude: {initialPosition.coords.latitude}</Text>
                        <Text>Longitude: {initialPosition.coords.longitude}</Text>
                        <Text>Address: {locationAddress}</Text>
                    </>)}
                {imgSource?.uri?.length > 1 && (
                    <>
                        <Image
                            source={imgSource}
                            style={styles.image}
                        />
                    </>
                )}
                <TextInput
                    style={{
                        height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 10, fontSize: 15,
                        color: "#161F3D"
                    }}
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

                <TextInput
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1, padding: 10, marginTop: 20 }}
                    onChangeText={text => onChangeNote(text)}
                    placeholder="Enter notes"
                    value={notes}
                />

                {/* <Button
                    title="Save New Records"
                    onPress={handleSubmit}
                /> */}

            </View>
            {/* <View style={{ flex: 2, backgroundColor: 'skyblue' }}></View> */}
            {/* <View style={{ flex: 1, backgroundColor: 'steelblue' }}></View> */}
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <View style={{ textAlign: 'center', paddingHorizontal: 20 }}>
                        <Text style={[styles.buttonText]}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default Form;