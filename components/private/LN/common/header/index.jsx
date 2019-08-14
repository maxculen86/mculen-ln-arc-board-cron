import React, { Component } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
var lastScrollPosition = 0;
export default class Index extends Component {
    state = {
        isMobile: false
    };

    onScrollHandler = header => {
        const scrollPos = window.scrollY;
        const classList = header.classList;
        if (scrollPos) {
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
            classList.remove(CLASS_SCROLL_UP);
            classList.remove(CLASS_SCROLL_DOWN);
        }
    };

    componentDidMount() {
        const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
        const isMobile = viewportWidth < 1024;

        this.setState({
            isMobile
        });

        const idHeader = isMobile ? 'header-mobile' : 'header';
        const header = document.getElementById(idHeader);
        window.addEventListener('scroll', () => this.onScrollHandler(header));
    }

    render() {
        return (
            <>
                {!this.state.isMobile && <HeaderDesktop />}
                {this.state.isMobile && <HeaderMobile />}
            </>
        );
    }
}
