import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { NoteCard } from '../features/LN-home/noteCard';

const FocalDerecho = ({ children }) => (
    <section className="row">
        <div className="col-tablet-8">{children[0]}</div>
        <div className="col-tablet-4">
            {children[1]}
            {children[2]}
        </div>
        <div className="row-gap-tablet-3">
            {children[3]}
            {children[4]}
            {children[5]}
        </div>
    </section>
);

FocalDerecho.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

const FocalIzquierdo = ({ children }) => (
    <section className="row">
        <div className="col-tablet-4">
            {children[1]}
            {children[2]}
        </div>
        <div className="col-tablet-8">{children[0]}</div>
        <div className="row-gap-tablet-3">
            {children[3]}
            {children[4]}
            {children[5]}
        </div>
    </section>
);

FocalIzquierdo.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

const FocalFactory = ({ directionFocal, children }) => {
    if (directionFocal === 'FocalDerecho')
        return <FocalDerecho>{children}</FocalDerecho>;
    if (directionFocal === 'FocalIzquierdo')
        return <FocalIzquierdo>{children}</FocalIzquierdo>;
    return null;
};

FocalFactory.propTypes = {
    directionFocal: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

const CollectionsNotes = idCollection => {
    const content = useContent({
        source: 'collectionsV2Source',
        query: { id: idCollection }
    });

    if (content) {
        const { content_elements: contentElements } = content;
        return contentElements
            ? contentElements.map(_content => <NoteCard content={_content} />)
            : [];
    }

    return [];
};

CollectionsNotes.propTypes = {
    idCollection: PropTypes.string.isRequired
};

const Apertura = props => {
    const {
        children,
        customFields: { idCollection, directionFocal }
    } = props;

    if (idCollection && idCollection !== '') {
        const Notes = CollectionsNotes(idCollection);
        return (
            <div className="row hlp-margintop-20">
                <div className="lay">
                    <FocalFactory directionFocal={directionFocal}>
                        {Notes}
                    </FocalFactory>
                </div>
            </div>
        );
    }

    return (
        <div className="row hlp-margintop-5">
            <div className="lay">
                <FocalFactory directionFocal={directionFocal}>
                    {children}
                </FocalFactory>
            </div>
        </div>
    );
};

Apertura.label = 'LN Home Apertura';

Apertura.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        directionFocal: PropTypes.oneOf(['FocalDerecho', 'FocalIzquierdo']).tag(
            {
                label: {
                    FocalDerecho: 'Focal Derecho',
                    FocalIzquierdo: 'Focal Izquierdo'
                },
                description: 'Ingrese aquí el ID de la collection',
                defaultValue: 'FocalDerecho',
                group: 'Custom Fields'
            }
        )
    }).isRequired
};

export default Apertura;
