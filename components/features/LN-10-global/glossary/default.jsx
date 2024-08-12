import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import Tooltip from './components/tooltip';
import Dialog from './components/dialog';
import HandleGlossaryScript from '../../../private/common/scriptManager/handleGlossary';

const Glossary = () => {
    const { globalContent } = useAppContext();

    const glossaryData = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );

    if (!glossaryData.length) {
        return null;
    }

    return (
        <>
            <Tooltip glossaryData={glossaryData} />
            <Dialog glossaryData={glossaryData} />
            <HandleGlossaryScript />
        </>
    );
};

export default Glossary;
