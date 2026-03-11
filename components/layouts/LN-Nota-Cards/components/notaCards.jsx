import React from 'react';
import { useAppContext } from 'fusion:context';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import { getNotaCardsAperturaData } from '../_helpers/notaCardsHelper';
import NotaOpening from './apertura/NotaOpening';
import NotaBody from './body/NotaBody';

function NotaCards({ children }) {
    const { globalContent } = useAppContext();
    const { dataMeta, dataContent } = getNotaCardsAperturaData(globalContent);

    return (
        <BaseLayout className="nota-cards">
            <main id="content" className="relative" style={{ paddingTop: '0' }}>
                {/* ---- BANNERS ---- */}
                {children[0]}

                {/* ---- APERTURA ---- */}
                <NotaCards.Opening>
                    <NotaOpening.Content data={dataContent} />
                    <NotaOpening.Meta data={dataMeta}>
                        {children[1]}
                    </NotaOpening.Meta>
                </NotaCards.Opening>

                {/* ---- CUERPO ---- */}
                <NotaCards.Body>{children[2]}</NotaCards.Body>
                {/* ---- TERCERA ---- */}
                <div className="sidebar__aside hlp-tabletlm-none">
                    {children[3]}
                </div>

                {/* ---- BOTTOM ---- */}
                <div className="lay-sidebar">
                    <div className="sidebar__main mr-auto_m ml-auto_m">
                        {children[4]}
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
}

NotaCards.Opening = NotaOpening;
NotaCards.Body = NotaBody;

export default NotaCards;
