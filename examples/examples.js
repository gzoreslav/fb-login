import facebook from '../src/index.js';

window.facebook = facebook;

const params = {
	appId: '260170667658655'
};

function callback(state) {
	console.log(state);

	const process = state.loading ? 'loading...' : '';
	const connected = state.status === 'connected';
	const user = state.data ? `your logged as ${state.data.first_name}` : '';
	
	document.getElementById('connected').innerHTML = connected;
	document.getElementById('process').innerHTML = process;
	document.getElementById('user').innerHTML = user;
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
