import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { pipe } from '../../../common/utils/functional';
import ListMenu from './listMenu';
import ComLogo from '../../../common/com-logo';
import ComButton from '../../../common/com-button';

import '../../../../../resources/dist/css/ln/components/dropdown.css';

const scrollActive = 'scroll--active';
const scrollPasive = 'scroll--pasive';

const handleScroll = comDromdownRef => {
    comDromdownRef && comDromdownRef.current.scrollTop === 0
        ? pipe(
              comDromdownRef.current.classList.add(scrollPasive),
              comDromdownRef.current.classList.remove(scrollActive)
          )
        : pipe(
              comDromdownRef.current.classList.add(scrollActive),
              comDromdownRef.current.classList.remove(scrollPasive)
          );
};

const Desplegable = ({ toglleDesplegable, isHome }) => {
    const despegableRef = useRef();
    const comDromdownRef = useRef();

    useEffect(() => {
        window &&
            window.addEventListener('resize', e => {
                if (window.outerWidth >= 768 && comDromdownRef.current) {
                    comDromdownRef.current.classList.remove(scrollPasive);
                    comDromdownRef.current.classList.remove(scrollActive);
                }
            });
    });

    return (
        <div
            className="wrap-dropdown"
            ref={despegableRef}
            onScroll={() => {
                return handleScroll(comDromdownRef);
            }}
            role="button"
            tabIndex="0"
        >
            <div
                aria-label="overrlay"
                className="overlay"
                role="button"
                tabIndex="0"
                onMouseDown={toglleDesplegable}
            />
            <div className="com-dropdown" ref={comDromdownRef}>
                <section className="header__dropdown">
                    <ComLogo
                        color
                        logoName="la-nacion"
                        classCondition="nacion-home"
                        href={isHome ? '#' : 'https://www.lanacion.com.ar/'}
                        target="_top"
                        title="Ir a la página principal"
                    />
                    {/* <LogoLN /> */}
                    <ComButton
                        iconName="close"
                        title="Cerrar"
                        tabIndex="0"
                        onMouseDown={toglleDesplegable}
                    />
                </section>
                <section className="menu__dropdown">
                    <nav className="nav__dropdown">
                        <ListMenu />
                    </nav>
                </section>
            </div>
        </div>
    );
};

Desplegable.propTypes = {
    toglleDesplegable: PropTypes.func.isRequired,
    isHome: PropTypes.bool.isRequired
};

export default Desplegable;
