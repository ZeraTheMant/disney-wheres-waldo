import React from 'react';

const SelectionCircle = (props) => {
    return (
        <div 
            id="selection-circle"
            style={{ top: (props.y-25), left: (props.x-25) }}
        >
        </div>
    );
}

export default SelectionCircle;