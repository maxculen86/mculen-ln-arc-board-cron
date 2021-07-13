/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import get from '../utils/get';

const TagsLoadingList = ({
    arcSite: website = 'la-nacion-ar',
    location = 'body-bottom',
    section,
    Tag
}) => {
    if (!Tag) return <></>;

    const resp = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        filter: `{
            site {
                ${Tag}_loading_list
            }
        }`,
        transform: data => get(data, `site.${Tag}_loading_list`, [])
    });

    return resp.map(scriptConfig => {
        try {
            const scriptData = JSON.parse(scriptConfig);
            const {
                location: _location = 'body-bottom',
                section: _section
            } = scriptData;

            delete scriptData.location;
            delete scriptData.section;

            return (
                section === _section &&
                location === _location && <Tag {...scriptData} />
            );
        } catch (error) {
            console.log('🚀 ~ file: tagsLoadingList ~ error', error);
            return <></>;
        }
    });
};

TagsLoadingList.propTypes = {
    arcSite: PropTypes.string.isRequired,
    location: PropTypes.string,
    section: PropTypes.string
};

TagsLoadingList.defaultProps = { section: '' };

export default TagsLoadingList;
