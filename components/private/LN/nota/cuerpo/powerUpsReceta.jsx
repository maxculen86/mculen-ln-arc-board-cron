import React from 'react';
import PropTypes from 'prop-types';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';

const powerUpsReceta = ({ data }) => {
    const { powerUp } = data;
    console.log(powerUp);
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
            <div className="col-tablet-8">
                <ComTitle
                    tag="h3"
                    size="--l --font-bold"
                    content="Información nutricional"
                />
                <table>
                    <tr>
                        <th>Propiedad</th>
                        <th>Cantidad por porción</th>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                    </tr>
                    <tr>
                        <td>Jane</td>
                        <td>Doe</td>
                    </tr>
                </table>
                {powerUp.map(e => {
                    return e.subtype === 'custom-nutrition' ? <></> : <></>;
                })}
            </div>
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
