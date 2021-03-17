import React from 'react';
import ComButton from './com-button';
import '../../../resources/dist/css/ln/modules/mod-share.css';

const ModShare = props => {
    const { classCondition } = props;

    return (
        <section
            className={`mod-share ${classCondition ? classCondition : ``}`}
        >
            <div className="container --left">
                <ComButton iconName="facebook-filled" />
                <ComButton iconName="twitter-filled" />
                <ComButton iconName="whatsapp-filled" />
            </div>
            {/* <div className="com-line"></div> */}
            <div className="container --right">
                <ComButton iconName="email" />
                <ComButton iconName="comment" size="--fourxs">
                    <label for="">0</label>
                </ComButton>
            </div>
            {/* <ComIcon
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
            /> */}
        </section>
    );
};

export default ModShare;
