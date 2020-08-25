class Controls {
	constructor() {}
	actions(action: string) {
		switch (action) {
			case "play":
				(<HTMLAudioElement>document.getElementById("player")).play();
				break;
			case "pause":
				(<HTMLAudioElement>document.getElementById("player")).pause();
				break;
			case "volumeUp":
				if ((<HTMLAudioElement>document.getElementById("player")).volume < 1) {
					(<HTMLAudioElement>document.getElementById("player")).volume += 0.2;
				} else {
					return;
				}

				break;
			case "volumeDown":
				if ((<HTMLAudioElement>document.getElementById("player")).volume > 0) {
					(<HTMLAudioElement>document.getElementById("player")).volume -= 0.2;
				} else {
					return;
				}
				break;
			default:
				break;
		}
	}
}

export default Controls;
