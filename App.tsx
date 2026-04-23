import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { store } from './src/app/store';
import AuthNav from './src/navigations/RootNav';

LogBox.ignoreLogs([
  'Deep imports from the \'react-native\' package are deprecated',
  'InteractionManager has been deprecated'
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
