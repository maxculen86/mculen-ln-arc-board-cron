import React from 'react';
import { useAppContext } from 'fusion:context';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import { getLiveBlogEditorialDataApertura } from '../_helpers/liveblogEditorialApertura';
import LiveBlogOpening from './apertura/LiveBlogOpening';
import LiveBlogBody from './body/LiveBlogBody';

function LiveBlogEditorial({ children }) {
    const { globalContent } = useAppContext();
    const { dataMedia, dataDescripcion, dataEpigraph, dataDateTime } =
        getLiveBlogEditorialDataApertura(globalContent, children);

    return (
        <BaseLayout className="liveblog-editorial">
            <main className="relative" style={{ paddingTop: '0' }}>
                {/* ---- BANNERS ---- */}
                <div className="bg-neutral-dark-1 w-100 pt-65 -mt-65 pt-118_m -mt-87_m -mt-57_l pt-80_l pb-24_m">
                    {children[0]}
                </div>
                {/* ---- APERTURA ---- */}
                <LiveBlogEditorial.Opening data={dataEpigraph}>
                    <LiveBlogOpening.Description data={dataDescripcion} />
                    <LiveBlogOpening.Media data={dataMedia} />
                </LiveBlogEditorial.Opening>
                <div className="lay-sidebar pt-16 pt-32_m">
                    <div className="row">
                        {/* ---- CUERPO ---- */}
                        <LiveBlogEditorial.Body>
                            <LiveBlogBody.Top dateTime={dataDateTime} />
                            {children[2]}
                        </LiveBlogEditorial.Body>
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

LiveBlogEditorial.Opening = LiveBlogOpening;
LiveBlogEditorial.Body = LiveBlogBody;

export default LiveBlogEditorial;
