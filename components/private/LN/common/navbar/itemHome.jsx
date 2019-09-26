/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function ItemHome() {
    return (
        <a
            href="https://www.lanacion.com.ar/"
            // antes era col-2 cuando vuelva MENU
            className="col-4 item-foo"
        >
            <i className="icon-home" />
            <p>Home</p>
        </a>
    );
}
