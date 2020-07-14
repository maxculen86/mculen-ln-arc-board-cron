import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from './articleAcum';
import BtnMasNotas from '../../botonVerMasNotas';

import '../../../../../../resources/dist/css/ln/modules/caja-autoracu.css';
import '../../../../../../resources/dist/css/ln/components/title.css';
import ComTitle from '../../../../common/com-title';

const GrillaColumnistas = props => {
    const { authors, obtenerMasNotas, mostrarBtnMasNotas } = props;
    /*TODO: llevar este componenete a chain*/
    return (
        <>
            <div className="col-12">
                <div className="com-titleWithfollow">
                    {/* <h1 className="com-title-section-xl"></h1> */}
                    <ComTitle tag="h1" size="xl" content="Columnistas" />
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
