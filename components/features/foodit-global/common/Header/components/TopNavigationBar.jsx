import React from 'react';
import { Topnavigationbar } from '@ln/foodit-ui-topnavigationbar';
import { Dropdown } from '@ln/common-ui-dropdown';

const TopNavigationBar = () => {
    //TODO: contenido de dropdowns, eventos para registrar clicks.
    return (
        <Topnavigationbar className="lg-only">
            <Dropdown>
                <Dropdown.Toggle
                    onClick={() => console.log('COCINAR')}
                    className="ai-center roboto-bold text-14"
                >
                    COCINAR
                </Dropdown.Toggle>
                <Dropdown.Menu
                    alignment="left"
                    className="bg-light-1 p-24 rounded-16 shadow-center"
                >
                    <ul>
                        <li>Este es el menu 1</li>
                        <li>Este es el menu 2</li>
                        <li>Este es el menu 3</li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle
                    onClick={() => console.log('APRENDER')}
                    className="ai-center roboto-bold text-14"
                >
                    APRENDER
                </Dropdown.Toggle>
                <Dropdown.Menu
                    alignment="center"
                    className="bg-light-1 p-24 rounded-16 shadow-center"
                >
                    <ul>
                        <li>Este es el menu 1</li>
                        <li>Este es el menu 2</li>
                        <li>Este es el menu 3</li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle
                    onClick={() => console.log('DESCUBRIR')}
                    className="ai-center roboto-bold text-14"
                >
                    DESCUBRIR
                </Dropdown.Toggle>
                <Dropdown.Menu
                    alignment="right"
                    className="bg-light-1 p-24 rounded-16 shadow-center"
                >
                    <ul>
                        <li>Este es el menu 1</li>
                        <li>Este es el menu 2</li>
                        <li>Este es el menu 3</li>
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </Topnavigationbar>
    );
};

export default TopNavigationBar;
