import React from 'react';
import Container from './com-container';
import ComLink from './com-link';
import ComText from './com-text';
import ComFoto from './com-foto';
import '../../../resources/dist/css/ln/modules/mod-autor.css';
import ModFirma from './mod-firma';
import ModMedio from './mod-medio';

const ModAutor = props => {
    const { autor, link, medio, foto, classCondition } = props;
    if (!autor) return null;
    if (foto)
        return (
            <section className="mod-autor">
                <div className="container-img">
                    <div className={`img ${foto}`}></div>{' '}
                    {/* CAMBIAR por componente img */}
                </div>
                <div className="container-text">
                    <ModFirma autor={autor} classCondition={classCondition} />
                    <ModMedio medio={medio} classCondition="--medio" />
                </div>
            </section>
        );
    if (medio)
        return (
            <section className="mod-autor">
                <div className="container-text">
                    <ModFirma autor={autor} classCondition={classCondition} />
                    <ModMedio medio={medio} classCondition="--medio" />
                </div>
            </section>
        );
    return (
        <section className="mod-autor">
            <div className="container-text">
                <ModFirma autor={autor} classCondition={classCondition} />
            </div>
        </section>
    );

    // if ( !foto )
    // return (
    //     <section className="mod-autor">
    //         <Container classesNames="container-text" >
    //             <Container classesNames="container-firma" >
    //                 <ComLink textname={autor} link={link} />
    //             </Container>
    //             <ComText textname={medio} />
    //         </Container>
    //     </section>
    // );
    // if ( !medio )
    // return (
    //     <section className="mod-autor">
    //         <Container classesNames="container-firma" >
    //             <ComLink textname={autor} link={link} />
    //         </Container>
    //         <ComFoto medio={foto} />
    //     </section>
    // );
    // return (
    //     <section className="mod-autor">
    //         <ComFoto medio={foto} />
    //         <Container classesNames="container-text" >
    //             <Container classesNames="container-firma" >
    //                 <ComLink textname={autor} link={link} />
    //             </Container>
    //             <ComText textname={medio} />
    //         </Container>
    //     </section>
    // );
};

export default ModAutor;
