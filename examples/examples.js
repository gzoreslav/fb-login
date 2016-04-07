import facebook from '../src/index.js';

window.facebook = facebook;

const params = {
	appId: '260170667658655'
};

function callback(state) {
	document.getElementById('status').innerHTML = state.status;
	
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

window.cLogin = () => {
	facebook.callback.login(params, callback);
}

window.cLogout = () => {
	facebook.callback.logout(params, callback);
}

window.cCheckStatus = () => {
	facebook.callback.checkStatus(params, callback);
}
