import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import { Layout } from '../../common';
import { PageType } from '../../types';

interface ProjectPreviewProps {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  onHideError: () => void;
  pages: PageType[];
  onPressPreview: (pageId: number) => void;
}

class ProjectPreview extends Component<ProjectPreviewProps> {
  renderItem = ({ item }: { item: PageType }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <Button title='Preview' onPress={() => this.props.onPressPreview(item.id)} />
    </ListItem>
  );

  render() {
    return (
      <Layout
        loading={this.props.loading}
        hasError={this.props.hasError}
        errorMessage={this.props.errorMessage}
        onHideError={this.props.onHideError}
      >
        <FlatList
          data={this.props.pages}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <ListItem bottomDivider>
              <ListItem.Content style={styles.headerContent}>
                <ListItem.Title>All pages</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          }
          renderItem={this.renderItem}
          ListEmptyComponent={<Text>You have no pages in this project.</Text>}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  headerContent: {
    alignItems: 'center',
  },
});

export default ProjectPreview;
