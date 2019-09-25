import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BarCodeScannerComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const {hasCameraPermission, scanned} = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requestinq for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          jusifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({scanned: false})}
          />
        )}
      </View>
    );
  }
}
