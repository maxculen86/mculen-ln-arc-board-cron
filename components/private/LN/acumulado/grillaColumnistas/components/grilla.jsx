import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import BtnMasNotas from '../../botonVerMasNotas';

import '../../../../../../resources/dist/css/ln/modules/caja-autoracu.css';
import '../../../../../../resources/dist/css/ln/components/title.css';

const GrillaColumnistas = props => {
    const {
        authors,
        obtenerMasNotas,
        mostrarBtnMasNotas,
        customFields
    } = props;

    return (
        <>
            <div className="col-12">
                <div className="com-titleWithfollow hlp-marginBottom-30">
                    <h1 className="com-title-section-xl">
                        {customFields.gridTitle}
                    </h1>
                </div>
            </div>
            <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                <ArticleAcum authors={authors} />
            </section>
            <section className="row">
                <BtnMasNotas
                    name="ACUMULADO GRILLA"
                    onClickHandler={obtenerMasNotas}
                    loading={mostrarBtnMasNotas}
                />
            </section>
        </>
    );
};

GrillaColumnistas.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    mostrarBtnMasNotas: PropTypes.bool.isRequired,
    customFields: PropTypes.object.isRequired
};
export default GrillaColumnistas;
