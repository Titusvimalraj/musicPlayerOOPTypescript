class Layout {
	constructor() {}

	createLayout() {
		let initialLayout = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-2 pl-2 pr-2">
  <a class="navbar-brand" href="/">TiMu</a>
  <div class="form d-flex ml-5 my-2 my-lg-0">
    <input class="form-control mr-2" type="search" id="search-box" placeholder="Search Music" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="button" id="search-button"><i class="fas fa-record-vinyl"></i></button>
  </div>
</nav>
<div class=row>
<div class="col-12 d-flex justify-content-center" id="current-music-player">

  </div>
</div>
<div class="container-fluid music-content-container">
  <div class="row">
    <div class="col-12">
      <div class="nav nav-pills" id="pills-tab" role="tablist">
        <a class="nav-link active" id="pills-all-music-tab" data-toggle="pill" href="#pills-all-music" role="tab" aria-controls="pills-all-music" aria-selected="true">All Music</a>
        <a class="nav-link" id="pills-playlist-tab" data-toggle="pill" href="#pills-playlist" role="tab" aria-controls="pills-playlist" aria-selected="false">Playlist</a>
      </div>
    </div>
    <div class="col-10 offset-1">
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-all-music" role="tabpanel" aria-labelledby="pills-all-music-tab">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4  mt-3" id="all-music-content-area">
          </div>
        </div>
        <div class="tab-pane fade" id="pills-playlist" role="tabpanel" aria-labelledby="pills-playlist-tab">
          <div class="row mt-3" id="playlist-row">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
		(<HTMLElement>document.getElementById("body")).innerHTML = initialLayout;
	}
}

export default Layout;
