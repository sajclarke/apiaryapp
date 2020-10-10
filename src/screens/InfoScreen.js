import React from "react";
import { ScrollView, View, Text, StyleSheet, Linking, Pressable } from "react-native";

export default class InfoScreen extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>About This App</Text>
                    <Text style={styles.sectionText}>
                        This mobile application is provided by
                        the ____________________________ at no cost and is intended for
                        use as is.
  </Text>
                    <Text style={styles.sectionTitle}>Privacy Policy</Text>

                    <Text style={styles.sectionText}>
                        This page is used to inform users regarding
                        our policies with the collection, use, and
                        disclosure of Personal Information if anyone decided to use
                        this mobile application.</Text>
                    <Text style={styles.sectionText}>
                        If you choose to use this mobile application, then you agree
                        to the collection and use of information in relation to this
                        policy. No personal information is collected during the use of this mobile application.
                        We will not use or share any of your
                        information with any individual or organization except as described in this Privacy
                        Policy.
  </Text>
                    <Text style={styles.sectionText}>
                        The terms used in this Privacy Policy have the same meanings
                        as in our Terms and Conditions, which is accessible at our website unless otherwise defined in this Privacy
                        Policy.
  </Text>
                    <Text style={styles.sectionTitle}>Information Collection and Use</Text>
                    <Text style={styles.sectionText}>
                        We do not collect any personal information is collected during the use of this mobile application.
                    </Text>
                    <Text style={styles.sectionText}>
                        This mobile application complies with publishing requirements for the Google Play app store which involves the use of third party services that may collect
                        non-personal information used to identify your mobile device.
  </Text>

                </View>

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 30
        // justifyContent: "center"
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