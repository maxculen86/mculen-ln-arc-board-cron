import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { transform } from './_helper';
import AuthorCard from '../../foodit-global/common/authorCard/foodit';

const CardChef = ({ customFields: { id = '' } }) => {
    const { isAdmin, arcSite } = useAppContext();
    const idAuthor = id.trim();
    const author = useContent({
        source: 'chefsSource',
        query: {
            _id: idAuthor,
            website: arcSite
        },
        transform,
        staticMode: true
    });

    const {
        _id: authorId,
        canonical_url: canonicalUrl,
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
        return <WarningMessage type={'warning'} message={error.message} />;
    }

    if (error) {
        return <></>;
    }
    return (
        <AuthorCard
            key={authorId}
            href={canonicalUrl}
            name={name}
            imageProps={{ src: imageUrl }}
        />
    );
};

CardChef.propTypes = {
    id: PropTypes.string,
    customFields: PropTypes.shape({
        id: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID del chef',
            defaultValue: ''
        })
    })
};

export default CardChef;
