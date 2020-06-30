import React from 'react';
import ComLink from '../common/com-link';
import '../../../resources/dist/css/ln/modules/mod-newsletter.css';
import ComTitle from './com-title';
import ComButton from './com-button';

const ModNewsletter = props => {
    const { classCondition } = props;
    return (
        <section className="mod-newsletter">
            <div className="row">
                <div className="col-6">
                    <ComTitle size="l">
                        Recibí las noticias de Coronavirus en la Argentina por
                        e-mail
                    </ComTitle>
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
