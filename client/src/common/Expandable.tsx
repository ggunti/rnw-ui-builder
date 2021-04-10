import React, { CSSProperties } from 'react';
import { Icon } from 'react-native-elements';

interface ExpandableProps {
  title: string;
  isExpanded?: boolean;
  toggleIsExpanded: () => void;
}

export const Expandable: React.FC<ExpandableProps> = (props) => {
  return (
    <>
      <div style={styles.container} onClick={props.toggleIsExpanded}>
        <Icon name={props.isExpanded ? 'arrow-drop-down' : 'arrow-right'} type='material' />
        <p style={styles.title}>{props.title}</p>
      </div>
      <div style={styles.childrenContainer}>{props.isExpanded && props.children}</div>
    </>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  childrenContainer: {
    marginLeft: 5,
  },
  title: {
    fontSize: 12,
  },
};
