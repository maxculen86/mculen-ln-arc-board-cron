import React from 'react';
//import ComLi from './com-li';
import ComLi from './com-li';
import ComLink from './com-link';
import ComIco from './com-icon';
import '../../../resources/dist/css/ln/components/com-unordered.css';
import ComBullet from './com-bullet';

const list = [
    {
        textname: '@cpagni',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'twitter',
        classCondition: ''
    },
    {
        textname: '@cpagni',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'whatsapp',
        classCondition: ''
    },
    {
        textname: '@cpagni',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'instagram',
        classCondition: ''
    },
    {
        textname: '@cpagni',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'rss',
        classCondition: ''
    },
    {
        textname: '@cpagni',
        link: 'http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html',
        icon: 'facebook',
        classCondition: ''
    }
];

const ListSocialIcons = props => {
    const { vertical, size } = props;
    const listItem = list.map(item => (
        <ComLi>
            <ComLink
                link={item.link}
                blank={item.blank}
                classCondition="--sociallist"
            >
                <ComBullet sizeBullet="--xs" />
                <ComIco
                    sizeText={size}
                    sizeIcon="--lg"
                    iconName={item.icon}
                    classCondition={item.classCondition}
                    textname={item.textname}
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
