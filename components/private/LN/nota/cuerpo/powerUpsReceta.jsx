import React from 'react';
import PropTypes from 'prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const powerUpsReceta = ({ data }) => {
    const { powerUp } = data;
    const nutritionTableData = powerUp.find(
        e => e.subtype === 'custom-nutrition'
    );
    return (
        <div className="row --steps">
            <div className="col-tablet-3 --ingredients">
                <ComTitle tag="h3" size="--m" content="Ingredientes" />
                {powerUp.map(e => {
                    return e.subtype === 'custom-ingrediente' ? (
                        <ListItems
                            list={e.embed.config.items}
                            titleList={e.embed.config.titleList}
                            listNumeric={undefined}
                            key={e.embed.config.titleList}
                        />
                    ) : (
                        <></>
                    );
                })}
            </div>
            <div className="col-tablet-8 --preparation">
                <ComTitle tag="h3" size="--m" content="Preparación" />
                {powerUp.map(e => {
                    return e.subtype === 'custom-preparacion' ? (
                        <ListItems
                            list={e.embed.config.items}
                            titleList={e.embed.config.titleList}
                            listNumeric
                            key={e.embed.config.titleList}
                        />
                    ) : (
                        <></>
                    );
                })}
            </div>
            {nutritionTableData ? (
                <div className="col-tablet-6 --nutrition">
                    <ComTitle
                        tag="h3"
                        size="--l"
                        content="Información nutricional"
                    />
                    <div>
                        <table className="com-table">
                            <tr>
                                <th>Propiedad</th>
                                <th>Cantidad por porción</th>
                            </tr>
                            {powerUp.map(e => {
                                return e.subtype === 'custom-nutrition' ? (
                                    <>
                                        {e.embed.config.items.map(item => {
                                            return (
                                                <tr>
                                                    <td>{item.text}</td>
                                                    <td>{`${item.value} ${item.unit}`}</td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <></>
                                );
                            })}
                        </table>
                    </div>
                </div>
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
