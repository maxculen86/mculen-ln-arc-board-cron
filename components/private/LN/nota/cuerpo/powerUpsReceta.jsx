import React from 'react';
import PropTypes from 'prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const powerUpsReceta = ({ data }) => {
    const { powerUp } = data;
    return (
        <div className="row">
            {powerUp.length > 0 ? (
                powerUp.map((e, i) => {
                    const { items, titleList, typeList } = e.embed.config;
                    return (
                        <div
                            className={
                                typeList === 'preparacion'
                                    ? 'col-tablet-8 offset-tablet-1 _preparation'
                                    : 'col-tablet-3 _ingredients'
                            }
                        >
                            <ComTitle
                                tag="h3"
                                size="--m"
                                content={typeList.toUpperCase()}
                            />
                            <ListItems
                                list={items}
                                titleList={titleList}
                                listNumeric
                                key={titleList}
                            />
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
};
powerUpsReceta.arcType = 'power-up-receta';
powerUpsReceta.propTypes = {
    data: PropTypes.shape({
        powerUp: PropTypes.arrayOf(
            PropTypes.shape({
                embed: PropTypes.shape({
                    config: PropTypes.shape({
                        items: PropTypes.arrayOf(PropTypes.string),
                        titleList: PropTypes.string,
                        typeList: PropTypes.string
                    })
                })
            })
        )
    }).isRequired
};

export default powerUpsReceta;
