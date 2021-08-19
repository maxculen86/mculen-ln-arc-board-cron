import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const listIngredientes = ({ ingredients }) => {
    return (
        <>
            <ComTitle tag="h3" size="--m" content={'Ingredientes'} />
            {ingredients &&
                ingredients.length !== 0 &&
                ingredients.map(list => (
                    <ListItems
                        list={list.items}
                        titleList={list.title}
                        key={list.title}
                    />
                ))}
        </>
    );
};

listIngredientes.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string)
        })
    ).isRequired
};

export default listIngredientes;
