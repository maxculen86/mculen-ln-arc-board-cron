import React from 'react';
import Opinion from '../../../common/opinion';
import Editoriales from '../../../common/editoriales';
import ArticleAcum from '../../acumulado/articleAcum';
import FocalFactory from '../../home/templatesContainers/focalFactory';
import { customHeading } from './cajaTemasHelper';

const getComponentForLayout = (layoutName, props, setRefs = []) => {
    const types = {
        Opinion: ({ articles, layout, handleClick }) => {
            return (
                <Opinion
                    articles={articles}
                    layout={layout}
                    handleClick={handleClick}
                />
            );
        },
        Editoriales: ({ articles, layout, title, url, handleClick }) => {
            return (
                <Editoriales
                    articles={articles}
                    layout={layout}
                    title={title}
                    link={url}
                    handleClick={handleClick}
                />
            );
        },
        Focal: ({
            articles,
            layout,
            outputType,
            position,
            _children,
            handleClick,
            pageLayout
        }) => {
            return (
                <FocalFactory
                    directionFocal={layout}
                    articles={articles}
                    outputType={outputType}
                    boxPosition={position}
                    _children={_children}
                    handleClick={handleClick}
                    pageLayout={pageLayout}
                />
            );
        },
        Grilla: ({
            articles,
            layout = 'grilla3',
            outputType = 'default',
            position,
            titleSize,
            titleWeight,
            withSubhead = false,
            dataSection,
            handleClick,
            sectionName,
            withVolanta = true
        }) => {
            const customTitleTag =
                sectionName === 'Ranking' && props.isHome
                    ? 'h2'
                    : customHeading[sectionName] || 'h2';

            return articles.map((art, i) => {
                const artPosition = `0${Number(i) + 1}`.slice(-2);
                const isRenderAuthor = layout.includes('author');

                // TODO: add sections with querySelectors in dataLayers
                const sectionsWithRef = ['TePuedeInteresar'];

                const articleRef = sectionsWithRef.includes(sectionName)
                    ? el => {
                          setRefs.current[i] = el;
                      }
                    : null;

                return (
                    <ArticleAcum
                        ref={articleRef}
                        key={art._id}
                        article={art}
                        outputType={outputType}
                        frontdemo
                        titleSize={titleSize}
                        titleWeight={titleWeight}
                        isRenderAuthor={isRenderAuthor}
                        withSubhead={withSubhead}
                        withVolanta={withVolanta}
                        boxPosition={
                            position === 'toi'
                                ? `toi${Number(i) + 1}`
                                : position
                        }
                        artPosition={position !== 'toi' ? artPosition : ''}
                        handleClick={handleClick}
                        dataSection={dataSection}
                        sectionName={sectionName}
                        titleTag={customTitleTag}
                    />
                );
            });
        },

        ArticleFeature: ({ _children, notesQuantity }) => {
            return _children.slice(0, notesQuantity);
        }
    };

    return (types[layoutName] && types[layoutName](props)) || <></>;
};

export default getComponentForLayout;
