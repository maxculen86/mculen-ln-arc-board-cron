import React from 'react';
import PropTypes from 'fusion:prop-types';
import ItemHome from './itemHome';
import ItemClub from './itemClub';
import ItemMiCuenta from './itemMiCuenta';
import Desplegable from '../desplegable';
import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

const ListMenu = ({ showNav }) => {
    const toglleDesplegable = () => {
        document.body.classList.contains('dropdown')
            ? document.body.classList.remove('dropdown')
            : document.body.classList.add('dropdown');
    };

    return (
        <>
            <Desplegable toglleDesplegable={toglleDesplegable} />
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
        </>
    );
};

ListMenu.propTypes = {
    showNav: PropTypes.string.isRequired
};

export default ListMenu;
