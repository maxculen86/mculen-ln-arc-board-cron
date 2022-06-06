import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
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
                                name="mas-notas"
                            />
                        </section>
                    )}
                </>
            )}
        </section>
    );
};

BookmarkList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            bookmarkId: PropTypes.string,
            category: PropTypes.string,
            credits: PropTypes.shape({
                by: PropTypes.arrayOf(PropTypes.shape({}))
            }),
            headlines: PropTypes.shape({
                basic: PropTypes.string
            }),
            website_url: PropTypes.string,
            label: PropTypes.shape({
                recomendar: PropTypes.shape({
                    text: PropTypes.string
                }),
                volanta: PropTypes.shape({
                    display: PropTypes.bool,
                    text: PropTypes.string
                })
            }),
            promo_items: PropTypes.shape({
                basic: PropTypes.shape({
                    height: PropTypes.number,
                    width: PropTypes.number,
                    type: PropTypes.string,
                    url: PropTypes.string
                })
            })
        })
    ),
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
