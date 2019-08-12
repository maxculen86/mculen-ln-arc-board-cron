import React from 'react';
import PropTypes from 'fusion:prop-types';

const ArticleItem = ({ e }) => (
    <article className="mod-caja-nota --border">
        <section id="" className="cont-figure">
            <a href={e.href} className="figure">
                <picture id="" className="content-pic picture">
                    <img src={e.imgSrc} alt="" className="content-img" />
                </picture>
            </a>
        </section>
        <div className="mod-caja-nota__descrip">
            <h2 className="com-title-acu">
                <a href={e.href}>
                    <b>{`${e.volanta} `}</b>
                    {e.titulo}
                </a>
            </h2>
        </div>
    </article>
);

ArticleItem.propTypes = {
    e: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ArticleItem;
