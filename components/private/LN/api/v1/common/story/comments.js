import get from 'lodash.get';

export const displayComments = dataNota => {
    const optionDisplayComments = get(
        dataNota,
        'comments.display_comments',
        false
    );
    const generalCommentsConfig = get(
        dataNota,
        'navigationTreeSource.Termicas.livefyre',
        'false'
    );

    return generalCommentsConfig === 'true' && optionDisplayComments === true;
};

export const openComments = dataNota => {
    const optionDisplayComments = get(
        dataNota,
        'comments.display_comments',
        false
    );
    const generalCommentsConfig = get(
        dataNota,
        'navigationTreeSource.Termicas.livefyre',
        'false'
    );
    const deadlineLivefyer = get(
        dataNota,
        'navigationTreeSource.migration.deadline_livefyre',
        ''
    );

    const firstPublishDate = get(dataNota, 'first_publish_date', '');

    const deadlineDate = deadlineLivefyer && new Date(deadlineLivefyer);
    const articlePublishDate = firstPublishDate && new Date(firstPublishDate);

    const validDate =
        deadlineDate &&
        articlePublishDate &&
        articlePublishDate.setHours(0, 0, 0, 0) >=
            deadlineDate.setHours(0, 0, 0, 0);

    return (
        validDate &&
        generalCommentsConfig === 'true' &&
        optionDisplayComments === true
    );
};
