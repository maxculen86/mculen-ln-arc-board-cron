/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import getProperties from 'fusion:properties';
import ComTitle from './com-title';
import get from './utils/get';

function Editoriales({
    articles = [],
    title = '',
    link = '',
    layout = 'editoriales2',
    arcSite = 'la-nacion-ar',
    handleClick
}) {
    const { cajaTemaConfig } = getProperties(arcSite);
    const _articles = articles.map((article, index) => {
        const { headlines, website_url: websiteUrl } = article;
        const titleText = get(headlines, 'mobile') || get(headlines, 'basic');
        const { titleSize } = get(
            cajaTemaConfig,
            `[${layout}].articles[${index}]`,
            {}
        );

        return {
            link: websiteUrl,
            textname: titleText,
            title: titleText,
            size: titleSize,
            id: article._id
        };
    });

    const onCLick = event => {
        if (typeof handleClick === 'function') {
            handleClick(event);
        }
    };

    const extraOpts = {};
    return (
        <>
            <ComTitle
                content={title}
                link={link}
                size={get(cajaTemaConfig, `[${layout}].headerSize`, {})}
            />
            {(_articles && articles.length && (
                <div className="col-12">
                    {_articles.map((element, i) => {
                        extraOpts['data-pos'] = `990${i + 1}`;
                        extraOpts['data-id'] = element.id;
                        extraOpts['data-notaid'] = element.id;
                        extraOpts['data-source'] = 'editor';
                        return (
                            <article
                                className="mod-article"
                                {...extraOpts}
                                onClick={onCLick}
                                onAuxClick={onCLick}
                            >
                                <div className="mod-description">
                                    <h2 className="com-title --twoxs">
                                        <a
                                            href={element.link}
                                            className="com-link"
                                            title={element.title}
                                        >
                                            {element.title}
                                        </a>
                                    </h2>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )) ||
                null}
        </>
    );
}

export default Editoriales;
