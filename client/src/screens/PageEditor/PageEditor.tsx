import React from 'react';
import { Layout } from '../../common';
import UiEditor from '../../UiEditor/UiEditor';
import { PageType } from '../../types';

interface PageEditorProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  page: PageType;
  onPressSave: (compressedState: string) => void;
  onPressGenerateCode: (serializedJson: string) => void;
}

function PageEditor(props: PageEditorProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      {/* if we do not make this check, then default UI components are shown instead of loaded ones (because of some kind of internal caching of craftjs) */}
      {props.page.id > 0 && (
        <UiEditor
          pageName={props.page.name}
          json={props.page.json}
          onPressSave={props.onPressSave}
          onPressGenerateCode={props.onPressGenerateCode}
        />
      )}
    </Layout>
  );
}

export default PageEditor;
