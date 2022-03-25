/* eslint-disable react/require-default-props */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import HeaderDesktop from './headerDesktop';
import NavBarMobile from '../navbar';
import HeaderAMP from './headerAMP';
import { goToLogout } from '../utils/loginHelper';
import Desplegable from '../desplegable';
import Scroll from '../../../common/utils/scroll';
import debounce from '../../../common/utils/debounce';
import getSectionName from '../utils/getSectionName';
import { GlobalContext } from '../../../common/context/globalContext';
import { getLoginData, isLoggedIn } from '../utils/contextHelper';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
const CLASS_ACTIVE = '--active';
let lastScrollPosition = 0;

const Index = props => {
    const {
        outputType,
        siteProperties: { host, layoutsName = {} },
        layout,
        globalContent,
        isAdmin
    } = props;
    const { dispatch } = useContext(GlobalContext);
    const { type, node_type: nodeType } = globalContent || {};
    const section = getSectionName({ type, nodeType });

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
                    onScrollHandler(header, headerHeigth, userMenu, wrapper);
                })
            );
        }
    }, []);

    if (outputType === 'amp')
        return <HeaderAMP toglleDesplegable={toglleDesplegable} />;

    return (
        <>
            <HeaderDesktop
                toglleDesplegable={toglleDesplegable}
                logueado={isLoggedIn()}
                loginData={getLoginData()}
                showNav
                goToLogout={() => goToLogout(dispatch)}
                host={host}
                isHome={layoutsName.Home === layout}
                section={section}
                isAdmin={isAdmin}
            />

            <NavBarMobile
                isHome={layoutsName.Home === layout}
                toglleDesplegable={toglleDesplegable}
            />

            <Desplegable
                toglleDesplegable={toglleDesplegable}
                isHome={layoutsName.Home === layout}
            />
        </>
    );
};

Index.propTypes = {
    outputType: PropTypes.string,
    isAdmin: PropTypes.bool,
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

const toglleDesplegable = () => {
    document.body.classList.contains('dropdown')
        ? document.body.classList.remove('dropdown')
        : document.body.classList.add('dropdown');
};

const onScrollHandler = (header, height, userMenu, wrapper) => {
    const { isScrollUp, isScrollDown } = Scroll.getScrollDirection(
        lastScrollPosition
    );
    const scrollPos = window.scrollY;
    const { classList } = header;
    const vshare = document.getElementById('v-share');

    if (userMenu) userMenu.classList.remove(CLASS_ACTIVE);
    if (scrollPos) {
        if (scrollPos > height) {
            if (wrapper) {
                wrapper.classList.add(CLASS_SCROLL_DOWN);
            }
        }
        if (isScrollUp) {
            classList.remove(CLASS_ACTIVE);
            if (vshare) vshare.classList.remove(CLASS_ACTIVE);

            if (wrapper) {
                wrapper.classList.remove(CLASS_SCROLL_DOWN);
                wrapper.classList.add(CLASS_SCROLL_UP);
            }
        } else {
            classList.remove(CLASS_ACTIVE);
            if (vshare) vshare.classList.remove(CLASS_ACTIVE);

            if (wrapper) {
                wrapper.classList.remove(CLASS_SCROLL_UP);
                wrapper.classList.add(CLASS_SCROLL_DOWN);
            }
        }
        if (scrollPos < 65) {
            classList.add(CLASS_ACTIVE);
            if (vshare) vshare.classList.add(CLASS_ACTIVE);
        }
    }

    lastScrollPosition = scrollPos;

    return { isScrollDown, isScrollUp };
};

export default Consumer(Index);
