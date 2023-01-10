/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import Desplegable from '../../LN/common/desplegable';
import NavbarMobile from '../navbar';
import { onScrollHandler, toggleDesplegable } from './_helper';
import HeaderAMP from '../../LN/common/header/headerAMP';
import debounce from '../../common/utils/debounce';

const Header = props => {
    const {
        outputType,
        siteProperties: { layoutsName = {} },
        layout
    } = props;

    useEffect(() => {
        const header = document.getElementById('header');
        const userMenu = document.getElementById('user-menu');
        const fusionApp = document.getElementById('fusion-app');
        const wrapper = fusionApp && fusionApp.querySelector('#wrapper');

        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener(
                'scroll',
                debounce(() => {
                    onScrollHandler(
                        header,
                        headerHeigth,
                        userMenu,
                        wrapper,
                        layout,
                        layoutsName
                    );
                })
            );
        }
    }, [layout, layoutsName]);

    if (outputType === 'amp')
        return <HeaderAMP toggleDesplegable={toggleDesplegable} />;
    return (
        <>
            <NavbarMobile isHome={layoutsName.HomeLN10 === layout} />
            <Desplegable
                toggleDesplegable={toggleDesplegable}
                isHome={layoutsName.HomeLN10 === layout}
            />
        </>
    );
};

Header.propTypes = {
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        host: PropTypes.string,
        layoutsName: PropTypes.shape({
            Home: PropTypes.string
        })
    }),
    layout: PropTypes.string,
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        node_type: PropTypes.string
    })
};

export default Consumer(Header);
