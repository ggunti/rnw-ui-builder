import React from 'react';
import { Layout } from '../../common';
import UiEditor from '../../UiEditor/UiEditor';
import { PageType } from '../../types';

interface PagePreviewProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  page: PageType;
}

function PagePreview(props: PagePreviewProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      {/* if we do not make this check, then default UI components are shown instead of loaded ones (because of some kind of internal caching of craftjs) */}
      {props.page.id > 0 && <UiEditor preview json={props.page.json} />}
    </Layout>
  );
}

export default PagePreview;
