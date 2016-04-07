# facebook-login-promises
Simple library for Facebook Login. Callback and Promises approaches are used. 

Init, Login, Logout, Check Status, Fetch User Info

## Welcome

Package is in development state. Feel free to open pull request and/or propouse new features, bug-fixing, etc. It's under MIT license.

## Installation

    $ npm install facebook-login-promises
 
## How to use?

### Callback approach

```js
import fb from 'facebook-login-promises';

const params = {
	appId: <fb_app_id>
};

function callback(state) {
	console.log(state);

	const process = state.loading ? 'loading' : 'loaded';
	const connected = state.status === 'connected';
	const firstname = state.data ? state.data.first_name : null;
	
	console.log('process: ' + process);
	console.log('connected: ' + connected);
	if (firstname) {
		console.log('your logged as: ' + firstname);
	}
}

cunction login() {
	fb.callback.login(params, callback);
}

function logout() {
	fb.callback.logout(params, callback);
}

function checkStatus() {
	fb.callback.checkStatus(params, callback);
}
```

### Promises approach

[In development]

[TODO]

## Examples

Open https://rawgit.com/gzoreslav/fb-login/master/examples/index.html and see output in console
