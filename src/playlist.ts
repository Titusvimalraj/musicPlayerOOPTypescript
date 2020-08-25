class Player {
	constructor() {}

	addToPlayList(
		title: string,
		artist: string,
		id: number,
		url: string,
		albumcover: string,
		rank: string
	) {
		if (!(<HTMLElement>document.getElementById(`playList${id}`))) {
			let playListElementInnerHTML = `   <div class="col-12" id="playList${id}">
            <div class="card playlist-card">
              <div class="card-body">
                <span class="d-flex justify-content-between">
                  <p class="d-flex align-items-center">Title: ${title}</p>
                  <p class="d-flex align-items-center">Artist: ${artist}</p>
                  <p class="d-flex align-items-center"><button class="btn" onclick="document.getElementById('playList${id}').remove();"><i class="fas fa-minus-circle fa-3x"></i></button></p>
                </span>
              </div>
              <div class="card-footer d-flex flex-column align-items-center">
              <button class="btn player-button" onclick="document.getElementById('player').src=\'${url}\';document.getElementById('current-music-player').getElementsByTagName(
                'img'
            )[0].src=\"${albumcover.toString()}\"; document.getElementById('current-music-player').getElementsByClassName(
                'card-title'
            )[0].innerHTML=\"${title.toString()}\"; document.getElementById('current-music-player').getElementsByClassName(
                'card-text'
            )[0].innerHTML=\"${artist.toString()}\"; document.getElementById('current-music-player').getElementsByTagName(
                'small'
            )[0].innerHTML=\"${rank.toString()}\"; document.getElementById('player').play();"><i class="far fa-play-circle fa-3x"></i></button>
              </div>
            </div>
          </div>`;

			let playListElement = <HTMLElement>(
				document.getElementById("playlist-row")
			);

			playListElement.innerHTML =
				playListElement.innerHTML + playListElementInnerHTML;
		}
		return;
	}
}
export default Player;

// onclick="document.getElementById('${id}').click()"
