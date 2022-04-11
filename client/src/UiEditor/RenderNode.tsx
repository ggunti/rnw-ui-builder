import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useNode, useEditor, Node } from '@craftjs/core';
import shortid from 'shortid';
import { ROOT_NODE } from '@craftjs/utils';

export const RenderNode = ({ render }: { render: any }) => {
  const { actions, query } = useEditor();
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode(node => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.name,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add('component-selected');
      } else {
        dom.classList.remove('component-selected');
      }
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
    return {
      top: top > 0 ? top : bottom,
      left,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;
    if (!currentDOM) {
      return;
    }

    const { top, left } = getPos(dom as HTMLElement);
    currentDOM.style.top = `${top}px`;
    currentDOM.style.left = `${left}px`;
  }, [dom, getPos]);

  useEffect(() => {
    document.querySelector('.craftjs-renderer')?.addEventListener('scroll', scroll);
    return () => document.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll);
  }, [scroll]);

  // helper function to handle node cloning; it returns the tree that needs to be cloned
  const getCloneTree = (idToClone: string) => {
    const tree = query.node(idToClone).toNodeTree();
    const newNodes: { [nodeId: string]: string } = {};

    const changeNodeId = (node: Node, newParentId: string | undefined) => {
      const newNodeId = shortid();
      const childNodes = node.data.nodes.map((childId: string) => changeNodeId(tree.nodes[childId], newNodeId));
      const linkedNodes = Object.keys(node.data.linkedNodes).reduce((accum, id) => {
        // @ts-ignore
        const newNodeId = changeNodeId(tree.nodes[node.data.linkedNodes[id]], newNodeId);
        return { ...accum, [id]: newNodeId };
      }, {});

      let tmpNode = {
        ...node,
        id: newNodeId,
        data: {
          ...node.data,
          parent: newParentId || node.data.parent,
          nodes: childNodes,
          linkedNodes,
        },
      };
      let freshnode = query.parseFreshNode(tmpNode).toNode();
      newNodes[newNodeId] = freshnode;
      return newNodeId;
    };

    const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId], undefined);
    return { rootNodeId, nodes: newNodes };
  };

  // main function to handle node cloning; check https://github.com/prevwong/craft.js/issues/209#issuecomment-795221484
  const handleClone = (e: GestureResponderEvent, id: string) => {
    e.preventDefault();
    const theNode = query.node(id).get();
    const parentNode = query.node(theNode.data.parent).get();
    const indexToAdd = parentNode.data.nodes.indexOf(id);
    const tree = getCloneTree(id);
    actions.addNodeTree(tree, parentNode.id, indexToAdd + 1);

    // uncomment this code block to have the clone
    // function to work properly
    /*
    setTimeout(function () {
      actions.deserialize(query.serialize());
      actions.selectNode(tree.rootNodeId);
    }, 100);
    */
  };

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            // @ts-ignore
            <View
              ref={currentRef}
              style={{
                left: getPos(dom as HTMLElement).left,
                top: getPos(dom as HTMLElement).top,
                flexDirection: 'row',
                position: 'fixed',
                zIndex: 9999,
                alignItems: 'center',
                marginTop: -25,
                backgroundColor: '#2680eb',
              }}
            >
              <Text>{name}</Text>
              {moveable && (
                // @ts-ignore
                <TouchableOpacity ref={drag} style={styles.iconContainer}>
                  <Icon size={20} name='move' type='feather' />
                </TouchableOpacity>
              )}
              {id !== ROOT_NODE && (
                <TouchableOpacity style={styles.iconContainer} onPress={() => actions.selectNode(parent)}>
                  <Icon size={20} name='arrow-up' type='feather' />
                </TouchableOpacity>
              )}
              {deletable && (
                <TouchableOpacity style={styles.iconContainer} onPress={() => actions.delete(id)}>
                  <Icon size={20} name='trash' type='feather' />
                </TouchableOpacity>
              )}
              {id !== ROOT_NODE && (
                <TouchableOpacity style={styles.iconContainer} onPress={e => handleClone(e, id)}>
                  <Icon size={20} name='clone' type='font-awesome' />
                </TouchableOpacity>
              )}
            </View>,
            document.body,
          )
        : null}
      {render}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 5,
  },
});
