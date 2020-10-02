/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'fusion:prop-types';

const getCategory = content =>
    content.name
        ? [
              'ca_'.concat(
                  content.name
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/\W/g, '_')
              )
          ]
        : [];

const getTopic = content =>
    content.Payload && content.Payload.items && content.Payload.items.length > 0
        ? content.Payload.items.map(item => 'te_'.concat(item.name))
        : [];

const getAuthor = content => (content.slug ? ['au_'.concat(content.slug)] : []);

const googlePublisherTagAcumulado = props => {
    const { globalContent } = props;
    const { type } = globalContent;

    if (type === 'story') return null;

    const category = getCategory(globalContent);

    const topic = getTopic(globalContent);

    const author = getAuthor(globalContent);

    const script = `
            (window.googletag = window.googletag || { cmd: [] });
                googletag.cmd.push(function() {
                    googletag.pubads().setTargeting('tags_nuevos', ${JSON.stringify(
                        [...category, ...topic, ...author]
                    )});
                    googletag.pubads().setTargeting('seccion', 'acumulado');
                    googletag.pubads().setTargeting('adstest', testQueryString());
                    googletag.pubads().setTargeting('sitio', 'lanacion');
                }
            )
    `;

    return (
        <script
            defer
            id="googlePublisherTag-metadata"
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
};

googlePublisherTagAcumulado.propTypes = {
    globalContent: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string
    })
};

export default googlePublisherTagAcumulado;
