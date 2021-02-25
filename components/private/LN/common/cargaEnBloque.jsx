import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
// import { VariableSizeList as List } from 'react-window';
import CajaCollection from '../../../chains/Ln_Caja_Collection';

const CargaEnBloque = props => {
    return <></>;
    /*
    const { renderables = [], tree } = props;
    const section = renderables[7];
    const { children } = section;
    const [cache, setCache] = useState([]);

    const rowHeights = new Array(1000)
        .fill(true)
        .map(() => 500);

    const getItemSize = index => rowHeights[index];

    const Row = ({ index, style }) => {
        const chain = children[index];
        const { props: properties, type } = chain || {};
        const { customFields, id } = properties || {};
        if (type !== 'Ln_Caja_Collection') return <></>;
        const isInCache = cache.find(item => item.id === id) || { caja: false };
        console.log("🚀 ~ file: cargaEnBloque.jsx ~ line 32 ~ Row ~ cache", cache)
        console.log("🚀 ~ file: cargaEnBloque.jsx ~ line 32 ~ Row ~ isInCache", isInCache)
        const caja = isInCache.caja || (
            <CajaCollection
                id={id}
                customFields={customFields}
                renderables={renderables}
                tree={tree}
            />
        );
        if (isInCache.caja === false) 
            setCache(state => [...state, { id, caja }]);
        return (
            <div style={style}>
                {caja}
            </div>
        );
    };

    return (
        <List
            className="List"
            height={1000}
            itemCount={100}
            itemSize={getItemSize}
            width={'100%'}
        >
            {Row}
        </List>
    );
    */
};

export default CargaEnBloque;
