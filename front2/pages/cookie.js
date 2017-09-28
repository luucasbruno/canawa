
//
// http://www.w3schools.com/js/js_cookies.asp
//

function setCookie(cname, cvalue, exdays) {
	var expires = 0;
	if(exdays > 0)
	{
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    expires = "expires="+ d.toUTCString();
	}
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cname){
	setCookie(cname, "", -1);
}
function clearAllCookies(){
	var cookies = document.cookie.split(";");
	for(var i = 0; i < cookies.length; i++)
	{
		deleteCookie(cookies[i].split("=")[0]);
	}
}



