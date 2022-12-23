import React from 'react';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import getTitleText from '../../../private/common/utils/getTitleText';
import get from '../../../private/common/utils/get';
import { validateId, calculateTimePublish } from './_helpers';

export default function BuildNotes({ noteId = '', customTitle = '' }) {
    const { isAdmin } = useAppContext() || {};
    const id = validateId(noteId);
    // TODO: Falta agregar un filter al llamado del source
    const article = useContent({
        source: id ? 'articleSourceNota' : null,
        query: {
            id,
            published: true
        }
        // filter
    });

    const headlines = get(article, 'headlines', {});
    const publishDate = get(article, 'last_updated_date', '');
    const title = !customTitle
        ? getTitleText(headlines, '', false)
        : customTitle;
    const time = calculateTimePublish(publishDate);

    if (isAdmin && id && !article) {
        return (
            <PageBuilderMessage
                type="warning"
                message="El ID de la nota es incorrecto."
            />
        );
    }

    return article ? (
        <p>
            {title}
            {time && time}
        </p>
    ) : (
        <></>
    );
}

BuildNotes.propTypes = {
    noteId: PropTypes.string.isRequired,
    customTitle: PropTypes.string.isRequired
};
