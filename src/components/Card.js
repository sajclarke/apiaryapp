import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    // Icon,
    TouchableOpacity,
} from 'react-native';

// import { ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class CardFive extends Component<Props> {
    constructor(props) {
        super(props);
    }

    state = {
        dialogVisible: false,
        selectedPost: null
    }

    render() {
        const { image, title, subTitle, icon, nbStar, postId } = this.props;
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    margin: 10,
                    flexDirection: 'column',
                    width: screenWidth - 20,
                    borderRadius: 12,
                    elevation: 2,
                    shadowColor: '#777',
                    shadowOpacity: 0.16,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 0,
                    },
                }}>
                {image.uri?.length > 1 && (
                    <View
                        style={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            backgroundColor: 'transparent',
                            height: 200,
                        }}>
                        <Image
                            borderRadius={12}
                            source={image}
                            style={{
                                borderRadius: 12,
                                position: 'absolute',
                                width: screenWidth - 20,
                                height: 200,
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                )}

                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 15,
                        marginTop: -12,
                        // height: 110,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                        }}>
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                flex: 3,
                                justifyContent: 'center',
                            }}>
                            <Text style={{ color: '#000', margin: 3, fontSize: 18 }}>
                                {title}
                            </Text>
                            <Text style={{ color: '#888', margin: 3, fontSize: 15 }}>
                                {subTitle}
                            </Text>

                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    flex: 1,
                                    marginTop: 15,
                                    borderBottomRightRadius: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                {/* <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Icon style={[{ color: '#333' }]} size={25} name={'info'} />
                                    <Text style={{ color: '#000', fontSize: 16 }}>View</Text>
                                </View> */}
                                <TouchableOpacity onPress={() => this.props.viewPost(postId)}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon style={[{ color: '#333', paddingHorizontal: 15 }]} size={25} name={'edit'} />
                                        <Text style={{ color: '#000', fontSize: 16 }}>Edit</Text>
                                    </View>
                                </TouchableOpacity>



                                <TouchableOpacity onPress={() => this.props.removePost(postId)}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon style={[{ color: '#333', paddingHorizontal: 15 }]} size={25} name={'trash-2'} />
                                        <Text style={{ color: '#000', fontSize: 16 }}>Delete</Text>
                                    </View>
                                </TouchableOpacity>

                                {/* {[1, 2, 3, 4, 5].map((item, index) => (
                                    <Ionicons
                                        key={index}
                                        name={icon}
                                        style={{ margin: 2, alignSelf: 'center' }}
                                        color={nbStar >= index + 1 ? '#2f89fc' : '#bbb'}
                                        size={15}
                                    />
                                ))}
                                <Text
                                    style={{
                                        color: '#666',
                                        margin: 2,
                                        fontSize: 15,
                                        alignSelf: 'center',
                                    }}>
                                    ({nbStar + ' star' + (nbStar > 1 ? 's' : '')})
                                </Text> */}
                            </View>
                        </View>
                    </View>
                </View>
                {/* <ConfirmDialog
                    title="Delete Entry"
                    message="Are you sure about that?"
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: "YES",
                        onPress: () => { this.props.removePost(this.state.selectedPost); this.setState({ dialogVisible: false }) }
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({ dialogVisible: false })
                    }}
                /> */}
            </View>
        );
    }
}