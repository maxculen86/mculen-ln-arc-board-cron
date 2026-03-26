import React from 'react';
import Text from './text';
import ComTitle from './com-title';
import ComDate from './com-date';
import ComTag from './com-tag';
import getBadge from './utils/getBadge';
import ComImage from './com-image';
import '../../../resources/dist/css/ln/components/mod-description.css';

function ModDescription({
    link,
    titleTag = 'h2',
    titleSize = '--l',
    titleText,
    titleWeight,
    authorSize = '4xs',
    authors,
    subheadText = false,
    subheadSize = '2xs',
    subheadTag = 'h3',
    dateText,
    label,
    lead,
    marquesina,
    category,
    tags,
    contentRestrictions: { content_code: contentCode } = {
        content_code: 'comun'
    },
    dataAuthors,
    categoryNote = '',
    layoutPageBuilder,
    rating
}) {
    const withMarquee = !!(marquesina || authors);
    const { name: categoryName, path: categoryPath } = category || {};

    const isAcu = layoutPageBuilder === 'LN-acumulado';

    return (
        <section className="mod-description">
            {isAcu && getBadge(contentCode, label, rating)}
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
                weight={titleWeight}
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
                            dataAuthors.map(({ image, name = '' }) =>
                                !image || dataAuthors.length > 1 ? null : (
                                    <ComImage
                                        classCondition="--author"
                                        src={image}
                                        alt={name}
                                    />
                                )
                            )}
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
}

export default ModDescription;
