import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import PropTypes from 'prop-types';
import BreadcrumbArticle from '../../../../features/LN-nota/breadcrumbArticle';
import ReadingTime from '../../../../features/LN-10-global/common/readingTime/default';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

function DescriptionVideo100({ data }) {
    if (!data || !data.title) return null;
    const { date, time, title } = data;
    return (
        <div className="grid-col-1-7_md grid-col-1-6_md grid-col-1-8_lg grid-row-1_md bg-neutral-dark-1 py-32">
            <div className="lay flex flex-column ai-center gap-16 h-100 ai-start_m container">
                <div className="flex flex-column w-100 prumo text-28 text-start_m text-40_md text-48_lg">
                    <BreadcrumbArticle
                        className="--arial"
                        colorCategory="#85B4FE"
                    />
                    <Text
                        as="h1"
                        className="prumo font-bold text-neutral-light-1"
                    >
                        {title}
                    </Text>
                </div>
                <div className="flex w-100 gap-24">
                    <div className="flex ai-center text-neutral-light-1">
                        <Text as="p">{date}</Text>
                        <Icon size={24}>
                            <IconSprite name="bulletXs" />
                        </Icon>
                        <Text as="p">{time}</Text>
                    </div>
                    <ReadingTime isLight />
                </div>
            </div>
        </div>
    );
}

DescriptionVideo100.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string
    }).isRequired
};

export default DescriptionVideo100;
