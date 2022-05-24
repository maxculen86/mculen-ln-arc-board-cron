import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import EmptyBookmark from './EmptyBookmark';
import ArticlesAcum from '../../LN/acumulado/articlesAcum';
import LoadingIcon from '../../LN/common/loadingIcon';
import BtnMasNotas from '../../LN/acumulado/botonVerMasNotas';

const BookmarkList = ({ data = [] }) => {
    const { siteProperties, outputType } = useAppContext();

    return (
        <section className="bookmark-list">
            {data.length === 0 ? (
                <EmptyBookmark />
            ) : (
                <>
                    <ArticlesAcum
                        articles={data}
                        hayMasNotas={10}
                        globalContet={{}}
                        siteProperties={siteProperties}
                        outputType={outputType}
                        typeArticle="Bookmark"
                        textButton="Mas notas guardadas"
                    />

                    <BtnMasNotas
                        onClickHandler={() => {
                            console.log('Mas notas');
                        }}
                        loadingIcon={<LoadingIcon />}
                        loading={false}
                        textButton="Mas notas guardadas"
                    />
                </>
            )}
        </section>
    );
};

BookmarkList.propTypes = {
    data: PropTypes.shape([{}])
};
BookmarkList.defaultProps = {
    data: []
};

export default BookmarkList;
