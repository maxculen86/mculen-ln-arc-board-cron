import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
//import ComLinkList from './com-link-list';
//import ComLink from './com-link';
import ComTitle from './com-title';
import get from './utils/get';

const Editoriales = props => {
    const { articles = [], title, link, layout, arcSite } = props;
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
    const extraOpts = {};
    return (
        <section className="mod-footersection">
            {
                <ComTitle
                    content={title}
                    link={link}
                    size={get(cajaTemaConfig, `[${layout}].headerSize`, {})}
                />
            }
            {(_articles && articles.length && (
                <>
                    {/* <ComLinkList isEditoriales list={_articles} /> */}
                    {/* <ul className="com-unordered"> */}
                    <div class="col-12">
                        {_articles.map((element, i) => {
                            extraOpts['data-pos'] = `990${i + 1}`;
                            extraOpts['data-id'] = element.id;
                            extraOpts['data-notaid'] = element.id;
                            return (
                                // <li className="item" {...extraOpts}>
                                <article className="mod-article" {...extraOpts}>
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
                                // </li>
                            );
                        })}
                    </div>
                    {/* </ul> */}
                </>
            )) || <></>}
        </section>
    );
};

Editoriales.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    layout: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    arcSite: PropTypes.string
};

Editoriales.defaultProps = {
    articles: [],
    layout: 'editoriales2',
    title: '',
    link: '',
    arcSite: 'la-nacion-ar'
};

export default Editoriales;
