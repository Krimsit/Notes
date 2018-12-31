import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import '../../css/App.css';

const COLORS = ['#FFFFFF', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#CFD8DC', '#FFD180'];

class ColorPicker extends Component {
    render() {
        return (
            <div className="ColorPicker">
                {
                    COLORS.map(color => 
                        <div
                            key={color}
                            className={
                                this.props.value !== color
                                ? 'ColorPicker__swatch'
                                : 'ColorPicker__swatch selected'
                            }
                            style={{ backgroundColor: color }}
                            onClick={this.props.onChange.bind(null, color)}
                        />
                    )
                }
            </div>
        );
    }
}

export default ColorPicker;