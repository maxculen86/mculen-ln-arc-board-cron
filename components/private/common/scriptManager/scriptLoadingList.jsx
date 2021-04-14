/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from '../utils/get';

const ScriptLoadingList = ({
    arcSite: website = 'la-nacion-ar',
    location = 'body-bottom'
}) => {
    const data = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        transform: resp => {
            return get(resp, 'site.script_loading_list', []);
        },
        filter: `{
            site {
                script_loading_list
            }
        }`
    });

    return data.map(scriptConfig => {
        try {
            const scriptData = JSON.parse(scriptConfig);
            const { location: _location = 'body-bottom' } = scriptData;
            delete scriptData.location;

            return location === _location && <script {...scriptData} />;
        } catch (error) {
            console.log('🚀 ~ file: scriptLoadingList ~ error', error);
            return <></>;
        }
    });
};

ScriptLoadingList.propTypes = {
    arcSite: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default ScriptLoadingList;
