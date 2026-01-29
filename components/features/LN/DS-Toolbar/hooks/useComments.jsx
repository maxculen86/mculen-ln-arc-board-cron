import { VIAFOURA_UUID } from 'fusion:environment';
import useFetch from '../../../../private/common/hooks/useFetch';
import get from '../../../../private/common/utils/get';
import { conditionallyCallViafoura } from '../../../../private/common/utils/commentsHelper';
import { scrollToComments } from '../../../../private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

function useComments({ noteId, firstPublishDate, displayComments }) {
    const { data } = useFetch({
        url: conditionallyCallViafoura(firstPublishDate)
            ? `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_UUID}/contentcontainer/id?container_id=${noteId}`
            : null,
        options: {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        }
    });

    const totalVisibleContent = get(data, 'total_visible_content', 0);

    const handleGoToComments = () => {
        scrollToComments();

        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'toolbar',
            category: 'nota',
            label: 'ver_comentarios'
        });
    };

    return {
        showButton: Boolean(displayComments),
        total: totalVisibleContent > 0 ? totalVisibleContent : null,
        handleGoToComments
    };
}

export default useComments;
