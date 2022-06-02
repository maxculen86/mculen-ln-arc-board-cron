import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import EmptyBookmark from './EmptyBookmark';
import ArticlesAcum from '../../LN/acumulado/articlesAcum';
import LoadingIcon from '../../LN/common/loadingIcon';
import BtnMasNotas from '../../LN/acumulado/botonVerMasNotas';

const BookmarkList = ({ data, morePages, getNextPage, loading }) => {
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
                    />
                    {morePages && (
                        <section className="row">
                            <BtnMasNotas
                                onClickHandler={() => {
                                    setLoadingMorePages(!loadingMorePages);
                                    !loadingMorePages && getNextPage();
                                }}
                                loadingIcon={<LoadingIcon />}
                                loading={loadingMorePages}
                                textButton="Mas notas guardadas"
                                title="Mas notas"
                            />
                        </section>
                    )}
                </>
            )}
        </section>
    );
};

BookmarkList.propTypes = {
    data: PropTypes.arrayOf([]),
    morePages: PropTypes.bool,
    getNextPage: PropTypes.func.isRequired,
    loading: PropTypes.bool
};
BookmarkList.defaultProps = {
    data: [],
    morePages: false,
    loading: true
};

export default BookmarkList;
