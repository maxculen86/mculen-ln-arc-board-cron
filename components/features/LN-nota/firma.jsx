/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import get from 'lodash.get';

import ModAutor from '../../private/common/mod-autor';

import { compose } from '../../private/common/utils/functional';

import { getSectionLogo } from '../../private/common/utils/sectionUtils';

const place = Object.freeze({ Top: 'Top', Bottom: 'Bottom' });

const filterByAuthor = authors =>
    authors.filter(author => author.type === 'author');

const renderAsList = (authors, position) =>
    (authors && authors.length > 1) || position === place.Bottom;

const getPropsBuilderFromContentElements = position => contentElements =>
    position === place.Top
        ? { authors: [], photo: null, medio: null }
        : contentElements
              .filter(
                  contentElement =>
                      contentElement.additional_properties &&
                      contentElement.additional_properties.nodeType === 'firma'
              )
              .map(author => ({ name: author.content }))
              .reduce(
                  (accumulator, value) => ({
                      ...accumulator,
                      authors: [{ name: value.name }],
                      photo: null,
                      medio: null
                  }),
                  {}
              );

const getPropsBuilder = position => authors =>
    authors
        .map(author => {
            const id = get(author, '_id');
            const name = get(author, 'name');

            return {
                name:
                    get(
                        author,
                        'additional_properties.original.author_type'
                    ) === ''
                        ? name
                        : get(
                              author,
                              'additional_properties.original.byline'
                          ) || name,
                link: id ? `/autor/${id}/` : '',
                photo: get(author, 'additional_properties.original.image'),
                medio: get(author, 'additional_properties.original.role')
            };
        })
        .reduce(
            (accumulator, value) => {
                const props = {
                    ...accumulator,
                    ...{
                        authors: [
                            ...accumulator.authors,
                            ...[
                                {
                                    ...{ name: value.name },
                                    ...{ link: value.link }
                                }
                            ]
                        ]
                    },
                    ...{
                        photo: renderAsList(authors, position)
                            ? null
                            : value.photo
                    },
                    ...{
                        medio: renderAsList(authors, position)
                            ? null
                            : value.medio
                    }
                };
                return props;
            },
            { authors: [], photo: null, medio: null, smth: 'credits' }
        );

const FirmaFeature = props => {
    const {
        id: featureId,
        outputType,
        customFields: { position },
        globalContent: {
            content_elements: contentElements,
            credits: { by },
            distributor,
            taxonomy: { sections = [] },
            owner: sponsored
        },
        layout
    } = props;

    const { name } = distributor || {};

    const isBrand = getSectionLogo(sections, layout, name);

    console.log('🚀 ~ file: firma.jsx ~ line 118 ~ isBrand', isBrand);

    const constructProps =
        by && by.length
            ? getPropsBuilder(position)
            : getPropsBuilderFromContentElements(position);

    const { photo, medio, authors } =
        by && by.length
            ? compose(constructProps, filterByAuthor)(by)
            : compose(constructProps)(contentElements);

    if (!authors || !authors.length) return null;

    return (
        <Static id={featureId} htmlOnly persistent>
            <div className="row FirmaAutor">
                <div className="col-12">
                    <ModAutor
                        autor={authors}
                        foto={photo}
                        classCondition="--autor"
                        medio={medio}
                        amp={outputType === 'amp'}
                    />
                </div>
            </div>
        </Static>
    );
};

FirmaFeature.propTypes = {
    id: PropTypes.string,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        })
    }),
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                additional_properties: PropTypes.shape({
                    nodeType: PropTypes.string
                }),
                content: PropTypes.string
            })
        ),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.shape({
                        url: PropTypes.string
                    }),
                    byline: PropTypes.string,
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    type: PropTypes.string,
                    _id: PropTypes.string
                })
            )
        })
    })
};

FirmaFeature.label = 'LN-Nota-Firma';

export default Context(FirmaFeature);
