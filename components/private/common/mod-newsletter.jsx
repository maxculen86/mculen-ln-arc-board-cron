import React from 'react';
import withNewsLetterData from '../LN/common/hocs/withNewsLetterData';
import ComLink from './com-link';
import '../../../resources/dist/css/ln/modules/mod-newsletter.css';
import ComTitle from './com-title';
import ComButton from './com-button';
import ComIco from './com-icon';
import ComText from './com-text';
const ModNewsletter = props => {
    const { classCondition, titulo } = props;
    const handleClick = () => {
        window.location.assign('https://newsletter.lanacion.com.ar/#/');
    };
    return (
        <section className="mod-newsletter">
            <div className="container">
                <div className="container-text">
                    <ComIco iconName="mail" size="xl" />
                    <ComTitle
                        size="l"
                        content={`Recibí las noticias de <mark class="hl_yellow_underline">${
                            titulo ? titulo : ''
                        }</mark> por e-mail`}
                    />
                    <ComLink
                        link="https://newsletter.lanacion.com.ar/#/"
                        size="l"
                    >
                        Mirá todos los newsletters que tenemos para vos
                    </ComLink>
                </div>
                <div className="container-button">
                    <ComButton onClick={handleClick} classesNames="--primary">
                        SUSCRIBITE AL NEWSLETTER
                    </ComButton>
                </div>
            </div>
        </section>
    );
};
export default ModNewsletter;
