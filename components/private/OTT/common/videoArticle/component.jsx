import React from 'react';
import PropTypes from 'prop-types';
import LinkedTitle from '../../../common/linkedTitle';
import { addForwardSlash } from '../../../LN/common/utils/addForwardSlash';

function VideoArticle({ href, description, imgSrc }) {
    return (
        <article className="article">
            <a className="figure" href={addForwardSlash(href)}>
                <picture className="content-picture">
                    <source srcSet={imgSrc} />
                    <img
                        className="lazy loaded"
                        alt="imagen-destacada"
                        data-src=""
                        data-was-processed="true"
                    />
                </picture>
            </a>
            <LinkedTitle href={href} title={description} />
        </article>
    );
}

VideoArticle.propTypes = {
    href: PropTypes.string,
    description: PropTypes.string,
    imgSrc: PropTypes.string
}.isRequired;

export default VideoArticle;
