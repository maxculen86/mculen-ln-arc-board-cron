import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GlobalProvider from '../../private/common/context/globalContext';
import NotaCards from './components/notaCards';

function LnNotaCards({ children, layout, outputType }) {
    return (
        <GlobalProvider>
            <NotaCards outputType={outputType} layout={layout}>
                {children}
            </NotaCards>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Banners',
    'Apertura',
    'Cuerpo',
    'Tercera',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaCards.sections = pageBuilderSections;

LnNotaCards.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(LnNotaCards);
