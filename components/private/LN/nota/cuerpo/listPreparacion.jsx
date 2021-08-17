import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const listPreparacion = ({ data }) => {
    const { items, titleList } = data.embed.config;
    return (
        <>
            <div className="row">
                {items.length > 0 ? (
                    <div className="col-tablet-8 offset-tablet-1 _preparation">
                        <ComTitle tag="h3" size="--m" content={'Preparación'} />
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
listPreparacion.arcType = 'custom-preparacion';
listPreparacion.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                items: PropTypes.arrayOf(PropTypes.string),
                titleList: PropTypes.string
            })
        })
    }).isRequired
};

export default listPreparacion;
