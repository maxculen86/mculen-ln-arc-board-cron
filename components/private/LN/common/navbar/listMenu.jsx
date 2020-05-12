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
                <button
                    type="button"
                    className="col-3 item-foo"
                    onClick={toglleDesplegable}
                >
                    <i className="icon-sections" />
                    <p>Secciones</p>
                </button>
                <ItemClub />
                <ItemMiCuenta />
            </div>
        </nav>
    );
};

ListMenu.propTypes = {
    showNav: PropTypes.string.isRequired,
    toglleDesplegable: PropTypes.func.isRequired
};

export default ListMenu;
