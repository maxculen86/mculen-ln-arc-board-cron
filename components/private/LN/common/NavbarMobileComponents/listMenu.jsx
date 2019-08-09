import React from 'react';
import Item from './item';

// eslint-disable-next-line react/prop-types
export default function ListMenu({ data }) {
    return (
        <nav className={data}>
            <div className="row">
                <Item
                    href="#"
                    colClass="col-2"
                    iconClass="icon-home"
                    description="Home"
                />
                <Item
                    href="#"
                    colClass="col-4"
                    iconClass="icon-club"
                    description="Club LA NACION"
                />
                <Item
                    href="#"
                    colClass="col-3"
                    iconClass="icon-comment"
                    description="Mi cuenta"
                />
                <button class="col-2 item-foo">
                    <i class="icon-menu"></i>
                    <p>Menú</p>
                </button>
            </div>
        </nav>
    );
}
