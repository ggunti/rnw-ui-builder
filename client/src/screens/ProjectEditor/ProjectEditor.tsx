import React from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Overlay, Button, Input, Text } from 'react-native-elements';
import _ from 'lodash';
import { Layout } from '../../common';
import UiEditor from '../../UiEditor/UiEditor';
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
  onAddNewPage: () => void;
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
      <Button type='outline' title='Add new page' onPress={() => props.setModalVisible(true)} />
      <View style={styles.container}>
        {_.map(props.pages, ({ id, name, compressedState }) => (
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
                  <UiEditor preview={true} compressedState={compressedState} />
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
          <Button type='outline' title='Add' onPress={props.onAddNewPage} />
        </View>
      </Overlay>
    </Layout>
  );
}

export default ProjectEditor;

const styles = StyleSheet.create({
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
