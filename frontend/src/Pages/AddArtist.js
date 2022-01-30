import React from "react";

export const AddArtist = () => {
  return (
    <React.Fragment>
      <div className="m-5">
        <div className="row">
          <div className="offset-2 col-lg-8 border custom-shadow p-5">
            <h4 className="text-center">Create An Artist</h4>
            <p className="text-center">Fill Artist Details</p>
            <div>
              <form>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Artist Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Cover Image</label>
                  <div className="col-sm-8">
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label">Biography</label>
                  <div className="col-sm-8">
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
                <label className="col-sm-4 col-form-label">Roles</label>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Artist</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Singer</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Composer</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Lyricist</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">
                        Voice Over Artist
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="artist"
                      />
                      <label className="form-check-label">Song Engineer</label>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button type="button" className="btn btn-primary mx-3">
                    Add Artist
                  </button>
                  <button type="button" className="btn btn-danger px-3">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
