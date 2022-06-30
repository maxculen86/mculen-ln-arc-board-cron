import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import Text from './text';
import ComTitle from './com-title';
import ComDate from './com-date';
import ComTag from './com-tag';
import getBadge from './utils/getBadge';
import ComImage from './com-image';
import '../../../resources/dist/css/ln/components/mod-description.css';

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
        subheadTag,
        dateText,
        label,
        lead,
        marquesina,
        category,
        tags,
        contentRestrictions: { content_code: contentCode },
        dataAuthors,
        categoryNote
    } = props;
    const { layout: layoutPageBuilder } = useAppContext();

    const withMarquee = !!(marquesina || authors);
    const { name: categoryName, path: categoryPath } = category || {};

    const isHomeOrAcu =
        layoutPageBuilder === 'LN-Home_Main' ||
        layoutPageBuilder === 'LN-acumulado';

    return (
        <section className="mod-description">
            {isHomeOrAcu && getBadge(contentCode, label)}
            {categoryNote && (
                <Text
                    extraClass="category-note"
                    size="4xs"
                    text={categoryNote}
                />
            )}
            <ComTitle
                tag={titleTag}
                size={titleSize}
                link={link}
                content={titleText}
                lead={lead}
            />
            {subheadText && (
                <Text
                    tag={subheadTag}
                    extraClass="com-subhead"
                    size={subheadSize}
                    text={subheadText}
                    link={link}
                />
            )}
            <div>
                {withMarquee && (
                    <>
                        {dataAuthors &&
                            dataAuthors.map(({ image, name = '' }) => {
                                return !image || dataAuthors.length > 1 ? (
                                    <></>
                                ) : (
                                    <ComImage
                                        classCondition="--author"
                                        src={image}
                                        alt={name}
                                    />
                                );
                            })}
                        <Text
                            tag="strong"
                            extraClass="mod-marquee"
                            size={authorSize}
                            text={marquesina || authors}
                            link={link}
                        />
                    </>
                )}
                {category && (
                    <ComTag
                        iconName={withMarquee && '--bullet'}
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
                                key={slug}
                                iconName={
                                    (withMarquee || !!category) && '--bullet'
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
    authors: PropTypes.string,
    authorSize: PropTypes.string,
    category: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    dateText: PropTypes.string,
    label: PropTypes.shape({
        text: PropTypes.string,
        style: PropTypes.string
    }),
    link: PropTypes.string,
    lead: PropTypes.string,
    marquesina: PropTypes.string,
    subheadSize: PropTypes.string,
    subheadTag: PropTypes.string,
    subheadText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tags: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.object)
    ]),
    titleSize: PropTypes.string,
    titleTag: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    contentRestrictions: PropTypes.shape({
        content_code: PropTypes.shape({
            contentCode: PropTypes.string
        })
    }),
    dataAuthors: PropTypes.arrayOf(PropTypes.object),
    categoryNote: PropTypes.string
};

ModDescription.defaultProps = {
    authors: undefined,
    authorSize: '4xs',
    category: undefined,
    dateText: undefined,
    label: undefined,
    lead: undefined,
    link: undefined,
    marquesina: undefined,
    subheadSize: '2xs',
    subheadTag: 'h3',
    subheadText: false,
    tags: undefined,
    titleSize: '--xs',
    titleTag: 'h2',
    contentRestrictions: {
        content_code: 'comun'
    },
    dataAuthors: undefined,
    categoryNote: ''
};

export default ModDescription;
