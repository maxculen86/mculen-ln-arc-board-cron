import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import NavBarMobile from '../navbar';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import withLoginData from '../hocs/withLoginData';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
const CLASS_ACTIVE = '--active';
let lastScrollPosition = 0;
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollDirection: {
                isScrollDown: false,
                isScrollUp: false
            }
        };
    }

    componentDidMount() {
        const { screenUtils } = this.props;
        const { device } = screenUtils;
        const idHeader = device === 'desktop' ? 'header' : 'header-mobile';
        const header = document.getElementById(idHeader);
        const vshare = document.getElementById('v-share');
        const userMenu = document.getElementById('user-menu');
        const wrapper = document.getElementById('wrapper');
        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener('scroll', () => {
                const { isScrollDown, isScrollUp } = this.onScrollHandler(
                    header,
                    headerHeigth,
                    vshare,
                    userMenu,
                    wrapper
                );
                this.setState({
                    scrollDirection: { isScrollDown, isScrollUp }
                });
            });
        }
    }

    // TODO: Hacer refactor del siguiente metodo
    onScrollHandler = (header, height, vshare, userMenu, wrapper) => {
        let isScrollDown = false;
        let isScrollUp = false;
        const scrollPos = window.scrollY;
        const { classList } = header;

        if (userMenu) userMenu.classList.remove(CLASS_ACTIVE);
        if (scrollPos) {
            if (scrollPos > height) {
                classList.add(CLASS_SCROLL_DOWN);
            }
            if (scrollPos < lastScrollPosition) {
                isScrollUp = true;
                // SCROLL UP
                classList.remove(CLASS_SCROLL_DOWN);
                classList.add(CLASS_SCROLL_UP);
                if (vshare) {
                    vshare.classList.add(CLASS_SCROLL_UP);
                }
                wrapper.classList.remove(CLASS_SCROLL_DOWN);
                wrapper.classList.add(CLASS_SCROLL_UP);
            } else {
                isScrollDown = true;
                // SCROLL DOWN
                classList.remove(CLASS_SCROLL_UP);
                if (vshare) {
                    vshare.classList.remove(CLASS_SCROLL_UP);
                }
                wrapper.classList.remove(CLASS_SCROLL_UP);
                wrapper.classList.add(CLASS_SCROLL_DOWN);
            }
        } else {
            classList.remove(CLASS_SCROLL_UP);
            classList.remove(CLASS_SCROLL_DOWN);
            wrapper.classList.remove(CLASS_SCROLL_UP);
        }
        lastScrollPosition = scrollPos;

        return { isScrollDown, isScrollUp };
    };

    render() {
        const {
            screenUtils,
            logueado,
            loginData,
            goToLogout,
            siteProperties: { host }
        } = this.props;
        const { scrollDirection } = this.state;
        const isMobile = screenUtils.device !== 'desktop';

        return (
            <>
                {!isMobile && (
                    <HeaderDesktop
                        logueado={logueado}
                        loginData={loginData}
                        showNav
                        goToLogout={goToLogout}
                        host={host}
                    />
                )}
                {isMobile && (
                    <>
                        <HeaderMobile loginData={loginData} host={host} />
                        <NavBarMobile
                            showNav={
                                scrollDirection.isScrollDown
                                    ? ` ${CLASS_SCROLL_DOWN}`
                                    : ''
                            }
                        />
                    </>
                )}
            </>
        );
    }
}

Index.propTypes = {
    screenUtils: PropTypes.shape({
        device: PropTypes.string
    }).isRequired,
    logueado: PropTypes.bool.isRequired,
    loginData: PropTypes.shape({
        subcription: PropTypes.bool,
        userName: PropTypes.string,
        goToLoginUrl: PropTypes.func
    }).isRequired,
    goToLogout: PropTypes.func.isRequired,
    siteProperties: PropTypes.shape({
        host: PropTypes.string
    }).isRequired
};

// Index.defaultProps = {
//     logueado: false
// };

export default withLoginData(WithScreenUtils(Consumer(Index)));
