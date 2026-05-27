import React from 'react';
import ListItems from '../../../common/listItems';
import ComTitle from '../../../common/com-title';
import LNTable from '../../../../features/LN/common/table/default';

const powerUpsReceta = ({ data }) => {
    const { powerUp = [] } = data;
    const nutritionTableData = powerUp.find(
        e => e.subtype === 'custom-nutrition'
    );

    return (
        <div className="row --steps">
            <div className="col-tablet-3 --ingredients">
                <ComTitle tag="h3" size="--m" content="Ingredientes" />
                {powerUp.map(e =>
                    e.subtype === 'custom-ingrediente' ? (
                        <ListItems
                            list={e.embed.config.items}
                            titleList={e.embed.config.titleList}
                            listNumeric={undefined}
                            key={e.embed.config.titleList}
                        />
                    ) : null
                )}
            </div>
            <div className="col-tablet-8 --preparation">
                <ComTitle tag="h3" size="--m" content="Preparación" />
                {powerUp.map(e =>
                    e.subtype === 'custom-preparacion' ? (
                        <ListItems
                            list={e.embed.config.items}
                            titleList={e.embed.config.titleList}
                            listNumeric
                            key={e.embed.config.titleList}
                        />
                    ) : null
                )}
            </div>
            {nutritionTableData ? (
                <div className="--nutrition">
                    <ComTitle
                        tag="h3"
                        size="--l"
                        content="Información nutricional"
                    />
                    <div data-tw style={{ display: 'contents' }}>
                        <div className="w-full md:w-1/2">
                            <LNTable data={nutritionTableData} />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

powerUpsReceta.arcType = 'power-up-receta';

export default powerUpsReceta;
