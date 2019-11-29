import React from 'react';
import PropTypes from 'fusion:prop-types';
import ItemHome from './itemHome';
import ItemClub from './itemClub';
import ItemMiCuenta from './itemMiCuenta';
import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ showNav, toglleDesplegable }) => {
    return (
        <nav className={`com-nav-mobile${showNav}`}>
            <div className="row">
                <ItemHome />
                <ItemClub />
                <ItemMiCuenta />
                <button
                    type="button"
                    className="col-2 item-foo"
                    onClick={toglleDesplegable}
                >
                    <i className="icon-menu" />
                    <p>Menú</p>
                </button>
            </div>
        </nav>
    );
};

ListMenu.propTypes = {
    showNav: PropTypes.string.isRequired,
    toglleDesplegable: PropTypes.func.isRequired
};

export default ListMenu;
