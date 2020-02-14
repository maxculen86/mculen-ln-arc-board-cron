import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import NavBarMobile from '../navbar';
import HeaderAMP from './headerAMP';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import withLoginData from '../hocs/withLoginData';
import Desplegable from '../desplegable';

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
        //debugger;
        const { screenUtils } = this.props;
        const { device } = screenUtils;
        const idHeader = device === 'desktop' ? 'header' : 'header-mobile';
        const header = document.getElementById(idHeader);
        //const vshare = document.getElementById('v-share');
        const userMenu = document.getElementById('user-menu');
        const wrapper = document.getElementById('wrapper');
        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener('scroll', () => {
                const { isScrollDown, isScrollUp } = this.onScrollHandler(
                    header,
                    headerHeigth,
                    //vshare,
                    userMenu,
                    wrapper
                );
                this.setState({
                    scrollDirection: { isScrollDown, isScrollUp }
                });
            });
        }
    }

    toglleDesplegable = () => {
        document.body.classList.contains('dropdown')
            ? document.body.classList.remove('dropdown')
            : document.body.classList.add('dropdown');
    };

    // TODO: Hacer refactor del siguiente metodo
    onScrollHandler = (header, height, userMenu, wrapper) => {
        let isScrollDown = false;
        let isScrollUp = false;
        const scrollPos = window.scrollY;
        const { classList } = header;
        const vshare = document.getElementById('v-share');

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
            if (scrollPos < 10) {
                if (vshare) vshare.classList.remove(CLASS_SCROLL_UP);
                classList.remove(CLASS_SCROLL_UP);
                classList.remove(CLASS_SCROLL_DOWN);
                wrapper.classList.remove(CLASS_SCROLL_UP);
            }
        } else {
        }
        lastScrollPosition = scrollPos;

        return { isScrollDown, isScrollUp };
    };

    render() {
        const {
            outputType,
            screenUtils,
            logueado,
            loginData,
            goToLogout,
            headerDark,
            siteProperties: { host }
        } = this.props;
        const { scrollDirection } = this.state;
        const isMobile = screenUtils.device !== 'desktop';

        if (outputType === 'amp')
            return <HeaderAMP toglleDesplegable={this.toglleDesplegable} />;

        return (
            <>
                {!isMobile && (
                    <HeaderDesktop
                        toglleDesplegable={this.toglleDesplegable}
                        logueado={logueado}
                        loginData={loginData}
                        showNav
                        goToLogout={goToLogout}
                        host={host}
                        headerDark={headerDark}
                    />
                )}
                {isMobile && (
                    <>
                        <HeaderMobile loginData={loginData} host={host} />
                        <NavBarMobile
                            toglleDesplegable={this.toglleDesplegable}
                            showNav={
                                scrollDirection.isScrollDown
                                    ? ` ${CLASS_SCROLL_DOWN}`
                                    : ''
                            }
                        />
                    </>
                )}
                <Desplegable toglleDesplegable={this.toglleDesplegable} />
            </>
        );
    }
}

Index.propTypes = {
    outputType: PropTypes.string.isRequired,
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
    }).isRequired,
    headerDark: PropTypes.string.isRequired
};

// Index.defaultProps = {
//     logueado: false
// };

export default withLoginData(WithScreenUtils(Consumer(Index)));
