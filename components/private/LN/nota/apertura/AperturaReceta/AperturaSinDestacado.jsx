import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';

const AperturaSinDestacado = props => {
    const { receta, taxonomy, tags } = props;

    return (
        <div className="col-desksm-12 cont-aper">
            <div className="row">
                <div className="col-desksm-3">
                    {receta && <DetalleReceta receta={receta} />}
                </div>
                <div className="col-desksm-9">
                    <Sections taxonomy={taxonomy} destacado />
                    <h4 className="com-subtitle_list">Recetas con:</h4>
                    <Tags tags={tags} destacado={false} />
                </div>
            </div>
        </div>
    );
};

AperturaSinDestacado.propTypes = {
    taxonomy: PropTypes.shape({
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string,
                slug: PropTypes.string,
                text: PropTypes.string
            })
        ).isRequired
    }).isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            slug: PropTypes.string,
            text: PropTypes.string
        })
    ).isRequired,
    receta: PropTypes.object.isRequired
};

export default AperturaSinDestacado;
