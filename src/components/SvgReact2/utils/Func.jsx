
import Module from '../Module';

export function rendomId(){
	return Math.random().toString(36).slice(-6);
}

export function moduleFactory(type,x,y){
	const id = rendomId();
	const module = new Module(id,type,x,y);
	return module;
}