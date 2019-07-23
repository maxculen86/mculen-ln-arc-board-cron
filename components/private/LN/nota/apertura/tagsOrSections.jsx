import React, { Fragment } from 'react';
//import './style.css'

const TagsOrSections = props => {
    const { items, destacado } = props;
    const classDestacada = destacado ? 'classDestacada' : 'classNoDestacada';
    return (
        <div className={`conteiner-${classDestacada}`}>
            {items
                ? items.map((item, index) => {
                      return item.type === 'section' ? (
                          // Creacion de JSX Categorias
                          <Fragment key={index}>
                              <strong className={classDestacada}>
                                  <a href={item.path}>{item.name}</a>
                              </strong>
                          </Fragment>
                      ) : (
                          // Creacion de JSX Tags
                          <Fragment key={index}>
                              <strong className={classDestacada}>
                                  <a href={item.slug}>{item.text}</a>
                              </strong>
                              {index !== items.length - 1 && <span> - </span>}
                          </Fragment>
                      );
                  })
                : null}
        </div>
    );
};

export default TagsOrSections;
