import React from 'react';

const LINK_LA_NACION = 'https://www.lanacion.com.ar';

export default function Footer(props) {
    return (
        <footer className="footer">
            <div className="container">
                <h5>
                    Segu&iacute; informado las 24 horas en: &nbsp;
                    <a className="footer-link" href={LINK_LA_NACION}>
                        www.lanacion.com.ar
                    </a>
                </h5>
                <p className="footer-copyright-main">
                    Copyright {props.year} S.A. LA NACION
                </p>
                <p className="footer-copyright-text">
                    Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
}
