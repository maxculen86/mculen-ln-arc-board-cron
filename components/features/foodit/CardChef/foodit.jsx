import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { transform } from './_helper';
import filter from '../../../../content/filters/foodit/chefs';
import { AuthorCard } from '../../foodit-global/common/authorCard/foodit';
import get from '../../../private/common/utils/get';

function CardChef({ customFields: { id = '' } }) {
    const { isAdmin, arcSite, renderables = [] } = useAppContext();
    const idAuthor = id.trim();
    const author = useContent({
        source: 'chefsSource',
        query: {
            _id: encodeURIComponent(idAuthor),
            website: arcSite
        },
        filter,
        transform,
        staticMode: true
    });

    const firstCardChef = renderables.find(
        ({ type }) => type === 'foodit/CardChef'
    );
    const firstIdChef = get(firstCardChef, 'props.customFields.id', '');
    const isFirstChef = firstIdChef === idAuthor;

    const {
        _id: authorId,
        canonical_url: canonicalUrl = '',
        name,
        image: { url: imageUrl } = {}
    } = author || {};

    const validations = [
        {
            condition: !idAuthor,
            message: 'Se requiere id de chef.'
        },
        {
            condition: !authorId,
            message: 'No se encontro chef.'
        }
    ];
    const error = validations.find(validation => Boolean(validation.condition));

    if (isAdmin && error) {
        return <WarningMessage type="warning" message={error.message} />;
    }

    if (error) {
        return null;
    }

    return (
        <AuthorCard
            key={authorId}
            href={canonicalUrl.replace('autor', 'chefs-protagonistas')}
            name={name}
            imageProps={{
                src: imageUrl,
                fetchPriority: isFirstChef ? 'high' : 'low',
                loading: isFirstChef ? 'eager' : 'lazy'
            }}
        />
    );
}

CardChef.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        id: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID del chef',
            defaultValue: ''
        })
    }).isRequired
};

export default CardChef;
