import React from 'react';
import ComIcon from './com-icon';
import '../../../resources/dist/css/ln/modules/mod-share.css';

const ModShare = props => {
    const { classesNames, classCondition } = props;

    return (
        <section
            className={`mod-shared ${classesNames ? classesNames : ``} ${
                classCondition ? classCondition : ``
            }`}
        >
            <ComIcon
                link="https://www.facebook.com/lanacion"
                iconName="facebook-filled"
            />
            <ComIcon
                link="https://twitter.com/LANACION"
                iconName="twitter-filled"
            />
            <ComIcon
                link="https://www.instagram.com/lanacioncom/"
                iconName="instagram"
            />
            <ComIcon
                link="http://servicios.lanacion.com.ar/herramientas/rss/ayuda"
                iconName="rss"
            />
        </section>
    );
};

export default ModShare;
