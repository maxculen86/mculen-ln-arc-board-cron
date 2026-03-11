import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import EmptyBookmark from './EmptyBookmark';
import ArticlesAcum from '../../LN/acumulado/articlesAcum';
import LoadingIcon from '../../LN/common/loadingIcon';
import BtnMasNotas from '../../LN/acumulado/botonVerMasNotas';

function BookmarkList({
    data = [],
    morePages = false,
    getNextPage,
    loading = true,
    openBarrier
}) {
    const { outputType } = useAppContext();
    const [loadingMorePages, setLoadingMorePages] = useState(false);

    if (loading) return <LoadingIcon />;
    return (
        <section className="bookmark-list">
            {data.length === 0 ? (
                <EmptyBookmark />
            ) : (
                <>
                    <ArticlesAcum
                        articles={data}
                        outputType={outputType}
                        typeArticle="Bookmark"
                        classCondition={morePages && 'hlp-degrade'}
                        openBarrier={openBarrier}
                    />
                    {morePages && (
                        <section className="row">
                            <BtnMasNotas
                                onClickHandler={() => {
                                    setLoadingMorePages(!loadingMorePages);
                                    if (!loadingMorePages) {
                                        getNextPage();
                                    }
                                }}
                                loadingIcon={<LoadingIcon />}
                                loading={loadingMorePages}
                                textButton="Mas notas guardadas"
                            />
                        </section>
                    )}
                </>
            )}
        </section>
    );
}

export default BookmarkList;
