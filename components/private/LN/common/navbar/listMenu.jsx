/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import React from 'react';
import ItemHome from './itemHome';
import ItemClub from './itemClub';
import ItemMiCuenta from './itemMiCuenta';

import '../../../../../resources/dist/css/ln/components/nav-mobile.css';

// eslint-disable-next-line react/prop-types
export default function ListMenu() {
    return (
        <nav className="com-nav-mobile">
            <div className="row">
                <ItemHome />
                <ItemClub />
                <ItemMiCuenta />
                <button className="col-2 item-foo">
                    <i className="icon-menu"></i>
                    <p>Menú</p>
                </button>
            </div>
        </nav>
    );
}
