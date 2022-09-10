var domain="www.paguetodo.com";
// var domain="https://"+domain+"/";
function getDomain(){
	return domain;
}
// function doLogout(){
// 	localStorage.clear();
// 	sessionStorage.clear();
// }
function getRealm(){
	return "cuyawa";
}
function getApi(){
	return "https://apid.paguetodo.com/demo/";
}
function getEnlaceAuth(){
	return "deegle_auth";
}

function getEnlaceDeegle(){
	return "deegle";
}
function getEnlaceDeegleV2(){
	return "deeglev2";
}
function getPaguetodo(type){
	if(type === 'issue_open'){
		return '25bd5949-6944-45fa-b079-f80ed02fcfdd'
	}
	if(type === 'website_email'){
		return '9d2029de-d0c7-47d6-b948-bc44aa894bac'
	}
	if(type === 'user_petition'){
		return '7fb3d54d-a981-4506-b40c-97deeb2d9513'
	}
}

function getAppId(){
	return '99475e85-9623-40b5-8f45-0dfbc78adb77'
}
function getAppId2(){
	return '7fb3d54d-a981-4506-b40c-97deeb2d9513';
}
function getApi(){
	return "https://apid.paguetodo.com/demo/";
}

function getClient(){
	//return '1513e893-b95d-4371-ae24-7141c4e5e3d9';
	return "99475e85-9623-40b5-8f45-0dfbc78adb77";
}
