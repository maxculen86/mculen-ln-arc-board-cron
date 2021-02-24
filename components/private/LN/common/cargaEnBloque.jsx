import React from 'react';
import PropTypes from 'fusion:prop-types';
import { VariableSizeList as List } from 'react-window';

const CargaEnBloque = props => {
    const { renderables } = props;
    console.log("🚀 ~ file: cargaEnBloque.jsx ~ line 7 ~ renderables", renderables)
    // These row heights are arbitrary.
    // Yours should be based on the content of the row.
    const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 25 + Math.round(Math.random() * 50));

    const getItemSize = index => rowHeights[index];

    const Row = ({ index, style }) => (
        <div style={style}>Row {index}</div>
    );

    return (
        <List
            className="List"
            height={600}
            itemCount={1000}
            itemSize={getItemSize}
            width={300}
        >
            {Row}
        </List>
    );
};

export default CargaEnBloque;
