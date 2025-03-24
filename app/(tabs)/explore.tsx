import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, SafeAreaView } from 'react-native';

const AboutScreen = () => {
  const WebLink = () => {
    Linking.openURL('https://todo-app-web-five.vercel.app/');
  };
 
  const SiteLink = () => {
    Linking.openURL('https://morales-tech.net/');
  };
 
  return (
    <>
        {/* Header */}
    <Text style={styles.header}>About This App</Text>
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.text}>
            This app was developed using React Native.{"\n"}
            It shares the same backend as the web version, providing a seamless experience across platforms.
          </Text>

          <TouchableOpacity onPress={WebLink} style={styles.linkContainer}>
            <Text style={styles.link}>Web version</Text>
          </TouchableOpacity>
          
          <Text style={styles.credits}>
            Developed by 
            <TouchableOpacity onPress={SiteLink} accessibilityLabel="Visit Morales-tech.net">
              <Text style={styles.siteLink}>Morales-tech.net</Text>
            </TouchableOpacity>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 30,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  linkContainer: {
    marginTop: 100,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    elevation: 2,
  },
  link: {
    fontSize: 18,
    color: '#fff',
    textDecorationLine: 'none',
  },
  siteLink: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#007AFF',
  },
  credits: {
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 100,
  },
});

export default AboutScreen;
