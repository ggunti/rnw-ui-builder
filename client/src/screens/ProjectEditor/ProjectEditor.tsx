import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Overlay, Input, Button, Text } from 'react-native-elements';
import { Editor, Frame, Element } from '@craftjs/core';
import _ from 'lodash';
import { Layout } from '../../common';
import { RenderNode } from '../../UiEditor';
import { draggableComponents, Container } from '../../draggables';
import { PageType } from '../../types';

const PAGE_WIDTH = 200;
const PAGE_HEIGHT = (16 / 9) * PAGE_WIDTH;

interface ProjectEditorProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  pages: { [id: number]: PageType };
  hoveredPageId: number;
  setHoveredPageId: (hoveredPageId: number) => void;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  newPageName: string;
  setNewPageName: (newPageName: string) => void;
  addDisabled: boolean;
  onAddNewPage: () => void;
  onPressGenerate: () => void;
  onPressDeletePage: (id: number) => void;
  onPressPage: (id: number) => void;
}

function ProjectEditor(props: ProjectEditorProps) {
  return (
    <Layout
      loading={props.loading}
      hasError={props.hasError}
      errorMessage={props.errorMessage}
      onHideError={props.onHideError}
    >
      <View style={styles.row}>
        <Button
          containerStyle={{ flex: 1 }}
          type='outline'
          title='Add new page'
          onPress={() => props.setModalVisible(true)}
        />
        <Button containerStyle={{ flex: 1 }} title='Generate project code' onPress={props.onPressGenerate} />
      </View>
      <View style={styles.container}>
        {_.map(props.pages, ({ id, name, json }) => (
          <View key={id.toString()} style={styles.pageContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{name}</Text>
              <Button title='Delete' onPress={() => props.onPressDeletePage(id)} />
            </View>
            <TouchableOpacity
              onPress={() => props.onPressPage(id)}
              // @ts-ignore
              onMouseEnter={() => props.setHoveredPageId(id)}
            >
              <View style={styles.editorContainer}>
                {props.hoveredPageId === id ? (
                  <Editor enabled={false} resolver={draggableComponents} onRender={RenderNode}>
                    <Frame data={json}>
                      <Element is={Container} canvas />
                    </Frame>
                  </Editor>
                ) : (
                  <Text style={styles.title}>Hover to preview</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Overlay isVisible={props.modalVisible} onBackdropPress={() => props.setModalVisible(false)}>
        <View>
          <Input placeholder='Page name' value={props.newPageName} onChangeText={props.setNewPageName} />
          <Button type='outline' title='Add' disabled={props.addDisabled} onPress={props.onAddNewPage} />
        </View>
      </Overlay>
    </Layout>
  );
}

export default ProjectEditor;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    // borderColor: LIGHT_BLACK,
  },
  editorContainer: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    borderWidth: 1,
    // backgroundColor: LIGHT_BLACK,
    ...Platform.select({
      web: {
        pointerEvents: 'none', // it is very important in order to not allow user to click child nodes
      },
    }),
  },
  title: {
    textAlign: 'center',
  },
});
