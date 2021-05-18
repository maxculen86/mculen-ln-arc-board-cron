import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import ComLinkList from './com-link-list';
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
                <ComLinkList isEditoriales list={_articles} />
            )) || <></>}
        </section>
    );
};

Editoriales.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.obj),
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
