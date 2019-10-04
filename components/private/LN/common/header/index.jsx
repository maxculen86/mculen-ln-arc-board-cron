import React, { Component } from 'react';
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
    componentDidMount() {
        const { device } = this.props.screenUtils;
        const idHeader = device === 'desktop' ? 'header' : 'header-mobile';
        const header = document.getElementById(idHeader);
        const vshare = document.getElementById('v-share');
        const userMenu = document.getElementById('user-menu');
        const wrap = document.getElementById('wrap');
        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener('scroll', () =>
                this.onScrollHandler(
                    header,
                    headerHeigth,
                    vshare,
                    userMenu,
                    wrap
                )
            );
        }
    }

    onScrollHandler = (header, height, vshare, userMenu, wrap) => {
        const scrollPos = window.scrollY;
        const { classList } = header;

        if (userMenu) userMenu.classList.remove(CLASS_ACTIVE);
        if (scrollPos) {
            if (scrollPos > height) {
                classList.add(CLASS_SCROLL_DOWN);
            }
            if (scrollPos < lastScrollPosition) {
                //SCROLL UP
                classList.remove(CLASS_SCROLL_DOWN);
                classList.add(CLASS_SCROLL_UP);
                if (vshare) {
                    vshare.classList.add(CLASS_SCROLL_UP);
                }
                wrap.classList.remove(CLASS_SCROLL_DOWN);
                wrap.classList.add(CLASS_SCROLL_UP);
            } else {
                //SCROLL DOWN
                classList.remove(CLASS_SCROLL_UP);
                if (vshare) {
                    vshare.classList.remove(CLASS_SCROLL_UP);
                }
                wrap.classList.remove(CLASS_SCROLL_UP);
                wrap.classList.add(CLASS_SCROLL_DOWN);
            }
        } else {
            classList.remove(CLASS_SCROLL_UP);
            classList.remove(CLASS_SCROLL_DOWN);
            wrap.classList.remove(CLASS_SCROLL_UP);
        }
        lastScrollPosition = scrollPos;
    };

    render() {
        const { screenUtils, logueado, loginData, goToLogout } = this.props;
        const isMobile = screenUtils.device !== 'desktop';
        return (
            <>
                {!isMobile && (
                    <HeaderDesktop
                        logueado={logueado}
                        loginData={loginData}
                        goToLogout={goToLogout}
                    />
                )}
                {isMobile && (
                    <>
                        <HeaderMobile loginData={loginData} />
                        <NavBarMobile />
                    </>
                )}
            </>
        );
    }
}

export default withLoginData(WithScreenUtils(Index));
