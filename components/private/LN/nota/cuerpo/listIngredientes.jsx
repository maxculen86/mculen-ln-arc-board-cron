import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';

const listIngredientes = ({ ingredients }) => {
    return (
        <>
            <h4 className="com-title-section-s hlp-marginBottom-20">
                Ingredientes
            </h4>
            {ingredients.length !== 0 &&
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
