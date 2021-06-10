// import ListMenu from './listMenu';

import React from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from '../../../common/icon';

import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ toglleDesplegable, amp }) => {
    return (
        //<nav className={`com-nav-mobile${showNav}`}>
        <nav className={`com-nav-mobile`}>
            <div className="row">
                <Icon
                    name="home"
                    href="https://www.lanacion.com.ar/"
                    mod="col-3 item-foo"
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
                    name="club"
                    href="https://club.lanacion.com.ar/"
                    mod="col-3 item-foo"
                >
                    <p>Club LA NACION</p>
                </Icon>

                <Icon
                    name="user"
                    href="https://myaccount.lanacion.com.ar/mi-usuario/"
                    mod="col-3 item-foo"
                >
                    <p>Mi Cuenta</p>
                </Icon>
            </div>
        </nav>
    );
};

ListMenu.propTypes = {
    //showNav: PropTypes.string.isRequired,
    toglleDesplegable: PropTypes.func.isRequired
};

export default ListMenu;
