import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import ComLink from './com-link';
import '../../../resources/dist/css/ln/modules/mod-newsletter.css';
import ComTitle from './com-title';
import ComButton from './com-button';
import ComIco from './icon';

const ModNewsletter = props => {
    const { titulo = '' } = props;
    const handleClick = () => {
        window.open('https://newsletter.lanacion.com.ar/#/', '_blank');
    };
    const {
        globalContent: { subtype }
    } = useAppContext();
    let contenido = `Recibí las noticias de <mark class="hl_underline">${titulo}</mark> por e-mail`;
    if (subtype === '7') {
        contenido = 'Recibí nuevas recetas por e-mail';
    }
    return (
        <section className="mod-newsletter">
            <div className="container">
                <div className="container-text">
                    <ComIco name="email" sizeIcon="--xl" />
                    <ComTitle size="--l" content={contenido} />
                    <ComLink
                        link="https://newsletter.lanacion.com.ar/#/"
                        size="--threexs"
                        target="_blank"
                        title="Mirá todos los newsletters que tenemos para vos"
                    >
                        Mirá todos los newsletters que tenemos para vos
                    </ComLink>
                </div>
                <div className="container-button">
                    <ComButton
                        onClick={handleClick}
                        classesNames="--primary"
                        size="--fivexs"
                        title={`Suscribite al Newsletter de ${titulo}`}
                    >
                        SUSCRIBITE AL NEWSLETTER
                    </ComButton>
                </div>
            </div>
        </section>
    );
};

ModNewsletter.propTypes = {
    titulo: PropTypes.string.isRequired
};
export default ModNewsletter;
