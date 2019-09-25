/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import BarCodeScannerComponent from './src/BarCodeScanerComponent';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <BarCodeScannerComponent />
    </View>
  );
};

export default App;
