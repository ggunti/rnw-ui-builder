import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Editor } from '@craftjs/core';
import { Layout } from '../../common';
import { Topbar, Toolbox, UiPreview, SettingsPanel, RenderNode } from '../../UiEditor';
import { draggableComponents } from '../../draggables';
import { PageType } from '../../types';

interface PageEditorProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  page: PageType;
  phoneWidth: number;
  setPhoneWidth: (width: number) => void;
  onPressSave: (compressedState: string) => void;
  onPressGenerateCode: (serializedJson: string) => void;
}

export default function PageEditor(props: PageEditorProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      {/* if we do not make this check, then default UI components are shown instead of loaded ones (because of some kind of internal caching of craftjs) */}
      {props.page.id > 0 && (
        <Editor resolver={draggableComponents} onRender={RenderNode}>
          <View style={styles.container}>
            <Topbar
              pageName={props.page.name}
              phoneWidth={props.phoneWidth}
              setPhoneWidth={props.setPhoneWidth}
              onPressSave={props.onPressSave}
              onPressGenerateCode={props.onPressGenerateCode}
            />
            <View style={styles.row}>
              <Toolbox />
              <UiPreview json={props.page.json} phoneWidth={props.phoneWidth} />
              <SettingsPanel />
            </View>
          </View>
        </Editor>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
