import React, {useState} from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

const CustomModal = () => {
  const [visible, setVisible] = useState(false);
  const [dBName, setDBName] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal</Text>
             <TextInput
                label="Sub-Field"
                value={dBName}
                mode="outlined"
                onChangeText={text => setDBName(text)}
            />
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default CustomModal;