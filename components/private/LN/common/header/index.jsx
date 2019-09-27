import React, { Component } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import NavBarMobile from '../navbar';
import WithDevice from '../hocs/withDevice';
import withLoginData from '../hocs/withLoginData';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
let lastScrollPosition = 0;
class Index extends Component {
    componentDidMount() {
        const { isMobile } = this.props;
        const idHeader = isMobile ? 'header-mobile' : 'header';
        const header = document.getElementById(idHeader);
        if (header) {
            const headerHeigth = header.clientHeight || header.offsetHeight;
            const main = document.querySelector('main');
            window.addEventListener('scroll', () =>
                this.onScrollHandler(header, main, headerHeigth)
            );
        }
    }

    onScrollHandler = (header, main, heigth) => {
        const scrollPos = window.scrollY;
        const { classList } = header;
        if (scrollPos) {
            main.style.paddingTop = `${heigth}px`;
            if (scrollPos < lastScrollPosition) {
                classList.remove(CLASS_SCROLL_DOWN);
                classList.add(CLASS_SCROLL_UP);
                //SCROLL UP
            } else {
                classList.remove(CLASS_SCROLL_UP);
                classList.add(CLASS_SCROLL_DOWN);
                //SCROLL DOWN
            }
        } else {
            //16px es el alto que viene por defecto en la clase.
            main.style.paddingTop = '16px';
            classList.remove(CLASS_SCROLL_UP);
            classList.remove(CLASS_SCROLL_DOWN);
        }
        lastScrollPosition = scrollPos;
    };

    render() {
        const { isMobile, logueado, loginData, goToLogout } = this.props;
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

export default withLoginData(WithDevice(Index));
