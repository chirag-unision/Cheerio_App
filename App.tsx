import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';

function App(): React.JSX.Element {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
