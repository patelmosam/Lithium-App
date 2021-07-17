import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '@react-navigation/native';
import AppBar from '../components/AppBar';

function SettingsScreen({ navigation }) {
  const { colors } = useTheme();
  const theme = useTheme();

  const [state, setState] = useState({image: null})
  let { image } = state;

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  }

 _pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  alert(result.uri);
  console.log(result)

  if (!result.cancelled) {
    setState({ image: result.uri });
  }
  }

  return (
     
      <View style={styles.container}>
        
        <Button
          title="Select Document"
          onPress={ () => _pickDocument()}
        />

          <View style={{ 'marginTop': 20}}>
            <Button
              title="Select Image"
              onPress={ () => _pickImage()}
            />
            {image &&
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});

export default SettingsScreen;