import React, { useState } from 'react';
import { AppLoading } from 'expo';

import { AppNavigation } from './src/navigation/AppNavigation';
import { bootstrap } from './src/bootstrap';

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
    <AppNavigation />
  );
};
