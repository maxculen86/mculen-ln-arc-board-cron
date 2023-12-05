import React from 'react';
import PropTypes from 'prop-types';

import ListItems from '../../../../private/common/listItems';
import ComTitle from '../../../../private/common/com-title';
import Table from '../../../../private/LN/nota/cuerpo/table';

export const PowerupsReceta = ({ article = {} }) => {
    const { content_elements = [] } = article;
    // revisar como obtener los powerups segun el nuevo content source para foodit
    const { powerUp = [] } = content_elements.find(
        element => element && element.subtype === 'power-up-receta'
    );

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
                <div className="--nutrition">
                    <ComTitle
                        tag="h3"
                        size="--l"
                        content="Información nutricional"
                    />
                    <Table data={nutritionTableData} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

PowerupsReceta.propTypes = {
    article: PropTypes.object
};

export default PowerupsReceta;
