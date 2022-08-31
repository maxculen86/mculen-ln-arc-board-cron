/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';

import Opinion from '../../../common/opinion';
import Editoriales from '../../../common/editoriales';
import ArticleAcum from '../../acumulado/articleAcum';
import FocalFactory from '../../home/templatesContainers/focalFactory';

import { customHeading } from './cajaTemasHelper';
import { setTLDistribution, setTLOrderClass } from './timeline';
import getFeatureByLayout from './getFeatureByLayout';

const getComponentForLayout = (layoutName, props) => {
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
            handleClick
        }) => {
            return (
                <FocalFactory
                    directionFocal={layout}
                    articles={articles}
                    outputType={outputType}
                    boxPosition={position}
                    _children={_children}
                    handleClick={handleClick}
                />
            );
        },
        Grilla: ({
            articles,
            layout = 'grilla3',
            outputType = 'default',
            position,
            titleSize,
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

                return (
                    <ArticleAcum
                        key={art._id}
                        article={art}
                        outputType={outputType}
                        frontdemo
                        titleSize={titleSize}
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
