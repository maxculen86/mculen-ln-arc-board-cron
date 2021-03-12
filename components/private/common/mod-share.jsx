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
                <ComButton
                    onClick={slider.nextButtonHandler}
                    classCondition="icon-arrow-right"
                    iconName="facebook-filled"
                />
                <button type="button" className="com-button --icon">
                    <i className="com-icon icon-facebook-filled"></i>
                </button>
                <button type="button" className="com-button --icon">
                    <i className="com-icon icon-twitter-filled"></i>
                </button>
                <button type="button" className="com-button --icon">
                    <i className="com-icon icon-whatsapp-filled"></i>
                </button>
            </div>
            {/* <div className="com-line"></div> */}
            <div className="container --right">
                <button type="button" className="com-button   --icon ">
                    <i className="com-icon icon-email   "></i>
                </button>
                <button type="button" className="com-button   --icon comment ">
                    <i className="com-icon icon-comment   "></i>
                    <span className="com-text --fourxs ">
                        <label for="">0</label>
                    </span>
                </button>
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
