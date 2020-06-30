import React from 'react';
import ComLink from '../common/com-link';
import '../../../resources/dist/css/ln/modules/mod-newsletter.css';
import ComTitle from './com-title';
import ComButton from './com-button';
import ComIco from './com-icon';

const ModNewsletter = props => {
    const { classCondition } = props;
    return (
        <section className="mod-newsletter">
            <div className="container">
                <div className="container-text">
                    <ComIco iconName="mail" size="xl" />
                    <ComTitle
                        tag="h3"
                        size="l"
                        content="Recibí las noticias de Coronavirus en la Argentina por e-mail"
                    />
                    <ComLink link="#" size="l">
                        Mirá todos los newsletters que tenemos para vos
                    </ComLink>
                </div>
                <ComButton>SUSCRIBITE AL NEWSLETTER</ComButton>
            </div>
        </section>
    );
};

export default ModNewsletter;
