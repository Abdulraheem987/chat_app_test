/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import StackNavigation from './src/navigation/stackNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import {NativeBaseProvider} from 'native-base';
import {customTheme} from './src/theme';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={customTheme}>
          <StackNavigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
