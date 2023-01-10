/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Advance } from '@ln/contenidos-ui-advance';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import '../../../../resources/packages/css/@ln/contenidos-ui-badge/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-button/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-advance/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import '../../../../resources/packages/css/@ln/common-ui-button/index.css';

import StaticContent from '../../../private/common/staticContent';

const Anticipo = ({
    customFields: { textBadge, lead, hide, title, url, video } = {}
}) => {
    return !hide ? (
        <>
            <StaticContent>
                <Advance
                    href={url}
                    title={title}
                    lead={lead}
                    embedCode={video}
                    badgeText={textBadge || 'Anticipo'}
                    sticky
                />
            </StaticContent>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.addEventListener('DOMContentLoaded', () => {
                document.getElementById('closeAdvance').onclick = function() {
                    this.parentNode && this.parentNode.parentNode && this.parentNode.parentNode.classList.add('--close')
                };
            });
            `
                }}
            />
        </>
    ) : (
        <></>
    );
};
Anticipo.label = 'LN10 Anticipo';

Anticipo.propTypes = {
    customFields: PropTypes.shape({
        textBadge: PropTypes.string.tag({
            name: 'Texto chapita',
            description: 'Ingrese aquí el texto de la chapita del anticipo',
            default: 'Anticipo',
            group: groupCustomFields
        }),
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el título del anticipo',
            default: '',
            group: groupCustomFields
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí la volanta del anticipo',
            default: '',
            group: groupCustomFields
        }),
        url: PropTypes.string.tag({
            name: 'URL',
            description: 'Ingrese aquí la url del anticipo',
            default: '',
            group: groupCustomFields
        }),
        video: PropTypes.string.tag({
            name: 'Video',
            description: 'Definí el video del anticipo',
            default: '',
            group: groupCustomFields
        }),
        hide: PropTypes.bool.tag({
            name: 'Ocultar',
            description: 'Definí la visibilidad del anticipo',
            default: false,
            group: groupCustomFields
        })
    })
};

Anticipo.defaultProps = {
    customFields: {
        textBadge: 'Anticipo',
        lead: '',
        hide: false,
        title: '',
        url: '',
        video: ''
    }
};

export default Anticipo;
