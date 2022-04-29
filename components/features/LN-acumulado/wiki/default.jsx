import React from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import Wikitag from '../../../private/LN/acumulado/wiki/WikiTag';

const WikiFeature = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: { type: 'person' }
    });

    return isWiki && <Wikitag />;
};

WikiFeature.label = 'LN-Acumulado-WikiTag';
WikiFeature.static = true;

export default WikiFeature;
