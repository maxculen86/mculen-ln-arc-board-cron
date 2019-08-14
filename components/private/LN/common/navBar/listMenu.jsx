import React from 'react';
import Item from './item';

export default function ListMenu() {
    return (
        <nav className="com-nav-mobile">
            <div className="row">
                <Item
                    href="/"
                    colClass="col-2"
                    iconClass="icon-home"
                    description="Home"
                />
                <Item
                    href="/"
                    colClass="col-4"
                    iconClass="icon-club"
                    description="Club LA NACION"
                />
                <Item
                    href="/"
                    colClass="col-3"
                    iconClass="icon-comment"
                    description="Mi Cuenta"
                />
                <button className="col-2 item-foo">
                    <i className="icon-menu"></i>
                    <p>Menú</p>
                </button>
            </div>
        </nav>
    );
}
