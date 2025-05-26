import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import { getLiveBlogEditorialDataApertura } from '../_helpers/liveblogEditorialApertura';
import LiveBlogOpening from './apertura/LiveBlogOpening';

function LiveBlogEditorial({ children }) {
    const { globalContent } = useAppContext();
    const { dataMedia, dataDescripcion, dataEpigraph } =
        getLiveBlogEditorialDataApertura(globalContent, children);

    return (
        <BaseLayout className="liveblog-editorial">
            <main id="content" className="relative" style={{ paddingTop: '0' }}>
                {/* ---- START APERTURA ---- */}
                <LiveBlogEditorial.Opening data={dataEpigraph}>
                    <LiveBlogOpening.Media data={dataMedia} />
                    <LiveBlogOpening.Description data={dataDescripcion} />
                </LiveBlogEditorial.Opening>

                {/* ---- START CUERPO ---- */}
                <section className="liveblog__cuerpo">cuerpo</section>

                {/* ---- START TERCERA COLUMNA ---- */}
                <aside className="liveblog__tercera">tercera</aside>

                {/* ---- START BOTTOM ---- */}
                <div className="liveblog__bottom">bottom</div>
            </main>
        </BaseLayout>
    );
}

LiveBlogEditorial.Opening = LiveBlogOpening;

LiveBlogEditorial.propTypes = {
    children: PropTypes.node.isRequired
};

export default LiveBlogEditorial;
