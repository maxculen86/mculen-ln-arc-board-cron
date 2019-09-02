/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

const layoutItems = ['Bloque1', 'Bloque2'];

// eslint-disable-next-line react/prefer-stateless-function
class LNHomeLayout extends Component {
    render() {
        return (
            <>
                <Header />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://static.glanacion.com/v2/ln/css/501afc6b3a82043455a906024435b42f.min.css"
                />
                {this.props.children[0]}
                {this.props.children[1]}
                <Footer />
            </>
        );
    }
}

LNHomeLayout.sections = layoutItems;

export default LNHomeLayout;
