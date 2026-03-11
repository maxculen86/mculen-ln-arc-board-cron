import React from 'react';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';

function AperturaSinDestacado(props) {
    const { receta, taxonomy, tags } = props;

    return (
        <div className="col-desksm-12 cont-aper">
            <div className="flex flex-column flex-row_l gap-24_l">
                {receta && (
                    <div className="col-desksm-3">
                        <DetalleReceta receta={receta} />
                    </div>
                )}
                <div className="col-desksm-9">
                    <Sections taxonomy={taxonomy} destacado />
                    {!!tags && tags.length > 0 && (
                        <Tags tags={tags} destacado={false} showItems={3} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AperturaSinDestacado;
