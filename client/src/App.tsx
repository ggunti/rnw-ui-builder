import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from './Main';
// redux store
import { store, persistor } from './redux/store';

// IMPORTANT: we need to set document object on mobile in order to not crash the page preview functionality (craftjs fix)
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  // @ts-ignore
  document = {
    querySelector: () => {},
  };
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
