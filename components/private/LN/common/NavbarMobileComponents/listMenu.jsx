import React from 'react';
import Item from './item';
import navBarItems from './navbarConfig.json';

// eslint-disable-next-line react/prop-types
export default function ListMenu() {
    const items = [];
    navBarItems.forEach(el => items.push(<Item {...el} />));

    return (
        <nav className="com-nav-mobile">
            <div className="row">
                {items}
                <button className="col-2 item-foo">
                    <i className="icon-menu"></i>
                    <p>Menú</p>
                </button>
            </div>
        </nav>
    );
}
