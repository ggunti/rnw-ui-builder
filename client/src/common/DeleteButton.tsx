import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Button, Text } from 'react-native-elements';

interface DeleteButtonProps {
  confirmQuestion: string;
  onDelete: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onPressDeleteYes = () => {
    setModalVisible(false);
    props.onDelete();
  };
  return (
    <>
      <Button
        buttonStyle={styles.errButton}
        titleStyle={styles.errButtonTitle}
        type='outline'
        title='Delete'
        onPress={() => setModalVisible(true)}
      />
      <Overlay overlayStyle={styles.overlay} isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.container}>
          <Text style={styles.text}>{props.confirmQuestion}</Text>
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.errButton}
            titleStyle={styles.errButtonTitle}
            type='outline'
            title='Yes'
            onPress={onPressDeleteYes}
          />
          <Button containerStyle={styles.buttonContainer} title='No' onPress={() => setModalVisible(false)} />
        </View>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    minWidth: '20%',
    minHeight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
  errButtonTitle: {
    color: 'red',
  },
  errButton: {
    borderColor: 'red',
  },
  buttonContainer: {
    marginVertical: 5,
  },
});
