/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

import Firma from '../../private/LN/nota/firma';

import { compose } from '../../private/common/utils/functional';

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
        .map(author => ({
            name:
                get(author, 'additional_properties.original.author_type') === ''
                    ? get(author, 'name')
                    : get(author, 'additional_properties.original.byline') ||
                      get(author, 'name'),
            link: `/autor/${get(author, 'name')}/`,
            photo: get(author, 'additional_properties.original.image'),
            medio: get(author, 'additional_properties.original.role')
        }))
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
        outputType,
        customFields: { position },
        globalContent: {
            content_elements: contentElements,
            credits: { by: authors }
        }
    } = props;

    const constructProps =
        authors && authors.length > 0
            ? getPropsBuilder(position)
            : getPropsBuilderFromContentElements(position);

    const data =
        authors && authors.length > 0
            ? compose(constructProps, filterByAuthor)(authors)
            : compose(constructProps)(contentElements);

    const amp = outputType === 'amp';

    return <Firma {...data} amp={amp} />;
};

FirmaFeature.propTypes = {
    outputType: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        }).isRequired
    }).isRequired,
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
        ).isRequired,
        credits: PropTypes.shape({
            by: PropTypes.shape({
                image: PropTypes.shape({
                    url: PropTypes.string
                }),
                byline: PropTypes.string,
                name: PropTypes.string,
                slug: PropTypes.string,
                type: PropTypes.string,
                _id: PropTypes.string
            })
        })
    }).isRequired
};

FirmaFeature.label = 'LN-Nota-Firma';

export default Context(FirmaFeature);
