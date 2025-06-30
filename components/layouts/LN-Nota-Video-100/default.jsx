import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GlobalProvider from '../../private/common/context/globalContext';
import NotaVideo100 from './components/notaVideo100';

function LnNotaVideo100({ children }) {
    return (
        <GlobalProvider>
            <NotaVideo100>{children}</NotaVideo100>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Banner-Megatop',
    'Pre-Titulo',
    'Apertura',
    'Left-Cuerpo',
    'Cuerpo',
    'Tercera',
    'Pos-Cuerpo',
    'Newsletter',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaVideo100.sections = pageBuilderSections;

LnNotaVideo100.propTypes = {
    children: PropTypes.node.isRequired
};

export default Consumer(LnNotaVideo100);
