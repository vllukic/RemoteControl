import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  };

  render() {
    const {hasCameraPermission, scanned} = this.state;
    console.log('Perm', hasCameraPermission);
    console.log('Scanned', scanned);

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.view}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <Button
          title={'Tap to Scan Again'}
          onPress={() => this.setState({scanned: false})}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
