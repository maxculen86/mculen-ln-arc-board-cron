import React, { Component } from 'react';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import NavBarMobile from '../navBar';
import WithDevice from '../hocs/withDevice';

const CLASS_SCROLL_UP = '--scrollUp';
const CLASS_SCROLL_DOWN = '--scrollDown';
var lastScrollPosition = 0;
class Index extends Component {
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
        lastScrollPosition = scrollPos;
    };

    componentDidMount() {
        const idHeader = this.props.isMobile ? 'header-mobile' : 'header';
        const header = document.getElementById(idHeader);
        window.addEventListener('scroll', () => this.onScrollHandler(header));
    }

    render() {
        return (
            <>
                {!this.props.isMobile && <HeaderDesktop />}
                {this.props.isMobile && (
                    <>
                        <HeaderMobile />
                        <NavBarMobile />
                    </>
                )}
            </>
        );
    }
}

export default WithDevice(Index);
