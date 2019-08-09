import React, { Component } from 'react';
import NavbarMobileContainer from '../features/LN-home/navbarMobile';

const layoutItems = ['Bloque1', 'Bloque2'];

class LNHomeLayout extends Component {
    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://static.glanacion.com/v2/ln/css/501afc6b3a82043455a906024435b42f.min.css"
                />
                {this.props.children[0]}
                {this.props.children[1]}
                <NavbarMobileContainer data="Algo lo que sea 2" />
            </>
        );
    }
}

LNHomeLayout.sections = layoutItems;

export default LNHomeLayout;
