import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';

const WikiFeature = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: { type: 'person', imageConfig: 'wikiTag' }
    });

    const {
        image: { resizedUrls = [], url = '', alt = '' }
    } = wikiSourceData;

    return isWiki && <>Texto de prueba para wiki</>;
};

WikiFeature.label = 'LN-Acumulado-WikiTag';
WikiFeature.static = true;

export default WikiFeature;
