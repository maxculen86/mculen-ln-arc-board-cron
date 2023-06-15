/* eslint-disable react/no-danger */
import React from 'react';

const Gtag = () => {
    const scriptGTAG = `

    const tagId = 'G-VSPCGF5QBG'
    const startTime = new Date().getTime()
    window.dataLayer = window.dataLayer || []

    function gtag() {
        dataLayer.push(arguments)
    }

    function get_cookie(cookie) {
        const cookies = Object.fromEntries(document.cookie.split(';')
            .map(el => el.split(/=(.*)/s).filter(el => el).map(el => el.trim())))
        return cookies[cookie]
    }

    function cookie_exists(cookie) {
        return !!document.cookie.match(cookie)
    }

    function usuarioLogged() {
        return cookie_exists('token') ? "yes" : "no"
    }

    function LSCDUserId() {
        const str = localStorage.getItem("CDUserId")
        return str ? str : "N/A"
    }

    function UsuarioRegistrado() {
        let str
        if (usuarioLogged() === "yes") {
            str = get_cookie('usuarioemail')
        } else {
            str = LSUsuarioRegistrado()
        }
        return str ? str : "N/A"
    }

    function LSUsuarioRegistrado() {
        const str = localStorage.getItem("CDUsuarioRegistrado")
        return str ? str : "no"
    }

    function LSSuscriptorType() {
        const str = localStorage.getItem("CDsuscriptorType")

        return str ? str : "N/A"
    }

    function GetPayUser() {
        let str
        if (usuarioLogged() === "yes") {
            str = get_cookie('ProductoPremiumId')
        } else {
            str = LSPayUser()
        }
        return str ? str : "N/A"
    }

    function LSPayUser() {
        const str = localStorage.getItem("CDpayUser")

        return str ? str : "no"
    }

    function LSCredentialType() {
        const str = localStorage.getItem("CDcredentialType")

        return str ? str : "N/A"
    }

    function credentialType() {
        let str
        if (usuarioLogged() === "yes") {
            str = get_cookie('usuarioDetalleClubNacion')
        } else {
            str = LSCredentialType()
        }
        return str ? str : "N/A"
    }

    function userIdCustom() {
        let str
        if (usuarioLogged() === "yes") {
            str = get_cookie('usuario%5Fid')
        } else {
            str = LSCDUserId() //
        }
        return str ? str.toString() : undefined
    }

    function registerUser() {
        return (UsuarioRegistrado().includes("@") || UsuarioRegistrado() === "yes") ? "yes" : "no"
    }

    function payUser() {
        return (GetPayUser().includes(2) || GetPayUser() === "yes") ? "yes" : "no"
    }

    function suscriptorType() {
        let str
        if (usuarioLogged() === "yes") {
            str = get_cookie('gaComboType')
        } else {
            str = LSSuscriptorType()
        }
        return str ? str : "N/A"
    }

    function getUserProperties(client_id) {
        const dispatchTime = new Date().getTime()
        const up = {
            user_id_custom: userIdCustom(),
            usuario_logged: usuarioLogged(),
            register_user: registerUser(),
            suscriptor_type: suscriptorType(),
            pay_user: payUser(),
            credential_type: credentialType(),
            // This variable are going to be used
            // to improve performance measurement
            startTime,
            dispatchTime,
            version: 'v4'
        }
        if (client_id)
            up.client_id = client_id
        return up

    }

    gtag('js', new Date())

    gtag('config', tagId, {
        linker: {
            accept_incoming: true
        },
        send_page_view: false,
        cookie_domain: "auto",
        user_properties: getUserProperties()
    })
    gtag('event', 'page_load', {
        user_properties: getUserProperties()
    })

    gtag('get', tagId, 'client_id', function (client_id) {
        gtag('event', 'client_load', {
            user_properties: getUserProperties(client_id)
        })
    })`;

    return (
        <>
            <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-VSPCGF5QBG"
            />
            <script
                defer
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptGTAG }}
            />
        </>
    );
};

export default Gtag;
