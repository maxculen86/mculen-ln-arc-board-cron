import React from 'react';
//import ComLi from './com-li';
import ComLi from './com-li';
import ComLink from './com-link';
import ComIco from './com-icon';
import '../../../resources/dist/css/ln/components/com-unordered.css';

const list = [
    {
        textname: 'twitter',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'twitter',
        classCondition: ''
    },
    {
        textname: 'whatsapp',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'whatsapp',
        classCondition: ''
    },
    {
        textname: 'instagram',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'instagram',
        classCondition: ''
    },
    {
        textname: 'rss',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'rss',
        classCondition: ''
    },
    {
        textname: 'Facebook',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'facebook',
        classCondition: ''
    }
];

const ListSocialIcons = props => {
    const { vertical, size } = props;
    const listItem = list.map(item => (
        <ComLi>
            <ComLink link={item.link} blank={item.blank}>
                <ComIco
                    size={size}
                    iconName={item.icon}
                    classCondition={item.classCondition}
                />
            </ComLink>
        </ComLi>
    ));
    return (
        <ul className={`com-unordered ${vertical ? '--vertical' : ''}`}>
            {listItem}
        </ul>
    );
};

export default ListSocialIcons;
