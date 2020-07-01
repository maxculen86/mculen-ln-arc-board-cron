import React from 'react';
import ComLink from '../common/com-link';
import '../../../resources/dist/css/ln/modules/mod-newsletter.css';
import ComTitle from './com-title';
import ComButton from './com-button';
import ComIco from './com-icon';
import ComText from './com-text';

const ModNewsletter = props => {
    const { classCondition } = props;
    const textBold = <span> Coronavirus en la Argentina </span>;

    return (
        <section className="mod-newsletter">
            <div className="container">
                <div className="container-text">
                    <ComIco iconName="mail" size="xl" />
                    <ComText tag="h3" size="l">
                        Recibí las noticias de {textBold} por e-mail
                    </ComText>
                    <ComLink link="#" size="l">
                        Mirá todos los newsletters que tenemos para vos
                    </ComLink>
                </div>
                <ComButton classesNames="--primary">
                    SUSCRIBITE AL NEWSLETTER
                </ComButton>
            </div>
        </section>
    );
};

export default ModNewsletter;
