import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Overlay, ThemeContext, OverlayProps } from 'react-native-elements';

interface ErrorPopupProps {
  overlayProps?: OverlayProps;
  hasError?: boolean;
  errorMessage?: string;
  onHideError?: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = props => {
  const { theme } = useContext(ThemeContext);
  const messageStyle = { ...styles.message, color: theme.colors?.error };
  return (
    <Overlay
      {...props.overlayProps}
      overlayStyle={[styles.overlay, props.overlayProps?.overlayStyle]}
      isVisible={props.hasError as boolean}
    >
      <View style={styles.container}>
        <Text style={messageStyle}>{props.errorMessage}</Text>
        <Button title='Okay' type='clear' onPress={props.onHideError} />
      </View>
    </Overlay>
  );
};

ErrorPopup.defaultProps = {
  hasError: false,
  errorMessage: '',
};

export { ErrorPopup };

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 10,
    maxWidth: '85%',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
  },
});
