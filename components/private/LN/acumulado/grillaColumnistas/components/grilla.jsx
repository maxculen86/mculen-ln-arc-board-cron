import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import BtnMasNotas from '../../botonVerMasNotas';

import '../../../../../../resources/dist/css/ln/modules/caja-autoracu.css';

const GrillaColumnistas = ({
    authors,
    obtenerMasNotas,
    mostrarBtnMasNotas
}) => {
    return (
        <>
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
    mostrarBtnMasNotas: PropTypes.bool.isRequired
};
export default GrillaColumnistas;
