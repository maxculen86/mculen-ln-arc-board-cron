import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import PropTypes from 'prop-types';
import BreadcrumbArticle from '../../../../features/LN-nota/breadcrumbArticle';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import StaticContentV2 from '../../../../chains/LN10-global/staticContentV2';

function DescriptionVideo100({ data }) {
    if (!data || !data.title) return null;
    const { date, time, title } = data;

    return (
        <StaticContentV2>
            <div className="bg-neutral-dark-1 pt-16 pt-24_m pb-24 pb-32_m">
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
                    </div>
                </div>
            </div>
        </StaticContentV2>
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
