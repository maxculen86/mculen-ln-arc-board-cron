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
        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            window.addEventListener('scroll', () =>
                this.onScrollHandler(header, headerHeigth)
            );
        }
    }

    onScrollHandler = (header, height) => {
        const scrollPos = window.scrollY;
        const { classList } = header;
        const vshare = document.getElementById('v-share');
        const usermenu = document.getElementById('user-menu');
        const wrap = document.getElementById('wrap');

        const content = document.getElementById("content-main");
        const sticky2 = document.getElementById("sticky2_mob");

        if (usermenu) usermenu.classList.remove(CLASS_ACTIVE);
        if (scrollPos) {
            if (scrollPos > height) {
                classList.add(CLASS_SCROLL_DOWN);
            }
            const topContent = content.offsetTop;
            if (scrollPos > topContent) {
                sticky2.classList.add(CLASS_ACTIVE);
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
            sticky2.classList.remove(CLASS_ACTIVE);
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
