import facebook from '../src/index.js';

window.facebook = facebook;

const params = {
	appId: '260170667658655'
};

function callback(state) {
	console.log(state);
}

window.cLogin = () => {
	facebook.callback.login(params, callback);
}
