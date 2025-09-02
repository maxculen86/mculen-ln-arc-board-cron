import React from 'react';
import PropTypes from 'prop-types';
import OpeningContent from './OpeningContent';
import OpeningMedia from './OpeningMedia';
import OpeningMeta from './OpeningMeta';

function NotaOpening({ children }) {
    return (
        <>
            {/* TODO: Mover estos estilos a archivo SCSS dedicado - Fix temporal para desktop */}
            <style>
                {`
                @media (min-width: 1024px) {
                    .nota-cards__opening {
                        margin-top: 100px;
                    }
                }
                `}
            </style>
            <section className="nota-cards__opening">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Foto/Video (obligatorio) */}
                            <NotaOpening.Media />

                            {/* Meta información: Fecha, Autor, Sharestar */}
                            <NotaOpening.Meta />

                            {/* Contenido: Título, Bajada, etc. */}
                            <NotaOpening.Content />

                            {/* Contenido adicional de PageBuilder */}
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

NotaOpening.Content = OpeningContent;
NotaOpening.Media = OpeningMedia;
NotaOpening.Meta = OpeningMeta;

NotaOpening.propTypes = {
    children: PropTypes.node
};

NotaOpening.defaultProps = {
    children: null
};

export default NotaOpening;
