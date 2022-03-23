import React from 'react';
import { SafeAreaView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ErrorPopup } from './ErrorPopup';
import { LoadingPopup } from './LoadingPopup';

interface LayoutProps {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onHideError?: () => void;
}

const Layout: React.FC<LayoutProps> = props => {
  return (
    <>
      <SafeAreaView style={[styles.container, props.style]}>{props.children}</SafeAreaView>
      <LoadingPopup loading={props.loading} />
      <ErrorPopup hasError={props.hasError} errorMessage={props.errorMessage} onHideError={props.onHideError} />
    </>
  );
};

Layout.defaultProps = {
  hasError: false,
  errorMessage: '',
  onHideError: () => {},
};

export { Layout };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
