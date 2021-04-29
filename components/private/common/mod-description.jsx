import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from './com-title';
import ComDate from './com-date';
import ModBajada from './mod-bajada';
import ModMarquesina from './mod-marquee';
import ComLabel from './com-labelArticle';
import ComTag from './com-tag';

const ModDescription = props => {
    const {
        link,
        titleTag,
        titleSize,
        titleText,
        authorSize,
        authors,
        subheadText,
        subheadSize,
        dateText,
        label,
        lead,
        marquesina,
        category,
        tags
    } = props;
    const withMarquee = !!(marquesina || authors);
    const { name: categoryName, path: categoryPath } = category || {};

    return (
        <section className="mod-description">
            {label && <ComLabel labelArticle={label} />}
            <ComTitle
                tag={titleTag || 'h2'}
                size={titleSize || '--xs'}
                link={link}
                content={titleText}
                lead={lead}
            />

            {subheadText && (
                <ModBajada
                    link={link}
                    subheadSize={subheadSize}
                    subheadText={subheadText}
                />
            )}
            <div>
                {withMarquee && (
                    <ModMarquesina
                        text={marquesina || authors}
                        size={authorSize}
                        link={link}
                    />
                )}
                {category && (
                    <ComTag
                        iconName={withMarquee && 'bullet'}
                        content={categoryName}
                        sizeText="--fourxs"
                        sizeBullet={withMarquee && '--fourxs'}
                        link={`${categoryPath}/`}
                        classCondition="--tags"
                    />
                )}
                {tags &&
                    tags.map(item => {
                        const { text, slug } = item;
                        return (
                            <ComTag
                                iconName={
                                    (withMarquee || !!category) && 'bullet'
                                }
                                content={text}
                                sizeText="--fourxs"
                                sizeBullet={
                                    (withMarquee || !!category) && '--fourxs'
                                }
                                link={(slug && `/tema/${slug}/`) || ''}
                                classCondition="--tags"
                            />
                        );
                    })}
            </div>

            {dateText && <ComDate display_date={dateText} size="--fourxs" />}
        </section>
    );
};

ModDescription.propTypes = {
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    authorSize: PropTypes.string.isRequired,
    subheadText: PropTypes.string,
    subheadSize: PropTypes.string,
    dateText: PropTypes.string,
    label: PropTypes.string,
    lead: PropTypes.string,
    authors: PropTypes.string,
    marquesina: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.obj)
};

ModDescription.defaultProps = {
    titleTag: 'h4',
    titleSize: '--xs',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    label: undefined,
    lead: undefined,
    authors: undefined,
    link: undefined,
    marquesina: undefined,
    category: undefined,
    tags: undefined
};

export default ModDescription;
