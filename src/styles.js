import React from 'react';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 30
        // justifyContent: "center"
    },
    screenContainer: {
        flex: 1,
        // justifyContent: 'center',
        // paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: '#ecf0f1',
        paddingLeft: 8,
        paddingRight: 8,
    },
    image: {
        margin: 20,
        minWidth: 200,
        height: 200
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    sectionTitle: {
        color: "#333",
        fontSize: 20,
        fontWeight: 'bold',
        // flex: 1,
        // flexWrap: 'wrap',
        textTransform: "capitalize",
        paddingTop: 10

        // marginBottom: 10
    },
    sectionText: {
        color: "#333",
        fontSize: 18,
        lineHeight: 24,
        // fontWeight: 'bold',
        // flex: 1,
        // flexWrap: 'wrap',
        // textTransform: "uppercase",
        paddingTop: 10

        // marginBottom: 10
    },
    linkText: {
        color: 'blue',
        fontSize: 18,
        lineHeight: 24,
        paddingTop: 10
    },
    button: {
        marginHorizontal: 30,
        marginVertical: 10,
        backgroundColor: "green",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",

    },
    buttonText: {
        color: "#FFF", fontWeight: "bold", fontSize: 18, textTransform: 'uppercase'
    },
});