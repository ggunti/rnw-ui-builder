import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Layout } from '../../common';
import { RenderNode } from '../../UiEditor';
import { draggableComponents, Container } from '../../draggables';
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
      {props.page.id > 0 && (
        <Editor enabled={false} resolver={draggableComponents} onRender={RenderNode}>
          <Frame data={props.page.json}>
            <Element is={Container} canvas />
          </Frame>
        </Editor>
      )}
    </Layout>
  );
}

export default PagePreview;
