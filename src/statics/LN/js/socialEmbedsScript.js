var currentScript = document.currentScript;

var appId = currentScript.dataset.appId;

window.fbAsyncInit = function() {
    FB.init({
        appId: appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.11'
    });
    FB.AppEvents.logPageView();
};
