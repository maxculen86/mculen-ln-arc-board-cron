import React from 'react';
import PropTypes from 'fusion:prop-types';
import Tags from '../tags';
import Sections from '../sections';
import DetalleReceta from '../detalleReceta';

import '../../../../../../resources/dist/css/ln/layouts/grid.css';
import ComTitle from '../../../../common/com-title';

const AperturaSinDestacado = props => {
    const { receta, taxonomy, tags } = props;

    return (
        <div className="col-desksm-12 cont-aper">
            <div className="row">
                {receta && (
                    <div className="col-desksm-3">
                        <DetalleReceta receta={receta} />
                    </div>
                )}
                <div className="col-desksm-9">
                    <Sections taxonomy={taxonomy} destacado />
                    {!!tags && tags.length > 0 && (
                        <>
                            <ComTitle
                                size="--m"
                                tag="h4"
                                content="Recetas con:"
                            />
                            <Tags tags={tags} destacado={false} />
                        </>
                    )}
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
    receta: PropTypes.node.isRequired
};

export default AperturaSinDestacado;
