import _ from 'lodash';


const promises = {
    init: (params) => {
        return new Promise((resolve) => {
            if (typeof FB !== 'undefined') {
                resolve();
            } else {
                window.fbAsyncInit = () => {
                    FB.init({
                        appId      : params.appId,
                        cookie     : true,  // enable cookies to allow the server to access the session
                        xfbml      : true,  // parse social plugins on this page
                        version    : params.version || 'v2.5' // use version 2.5
                    });
                    resolve();
                };
                (function(d, s, id) {
                    const fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    const js = d.createElement(s); js.id = id;
                    js.src = '//connect.facebook.net/en_US/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
    },
    checkLoginState: () => {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    login: () => {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                response.authResponse ? resolve(response) : reject(response);
            });
        });
    },
    fetchUser: () => {
        return new Promise((resolve, reject) => {
            FB.api(
                '/me',
                {fields: 'first_name, last_name, gender'},
                response => response.error ? reject(response) : resolve(response)
            );
        });
    }
};

const FBCallback = {
	_callback(callback, newProps) {
		this.result = _.extend(this.result, newProps || {});
		callback(this.result);
	},
    init(params, callback) {
        this.result = {loading: true, data: undefined, status: 'unknown', error: undefined};
        this._callback(callback);
        promises.init(params)
            .then(
                response => { this._callback(callback, {status: 'init'}); },
                error => { throw error; }
            )
            .catch((error) => {
                this._callback(callback, {loading: false, status: 'unknown', error: error});
                console.warn(error);
            });
    },
    login(params, callback) {
    	this.result = {loading: true, data: undefined, status: 'unknown', error: undefined};
    	this._callback(callback);
        promises.init(params)
            .then(
                promises.checkLoginState,
                error => { throw error; }
            )
            .then(
                response => { this._callback(callback, {status: response.status}); },
                promises.login
            )
            .then(
                response => { this._callback(callback, {status: response ? response.status : this.result.status}); },
                error => { throw error; }
            )
            .then(
                promises.fetchUser,
                error => { throw error; }
            )
            .then(
                response => { this._callback(callback, {loading: false, data: response}); },
                error => { throw error; }
            )
            .catch((error) => {
                this._callback(callback, {loading: false, data: undefined, status: 'unknown', error: error});
                console.warn(error);
            });
    },
    logout(params, callback) {
    	this.result = {loading: true, data: undefined, status: 'unknown', error: undefined};
    	this._callback(callback);
        promises.init(params)
            .then(
                promises.checkLoginState,
                () => { this._callback(callback, {loading: false, data: undefined, status: 'disconnected'}); }
            )
            .then(
                promises.logout,
                response => { this._callback(callback, {data: undefined, status: response.status, error: undefined}); throw undefined; }
            )
            .then(
                response => { this._callback(callback, {loading: false, status: response.status, data: undefined}); },
                error => { throw error; }
            )
            .catch(error => {
                if (error !== undefined) {
                    this._callback(callback, {loading: false, data: undefined, status: 'unknown', error: error});
                    console.warn(error);
                } else {
                    this._callback(callback, {loading: false});
                }
            });
    },
    checkStatus(params, callback) {
    	this.result = {loading: true, data: undefined, status: 'unknown', error: undefined};
    	this._callback(callback);
        promises.init(params)
            .then(
                promises.checkLoginState,
                error => { throw error; }
            )
            .then(
                response => { this._callback(callback, {status: response.status}); },
                response => { this._callback(callback, {loading: false, status: response.status}); throw undefined;}
            )
            .then(
                promises.fetchUser,
                error => { throw error; }
            )
            .then(
                response => { this._callback(callback, {loading: false, data: response}); },
                error => { throw error; }
            )
            .catch((error) => {
                if (error !== undefined) {
                    this._callback(callback, {loading: false, data: undefined, status: 'unknown', error: error});
                    console.warn(error);
                } else {
                    this._callback(callback, {loading: false});
                }
            });
    }
};

export default {
    callback: FBCallback
}
