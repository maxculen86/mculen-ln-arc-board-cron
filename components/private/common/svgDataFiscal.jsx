import React from 'react';

const SvgFiscal = props => {
    const { app, amprel } = props;

    return (
        <a
            href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
            target="_blank"
            rel="noopener noreferrer"
        >
            <svg
                className={`com-svg ${app}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 239 327"
            >
                <path fill="#fff" d="M0 0h239v327H0z"></path>
                <path d="M124 35h26v26h-26V35zM89 55h26v26H89V55zM30 96h26v26H30V96zm5 34h25v26H35v-26zm41-29h26v26H76v-26zm47 9h25v25h-26v-25zm-29 28h25v26H95v-26zm10 41h26v26h-26v-26zm82 20h25v26h-26l1-26zm2-82h26v26h-26v-26zm-28-24h26v26h-26V93zM37 42h35v35H37V42z"></path>
                <path d="M84 89H25V30h59v59zm-54-5h49V35H30v49zm137-42h35v35h-35V42z"></path>
                <path d="M214 89h-59V30h59v59zm-54-5h49V35h-49v49zM37 173h35v35H37v-35z"></path>
                <path d="M84 220H25v-59h59v59zm-54-5h49v-49H30v49zm161-19h-46v-46h46v46zm-42-4h38v-38h-38v38z"></path>
                <path d="M161 166h14v14h-14v-14z"></path>
                <path
                    fill="#00adee"
                    d="M186 251h-14c-2 0-2 1-2 2 0 2 1 2 2 2h14l2-1c0-2 0-3-2-3zm-77 0H95c-2 0-2 1-2 2 0 2 1 2 2 2h14c1 0 3 1 2-1 0-1 1-3-2-3zm62 37h-13c-3 0-3 1-3 3l2 1h14c1 0 3 1 2-1 0-1 0-3-2-3zM63 265h7c6 0 6-1 6-7v-3c0-3-2-4-5-4H54c-2 0-2 0-2 2-1 12-1 12 11 12z"
                ></path>
                <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#00adee"
                    d="M0 0v327h239V0H0zm54 288H31c-1 0-2 0-2 2s1 2 2 2h17c2 0 5-1 5 3 0 3-3 2-5 2H33c-4 0-4 0-4 5l-1 2c0 2-1 3-2 3-2 0-2-1-3-3v-18c0-3 1-4 4-4h27c1 0 3 0 4 2s-2 4-4 4zm-7-39c0-3 1-4 4-4l11 1h12c4 0 7 3 7 8v8c0 5-2 7-6 8H50c-2 0-3-1-3-3v-18zm20 46v9c0 2-1 3-3 3s-2-2-2-3v-18c0-2 0-3 2-3s3 1 3 3v9zm38 6c0 4-2 5-6 6H74c-1 0-3 0-3-2s2-3 3-3h20c2 0 6 1 6-3-1-3-4-1-6-1H78c-6 0-7-3-7-8s2-7 7-7h23c2 0 4 0 4 2s-2 3-4 3H78l-2 2 2 2h20c5 1 7 3 7 9zm-10-40c-2-1-4 0-4 3l-1 4c0 1-1 2-3 2-2-1-2-2-2-3l4-18c0-2 2-4 4-3h19a1289 1289 0 006 24c-1 0-3 0-3-2l-1-2c-1-5-1-5-7-5H95zm46 46h-21c-8 0-11-3-11-11 0-11 2-13 13-13h17c2 0 4-1 4 2s-2 3-4 3h-20c-3 0-5 1-5 5v4c0 4 1 5 5 5h21c2 0 3 1 3 3l-2 2zm2-52v11c0 2 0 4-3 4-2 0-2-2-2-4v-12c0-3-1-4-3-4l-8 1c-2 0-4-1-4-3s2-2 4-2h27c2 0 4 0 4 2s-2 3-4 3l-7-1c-3 0-4 2-4 5zm37 52c-2 0-3 0-3-2l-2-5c0-2-1-3-3-2h-15c-3-1-4 0-4 3l-1 5-3 1-2-2v-1l4-19c1-2 2-2 4-2h19c1 0 3 0 3 2l5 19c0 2-1 3-2 3zm-9-46c-2-1-3 0-3 3l-1 4-3 2c-2 0-2-2-2-3l4-19c0-2 2-3 4-2h18c2-1 3 0 4 2l4 18c0 1 1 3-1 4-2 0-3-1-4-3-2-7-2-6-9-6h-11zm43 46h-24c-3 0-5-1-5-4v-17c0-2 1-3 3-3s3 1 3 3v13c0 2 0 3 2 3h19c2 0 3 0 3-2s1-3 2-3h1c2 0 2 2 2 4 1 5 0 6-6 6zm9-79H17V23h206v205z"
                ></path>
            </svg>
        </a>
    );
};

export default SvgFiscal;
