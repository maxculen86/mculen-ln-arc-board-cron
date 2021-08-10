import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const listPreparacion = ({ preparation }) => {
    return (
        <>
            <ComTitle tag="h3" size="--m" content={'Preparación'} />
            {preparation &&
                preparation.length !== 0 &&
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
