import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const listIngredientes = ({ data }) => {
    const { items, titleList } = data.embed.config;
    return (
        <>
            <div className="row">
                {items.length > 0 ? (
                    <div className="col-tablet-3 _ingredients">
                        <ComTitle
                            tag="h3"
                            size="--m"
                            content={'Ingredientes'}
                        />
                        <ListItems
                            list={items}
                            titleList={titleList}
                            listNumeric
                            key={titleList}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
listIngredientes.arcType = 'custom-ingrediente';
listIngredientes.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                items: PropTypes.arrayOf(PropTypes.string),
                titleList: PropTypes.string
            })
        })
    }).isRequired
};

export default listIngredientes;
