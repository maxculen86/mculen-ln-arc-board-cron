import React from 'react';
import Picture from '../../../../common/picture';
import Source from '../../../../common/pictureSource';

export default function ArticleImage(props) {
    const desktop = props.imgUrls.find(m => m.name === 'desktop').url;
    const mobile = props.imgUrls.find(m => m.name === 'mobile').url;
    return (
        <a className="figure" href={props.url}>
            <Picture className="content-picture">
                <Source
                    media="(min-width: 54.000em)"
                    srcSet={desktop}
                    className="img-desktop"
                    alt="imagen-destacada"
                />
                <Source
                    media="(min-width: 20.000em)"
                    srcSet={mobile}
                    className="img-mobile"
                    alt="imagen-destacada"
                />
                <img alt="imagen-destacada" />
            </Picture>
        </a>
    );
}
