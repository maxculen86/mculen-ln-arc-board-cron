/* eslint-disable react/no-danger */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { checkUserRealoadAction } from './noteTracker/ctrTracker';

const addPositionTag = (tag, idexTag) => {
    const index = idexTag + 1;
    const position = index <= 9 ? `0${index}` : index;
    if (tag)
        return Object.assign(tag, {
            ctr_brand: `linkTemas_${position}`,
            ctr_position: `0600${position}`
        });
    return true;
};
const intersectionObserverForRelatedTags = () => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    ${checkUserRealoadAction.toString()}
                    const refresh = checkUserRealoadAction(window);
                    if (!refresh) {
                        const tags = document.querySelectorAll('section.mod-themes a');
                        ${addPositionTag.toString()}
                        const callback = entries => {
                            entries.forEach((tagElement, i) => {
                                if (tagElement.isIntersecting) {
                                    const { target } = tagElement;
                
                                    window.dataLayer.push({
                                        event: 'impressionNota',
                                        ctr_brand: target.ctr_brand,
                                        ctr_position: target.ctr_position
                                    });
                
                                    observer.unobserve(target);
                                }
                            });
                        };
                
                        const observer = new IntersectionObserver(callback);
                        tags.forEach((tag, i) => {
                            addPositionTag(tag, i);
                            const clickEvent = {
                                event: 'productClickNota',
                                ctr_brand: tag.ctr_brand,
                                ctr_position: tag.ctr_position
                            };
                            tag.addEventListener('click', () => {
                                window.dataLayer.push(clickEvent);
                            });
                            tag.addEventListener('auxclick', () => {
                                window.dataLayer.push(clickEvent);
                            });
                            observer.observe(tag);
                        });
                    }
                });
                `
            }}
        />
    );
};

export default intersectionObserverForRelatedTags;
