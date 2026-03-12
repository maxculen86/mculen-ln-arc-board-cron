import React from 'react';
import LinkList from './linkList';
import Social from './social';

const HIERARCHY = 'Links-Acumulados';

function Index(props) {
    const {
        children,
        globalContent: {
            social: { twitter, facebook, instagram },
            _website,
            _id
        } = {}
    } = props;
    return (
        <div className="row subheader-acu">
            <div className="col-12">
                {/* LUGAR PARA EL ANEXO */}
                {children}
                <section className="lay">
                    <Social
                        twitter={twitter}
                        facebook={facebook}
                        instagram={instagram}
                    />
                    <div className="logo">
                        <i className="logo-revista" />
                    </div>
                    <LinkList
                        hierarchy={HIERARCHY}
                        website={_website}
                        id={_id}
                    />
                </section>
            </div>
        </div>
    );
}

export default Index;
