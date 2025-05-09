import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GlobalProvider from '../../private/common/context/globalContext';
import PwaModal from '../../features/LN-10-global/pwaModal/default';

// eslint-disable-next-line no-unused-vars
function LnNotaLiveblogEditorial({ globalContent = {} }) {
    return (
        <GlobalProvider>
            <h1>LiveBlog</h1>
            <PwaModal />
        </GlobalProvider>
    );
}

const pageBuilderSections = ['Apertura', 'Cuerpo', 'Tercera', 'Bottom'];

LnNotaLiveblogEditorial.sections = pageBuilderSections;

LnNotaLiveblogEditorial.propTypes = {
    globalContent: PropTypes.shape({}).isRequired
};

export default Consumer(LnNotaLiveblogEditorial);
