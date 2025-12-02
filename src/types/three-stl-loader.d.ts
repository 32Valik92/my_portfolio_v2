declare module "three/examples/jsm/loaders/STLLoader" {
	import { BufferGeometry,Loader, LoadingManager } from "three";

	export class STLLoader extends Loader {
	  constructor(_manager?: LoadingManager);
	  load(
			_url: string,
			_onLoad: (_geometry: BufferGeometry) => void,
			_onProgress?: (_event: ProgressEvent) => void,
			_onError?: (_event: ErrorEvent) => void
		): void;
	  parse(_data: ArrayBuffer): BufferGeometry;
	}
}
