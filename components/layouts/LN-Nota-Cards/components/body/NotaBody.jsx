import React from 'react';
import PropTypes from 'prop-types';
import BodyFooter from './BodyFooter';

function NotaBody({ children }) {
    return (
        <section className="nota-cards__body sidebar__main">
            {/* Breadcrumb (obligatorio - verde) */}
            <div className="nota-cards__breadcrumb">
                {/* TODO: Integrar breadcrumb component */}
            </div>

            {/* Contenido principal con bodyCards */}
            <div className="cuerpo__nota">{children}</div>

            {/* Elementos del pie del cuerpo */}
            <NotaBody.Footer />
        </section>
    );
}

NotaBody.Footer = BodyFooter;

NotaBody.propTypes = {
    children: PropTypes.node
};

NotaBody.defaultProps = {
    children: null
};

export default NotaBody;
