import { useContext } from 'react';
import { useContent } from 'fusion:content';
import { GlobalContext } from '../context/globalContext';
import findTermica from './findTermica';
import get from './get';

export const allowComments = props =>
    get(props, 'globalContent.type') === 'story' &&
    get(props, 'globalContent._id') &&
    get(props, 'globalContent.comments.display_comments', true) &&
    findTermica('livefyre');

export const shouldLoadViafoura = inputDate => {
    const gc = useContext(GlobalContext);
    const deadlineLivefyer = get(
        gc,
        'state.siteService.migration.deadline_livefyre'
    );

    const deadlineDate = deadlineLivefyer && new Date(deadlineLivefyer);
    const articlePublishDate = inputDate && new Date(inputDate);

    return (
        deadlineDate &&
        articlePublishDate &&
        articlePublishDate.setHours(0, 0, 0, 0) >=
            deadlineDate.setHours(0, 0, 0, 0)
    );
};

export const shouldLoadViafouraSSR = props => {
    const {
        globalContent: { first_publish_date: firstPublishDate } = {},
        arcSite: website
    } = props;
    return useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        transform: resp => {
            const showComments =
                get(props, 'globalContent.type') === 'story' &&
                get(props, 'globalContent._id') &&
                get(props, 'globalContent.comments.display_comments', true) &&
                get(resp, 'Termicas.livefyre', true);
            const deadlineLivefyre = get(resp, 'migration.deadline_livefyre');
            const deadlineDate = deadlineLivefyre && new Date(deadlineLivefyre);
            const articlePublishDate =
                firstPublishDate && new Date(firstPublishDate);
            return (
                showComments &&
                deadlineDate &&
                articlePublishDate &&
                articlePublishDate.setHours(0, 0, 0, 0) >=
                    deadlineDate.setHours(0, 0, 0, 0)
            );
        }
    });
};

export default { allowComments, shouldLoadViafoura, shouldLoadViafouraSSR };
