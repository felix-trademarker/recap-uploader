var isLogin = false;
document.addEventListener('DOMContentLoaded', function () {
    var isLogin = false;
    var vuex = JSON.parse(window.localStorage.getItem('vuex'))

    if (!vuex || !vuex.token) {
        window.location.replace("/recap-uploader/login");
        isLogin = false
    } else {
        if (!(vuex.userInfo && vuex.userInfo.email && vuex.userInfo.email.endsWith('@chinesepod.com'))) {
            window.location.replace("/home");
            isLogin = false
        }
    }

    isLogin = true

}, false);