import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';

const listPreparacion = ({ preparation }) => {
    return (
        <>
            <h4 className="com-title-section-m">Preparación</h4>
            {preparation.length !== 0 &&
                preparation.map(list => (
                    <ListItems
                        list={list.items}
                        titleList={list.title}
                        listNumeric
                        key={list.title}
                    />
                ))}
        </>
    );
};

listPreparacion.propTypes = {
    preparation: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired
};

export default listPreparacion;
