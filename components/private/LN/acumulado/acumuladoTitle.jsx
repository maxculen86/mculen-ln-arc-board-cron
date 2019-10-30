import React, { useState, useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import ListSectionsTitle from './acumuladoTitle/listSectionsTitle';
import TagsNavigation from './tagsNavigation';
import NotaApertura from './notaApertura';

import '../../../../resources/dist/css/ln/components/title.css';
import '../../../../resources/dist/css/ln/components/tag.css';

const AcumuladoTitle = ({ globalContent, orderAndCountTags }) => {
    const [withCategory, setWithCategory] = useState('');
    const [_children, setChildren] = useState([]);
    const [isPrimarySection, setIsPrimarySection] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setChildren(globalContent.children);

        setIsPrimarySection(
            // TODO: LLevar el lengt -1 a 1 cuando se active Navigation Arc2
            globalContent &&
                globalContent._id &&
                globalContent._id.split('/').splice(1).length === -1
        );
        // TODO: Cambiar < a > cuando se active Navigation Arc2
        if (_children && _children.length < 0) setWithCategory('with-category');

        setTitle(() => {
            const {
                Payload,
                node_type: nodeType,
                byline,
                name
            } = globalContent;
            if (Payload) return Payload.items[0].name;
            if (nodeType === 'section') return name;
            if (byline) return byline;
            return '';
        });
    }, [
        _children,
        globalContent,
        globalContent.Payload,
        globalContent._id,
        globalContent.byline,
        globalContent.children,
        globalContent.name,
        globalContent.node_type
    ]);

    return (
        <>
            <div className="com-titleWithfollow">
                <div className={withCategory}>
                    <h1 className="com-title-section-xl">{title}</h1>
                    <ListSectionsTitle
                        _children={_children}
                        isPrimarySection={isPrimarySection}
                    />
                </div>
                <TagsNavigation
                    _children={_children}
                    orderAndCountTags={orderAndCountTags}
                    isPrimarySection={isPrimarySection}
                />
            </div>
            <NotaApertura />
        </>
    );
};

AcumuladoTitle.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Payload: PropTypes.shape({
            items: PropTypes.shape({
                name: PropTypes.string
            })
        }),
        byline: PropTypes.string,
        name: PropTypes.string,
        node_type: PropTypes.string,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                navigation: PropTypes.shape({
                    nav_title: PropTypes.string
                }),
                _website: PropTypes.string
            })
        )
    }).isRequired,
    orderAndCountTags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.shape({
                slug: PropTypes.string,
                text: PropTypes.string
            })
        })
    ).isRequired
};

// AcumuladoTitle.defaultProps = {
//     globalContent: {
//         Payload: undefined,
//         byline: undefined,
//         name: undefined,
//         node_type: undefined,
//         children: []
//     }
// };

export default WithAcuArticlesData(Consumer(AcumuladoTitle), filter, 'notaM');
