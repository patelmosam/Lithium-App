import * as React from 'react';
import { Button, PermissionsAndroid, SafeAreaView, 
    StatusBar, StyleSheet, Text, View } from "react-native";

const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Lithium App Storage Permission",
          message:
            "Lithium App needs access to your Storage " +
            "so you can create local database.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can access the storage");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

function PermissionScreen({ navigation }) {

    return (
        <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestStoragePermission} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
      backgroundColor: "#ecf0f1",
      padding: 8
    },
    item: {
      margin: 24,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    }
  });

export default PermissionScreen;