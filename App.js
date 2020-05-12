import React, { useState } from 'react';
import { Alert } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';

import { AppNavigation } from './src/navigation/AppNavigation';
import { bootstrap } from './src/bootstrap';
import { store } from './src/redux/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onError={() => Alert.alert('Something went wrong, try again later!')}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
