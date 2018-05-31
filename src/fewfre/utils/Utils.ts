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
	
	///////////////////
	// Clipboard Access
	///////////////////
	// https://stackoverflow.com/a/30810322/1411473
	static copyTextToClipboard(text:string) : void {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			var flagSuccessful = document.execCommand('copy');
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}
		document.body.removeChild(textArea);
	}
	static copyToClipboardSupported() : boolean {
		return !!document.queryCommandSupported('copy');
	}
}