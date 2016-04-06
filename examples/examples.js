import facebook from '../src/index.js';

window.facebook = facebook;

const params = {
	appId: '260170667658655'
};

function callback(state) {
	document.getElementById('status').innerHTML = state.status;
	
	console.log(state);
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
