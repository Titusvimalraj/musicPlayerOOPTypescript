import Layout from "./layout";
import MusicPlayer from "./musicPlayer";

let initialLayout = new Layout();
initialLayout.createLayout();

let musicPlayer = new MusicPlayer();
musicPlayer.getMusic();

let searchOption = () => {
	let searchText = (<HTMLInputElement>document.getElementById("search-box"))
		.value;
	let oldPlayList = <HTMLInputElement>document.getElementById("playlist-row");

	musicPlayer.getMusic(searchText);
	let playListRow = <HTMLInputElement>document.getElementById("playlist-row");
	playListRow.innerHTML = oldPlayList.innerHTML;
};

(<HTMLElement>document.getElementById("search-button")).onclick = () => {
	searchOption();
};
