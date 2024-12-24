import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { url } from './app.json'

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

function App(): React.JSX.Element {

  useEffect(() => {
    init();

    return () => {

    }
  }, [])

  const init= async () => {
    const token = await messaging().getToken();
    fetch(url+'/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      console.log('FCM Token:', token);
    };

  messaging().onMessage(async remoteMessage => {
    console.log('Notification received in foreground:', remoteMessage);
    pushNotice(remoteMessage.notification?.title, remoteMessage.notification?.body);
  });

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: '/',
    parameters: {
        delay: 10000,
    },
  };

  const pushNotice = async (title:string, body:string) => {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon',
          pressAction: {
            id: 'default',
          },
        },
    })
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.text}>Hey there!</Text>
          <Text style={styles.text}>This is FCM App</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  text: {
    fontSize: 20,
    padding: 10
  }
});

export default App;
