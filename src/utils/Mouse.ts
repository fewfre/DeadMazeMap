import FewfEvent from "./FewfEvent";
import Utils from "./Utils";
import Global from "./Global";
import ConstantsApp from "../app/ConstantsApp";

export default class Mouse
{
	static mouseX		: number;
	static mouseY		: number;
	static flagMouseDown: boolean;
	
	static onMouseMove	: FewfEvent;
	static onClick		: FewfEvent;
	static onMouseDown	: FewfEvent;
	static onMouseUp	: FewfEvent;
	
	static init() : void {
		Mouse.mouseX = -1000;
		Mouse.mouseY = -1000;
		Mouse.flagMouseDown = false;
		window.addEventListener("mousemove", Mouse._onmousemove);
		Global.canvas.addEventListener("mouseout", Mouse._onmouseout);
		Global.canvas.addEventListener("click", Mouse._onClick);
		Global.canvas.addEventListener("mousedown", Mouse._onmousedown);
		window.addEventListener("mouseup", Mouse._onmouseup);
		
		Mouse.onMouseMove = new FewfEvent();
		Mouse.onClick = new FewfEvent();
		Mouse.onMouseDown = new FewfEvent();
		Mouse.onMouseUp = new FewfEvent();
	}
	
	static _onmousemove(e:MouseEvent) : void {
		Mouse.mouseX = e.pageX - Global.canvas.offsetLeft;
		Mouse.mouseY = e.pageY - Global.canvas.offsetTop;
		if(!Mouse.flagMouseDown) {
			Mouse.mouseX = Utils.clamp(Mouse.mouseX, 0, ConstantsApp.STAGE_WIDTH);
			Mouse.mouseY = Utils.clamp(Mouse.mouseY, 0, ConstantsApp.STAGE_HEIGHT);
		}
		Mouse.onMouseMove.dispatch();
	}
	
	static _onmouseout(e:MouseEvent) : void {
		// Mouse.mouseX = -1000, Mouse.mouseY = -1000;
		Mouse.onMouseMove.dispatch();
	}
	
	static _onClick(e:MouseEvent) : void {
		Mouse.onClick.dispatch();
	}
	
	static _onmousedown(e:MouseEvent) : void {
		Mouse.flagMouseDown = true;
		Mouse.onMouseDown.dispatch();
	}
	
	static _onmouseup(e:MouseEvent) : void {
		if(!Mouse.flagMouseDown) { return; }
		Mouse.flagMouseDown = false;
		Mouse.onMouseUp.dispatch();
	}
}