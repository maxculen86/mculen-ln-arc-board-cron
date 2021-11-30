import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/icon';

import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ toglleDesplegable, amp, isHome }) => {
    return (
        <nav className="com-nav-mobile">
            <div className="row">
                <Icon
                    name="home"
                    href={isHome ? '#' : 'https://www.lanacion.com.ar/'}
                    target="_top"
                    extraClass="col-3 item-foo nacion-home"
                >
                    <p>Home</p>
                </Icon>

                {amp ? (
                    <button
                        type="button"
                        className="col-3 item-foo"
                        on="tap:sidebar-left.toggle"
                    >
                        <Icon name="sections" />
                        <p>Secciones</p>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="col-3 item-foo"
                        onClick={toglleDesplegable}
                    >
                        <Icon name="sections" />
                        <p>Secciones</p>
                    </button>
                )}

                <Icon
                    name="club-card"
                    href="https://club.lanacion.com.ar/"
                    extraClass="col-3 item-foo"
                >
                    <p>Club LA NACION</p>
                </Icon>

                <Icon
                    name="user"
                    href="https://myaccount.lanacion.com.ar/mi-usuario/"
                    extraClass="col-3 item-foo"
                >
                    <p>Mi Cuenta</p>
                </Icon>
            </div>
        </nav>
    );
};

ListMenu.propTypes = {
    // showNav: PropTypes.string.isRequired,
    isHome: PropTypes.bool.isRequired,
    amp: PropTypes.bool,
    toglleDesplegable: PropTypes.func.isRequired
};

ListMenu.defaultProps = {
    amp: false
};

export default ListMenu;
