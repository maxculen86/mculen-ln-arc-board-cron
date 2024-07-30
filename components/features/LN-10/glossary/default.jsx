import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Collapse } from './components/collapse';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { useAppContext } from 'fusion:context';
import { Dialog } from './components/dialog';
import { Tooltip } from './components/tooltip';
import get from '../../../private/common/utils/get';

import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

const Glossary = ({ customFields: { hide } = {} }) => {
    const { globalContent } = useAppContext();

    const glossaryData = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );

    if (hide || !glossaryData.length) {
        return null;
    }

    return (
        <>
            <Collapse glossaryData={glossaryData} />
            <Dialog glossaryData={glossaryData} />
            <Tooltip glossaryData={glossaryData} />
        </>
    );
};

Glossary.label = 'LN-Glosario';

Glossary.propTypes = {
    customFields: PropTypes.shape({
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del glosario',
            default: false,
            group: groupCustomFields
        })
    })
};

Glossary.defaultProps = {
    customFields: {
        hide: false
    }
};

export default Glossary;
