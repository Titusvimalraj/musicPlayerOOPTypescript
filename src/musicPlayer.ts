import Playlist from "./playlist";
import Controls from "./controls";
import deezerDataResponse from "./deezerDataResponse.model";
import deezerFullResponse from "./deezerFullResponse.model";
class MusicPlayer {
	constructor() { }

	createPlayerCurrentPlayer(
		albumCover: string = "",
		title: string = "Title",
		artist: string = "Artist",
		url: string,
		rank: number
	) {
		let controls = new Controls();

		let currentMusicPlayerInnerHTML = ` <div class="card text-center player">
        <img class="img img-fluid" src="${albumCover != ""
				? albumCover
				: "https://www.macworld.co.uk/cmsdata/features/3612963/how_to_get_music_on_iphone_1600home_thumb800.jpg"
			}" class="card-img-top" alt="Enjoy Listening to Music!">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${artist}</p>
        </div>
        <div class="card-footer d-flex flex-column align-items-center">
          <audio id="player" src="${url}"></audio>
          <input type="range" class="form-control-range" id="musicControlRange" value="0">
          <div id="player-controls">
            
          </div>
    
          <br>
          <small class="text-muted">Rank: ${rank}</small>
        </div>
      </div>`;

		(<HTMLElement>(
			document.getElementById("current-music-player")
		)).innerHTML = currentMusicPlayerInnerHTML;

		let controlsInnerHTML = `
        <button class="btn player-buttons" id="currentPlayerPlay"><i class="far fa-play-circle fa-2x"></i></button>
        <button class="btn player-buttons" id="currentPlayerPause"><i class="far fa-pause-circle fa-2x"></i></button>
        <button class="btn player-buttons" id="currentPlayerVolumeUp"><i class="fas fa-volume-up fa-2x"></i></button>
        <button class="btn player-buttons" id="currentPlayerVolumeDown"><i class="fas fa-volume-down fa-2x"></i></button>
        `;

		(<HTMLElement>(
			document.getElementById("player-controls")
		)).innerHTML = controlsInnerHTML;

		let actions: string[][] = [
			["currentPlayerPlay", "play"],
			["currentPlayerPause", "pause"],
			["currentPlayerVolumeUp", "volumeUp"],
			["currentPlayerVolumeDown", "volumeDown"],
		];

		for (let action of actions) {
			let [id, controlType] = action;
			(<HTMLElement>document.getElementById(id)).onclick = () => {
				controls.actions(controlType);
			};
		}
		let musicPlayer = <HTMLAudioElement>document.getElementById("player");
		musicPlayer.ontimeupdate = function () {
			let playerLoopRange =
				(musicPlayer.currentTime / musicPlayer.duration) * 100;
			(<HTMLInputElement>(
				document.getElementById("musicControlRange")
			)).value = playerLoopRange.toString();
		};
	}

	async getMusic(search: string = "") {
		let response: Response = await fetch(
			`https://deezerdevs-deezer.p.rapidapi.com/search?q='${search}'&limit=100`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
					"x-rapidapi-key":
						"389d86db34msh546e9bf61f1649fp1f6b00jsnf4f8e203b1c2",
				},
			}
		);
		let data: deezerFullResponse = await response.json();
		data.data = this.shuffle(data.data);
		// console.log(data);
		// console.log(data.data.length);
		// console.log(data.data.slice(1).length);

		if (data != null && data.data != null) {
			let musicList: deezerDataResponse[] = data.data;
			let firstFeature: deezerDataResponse = musicList.slice(0, 1)[0];
			this.createPlayerCurrentPlayer(
				firstFeature.album.cover_big,
				firstFeature.title_short,
				firstFeature.artist.name,
				firstFeature.preview,
				firstFeature.rank
			);

			let musicListInnerHTML: string = "";
			musicList.forEach((ele: deezerDataResponse, i: number) => {
				// console.log(ele);
				// console.log(ele.title_short);
				musicListInnerHTML += this.createMusicListElements(
					ele.album.cover_big,
					ele.title_short,
					ele.artist.name,
					ele.preview,
					ele.id,
					ele.rank
				);
			});
			// console.log(musicListInnerHTML);

			(<HTMLElement>(
				document.getElementById("all-music-content-area")
			)).innerHTML = musicListInnerHTML;
			// .getElementsByTagName('button')[0].onclick=()
			let musicListChildElementCollection: HTMLCollection = (<HTMLElement>(
				document.getElementById("all-music-content-area")
			)).children;

			// console.log(musicListChildElementCollection);

			let playlist = new Playlist();
			for (let i = 0; i < musicListChildElementCollection.length; i++) {
				let playButton = musicListChildElementCollection[
					i
				].getElementsByTagName("button")[0];

				let addToPlayListButton = musicListChildElementCollection[
					i
				].getElementsByTagName("button")[1];

				let musicListChildtitle = (<HTMLElement>(
					musicListChildElementCollection[i].getElementsByClassName(
						"card-title"
					)[0]
				)).innerText;
				let musicListChildNameArtist = (<HTMLElement>(
					musicListChildElementCollection[i].getElementsByClassName(
						"card-text"
					)[0]
				)).innerText;
				let musicListChildId = Number(
					musicListChildElementCollection[i].getElementsByTagName("button")[0]
						.id
				);

				let musicListChildUrl = (<HTMLElement>(
					musicListChildElementCollection[i].getElementsByClassName(
						"card-url"
					)[0]
				)).innerHTML;

				let musicListChildAlbumCover = musicListChildElementCollection[
					i
				].getElementsByTagName("img")[0].src;

				let musicListChildRank = musicListChildElementCollection[
					i
				].getElementsByTagName("small")[0].innerHTML;

				playButton.onclick = () => {
					let mainPlayerElement = <HTMLAudioElement>(
						document.getElementById("player")
					);

					let currentPlayerCardElement = <HTMLAudioElement>(
						document.getElementById("current-music-player")
					);

					mainPlayerElement.src = musicListChildUrl.toString();
					currentPlayerCardElement.getElementsByTagName(
						"img"
					)[0].src = musicListChildAlbumCover;

					currentPlayerCardElement.getElementsByClassName(
						"card-title"
					)[0].innerHTML = musicListChildtitle;
					currentPlayerCardElement.getElementsByClassName(
						"card-text"
					)[0].innerHTML = musicListChildNameArtist;

					currentPlayerCardElement.getElementsByTagName(
						"small"
					)[0].innerHTML = musicListChildRank;

					mainPlayerElement.play();
				};

				addToPlayListButton.onclick = () => {
					playlist.addToPlayList(
						musicListChildtitle,
						musicListChildNameArtist,
						musicListChildId,
						musicListChildUrl,
						musicListChildAlbumCover,
						musicListChildRank
					);
				};
			}
		}

		return;
	}

	createMusicListElements(
		albumCover: string = "",
		title: string = "Title",
		artist: string = "Artist",
		url: string,
		id: number,
		rank: number
	): string {
		let musicListElementInnerHTML = ` <div class="col-12 mb-4" id="musicList${id}">
		<div class="card text-center music-list-card">
		  <img src="${albumCover}" class="card-img-top" alt="...">
		  <div class="card-body">
			<h5 class="card-title">${title}</h5>
			<p class="card-text">${artist}</p>
			<p class="card-url" style="display:none" data-url="${url}">${url}</p>
		  </div>
		  <div class="card-footer d-flex flex-column align-items-center">			
			<div>
			  <span>
				<button class="btn player-button" id="${id}"><i class="far fa-play-circle fa-3x"></i></button>
				<button class="btn player-button" type="button" data-toggle="tooltip" data-placement="top"  title="Add to Playlist">
				  <i class="fas fa-plus-circle fa-3x"></i>
				</button>
			  </span>
			  <br>
			  <small class="text-muted">Rank :${rank}</small>
			</div>
		  </div>
		</div>
	  </div>`;

		return musicListElementInnerHTML;
	}

	shuffle(array: deezerDataResponse[]) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}

export default MusicPlayer;
