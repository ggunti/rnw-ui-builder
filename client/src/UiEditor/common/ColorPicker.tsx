import React, { CSSProperties } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker, ColorChangeHandler } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: ColorChangeHandler;
}

interface ColorPickerState {
  displayColorPicker: boolean;
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState((prevState) => ({ displayColorPicker: !prevState.displayColorPicker }));
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    const styles: Record<string, CSSProperties> = reactCSS({
      default: {
        container: {
          display: 'flex',
          flex: 1,
        },
        color: {
          flex: 1,
          height: '14px',
          borderRadius: '2px',
          background: this.props.color,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          flex: 1,
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          right: 5,
          zIndex: 2,
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div style={styles.container}>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={this.props.color} onChange={this.props.onChange} />
          </div>
        ) : null}
      </div>
    );
  }
}
