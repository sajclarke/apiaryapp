import React from 'react';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 30
        // justifyContent: "center"
    },
    image: {
        margin: 20,
        minWidth: 200,
        height: 200
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
    }
});