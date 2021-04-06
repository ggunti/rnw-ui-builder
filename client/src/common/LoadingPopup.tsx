import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Overlay, ThemeContext, OverlayProps } from 'react-native-elements';

interface LoadingPopupProps {
  overlayProps?: OverlayProps;
  loading?: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Overlay
      {...props.overlayProps}
      overlayStyle={[styles.overlay, props.overlayProps?.overlayStyle]}
      isVisible={props.loading as boolean}
      fullScreen
    >
      <View>
        <ActivityIndicator color={theme.colors?.white} size='large' />
      </View>
    </Overlay>
  );
};

LoadingPopup.defaultProps = {
  loading: false,
};

export { LoadingPopup };

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
