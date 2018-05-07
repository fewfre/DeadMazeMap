export default class Utils
{
	static clamp(pVal : number, pMin : number, pMax : number) : number {
		return Math.min(Math.max(pVal, pMin), pMax);
	}
	static getUrlParameter(name:string, url?:string) : string {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
}