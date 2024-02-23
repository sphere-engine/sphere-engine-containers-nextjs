SE_BASE = "containers.sphere-engine.com";
SE_HTTPS = true;
SE = window?.SE || (window.SE = []);
let js, fjs = document.getElementsByTagName('script')[0]
if (!document.getElementById('sphere-engine-compilers-jssdk')) {
    js = document.createElement('script');
    js.id = 'sphere-engine-compilers-jssdk';
    js.src = 'https://containers.sphere-engine.com/static/sdk/sdk.min.js';
    fjs.parentNode.insertBefore(js, fjs);
}

SE.ready = function(f) {
    if (document.readyState !== "loading" && document.readyState !== "interactive") {
        f()
    } else {
        window.addEventListener("load", f);
    }
}