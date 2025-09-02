import React from 'react';
import PropTypes from 'prop-types';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import NotaOpening from './apertura/NotaOpening';
import NotaBody from './body/NotaBody';

function NotaCards({ children }) {
    return (
        <BaseLayout className="nota-cards">
            <main id="content" className="relative" style={{ paddingTop: '0' }}>
                {/* ---- BANNERS ---- */}
                {children[0]}

                {/* ---- APERTURA ---- */}
                <NotaCards.Opening>{children[1]}</NotaCards.Opening>

                <div className="lay-sidebar pt-16 pt-32_m">
                    <div className="row">
                        {/* ---- CUERPO ---- */}
                        <NotaCards.Body>{children[2]}</NotaCards.Body>
                    </div>
                    {/* ---- TERCERA ---- */}
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[3]}
                    </div>
                </div>

                {/* ---- BOTTOM ---- */}
                <div className="lay-sidebar">
                    <div className="sidebar__main">{children[4]}</div>
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[5]}
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
}

NotaCards.Opening = NotaOpening;
NotaCards.Body = NotaBody;

NotaCards.propTypes = {
    children: PropTypes.node.isRequired
};

export default NotaCards;
