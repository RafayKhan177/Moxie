import { useFirebase } from "../context/firebase";
import Avatar from "../assets/Avatar.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Account = () => {
  const firebase = useFirebase();
  const user = firebase.user;

  const signOut = () => {
    firebase.signOut();
  };
  if (!user) {
    // Return a loading state or redirect the user to the login page
    return (
      <section
        style={{
          backgroundColor: "#ffffffe0",
          margin: "5rem 0",
          padding: "1rem",
          borderRadius: ".8rem",
          margin: "5rem auto",
        }}
        className="container"
      >
        <div className="row">
          <div
            className="card mb-4"
            style={{ width: "18rem", padding: "1rem", margin: "auto" }}
          >
            <div className="card-body text-center ">
              <img
                src={Avatar}
                alt="avatar"
                className="rounded-circle img-fluid mx-auto"
                style={{ width: "12rem", height: "12rem", objectFit: "cover" }}
              />
              <h5 className="my-3">"Please Login"</h5>
              <p className="text-muted mb-1">My Details</p>
              <p className="text-muted mb-4">"Email Not Found"</p>
              <div className="d-flex justify-content-center mb-2">
                <Link to="/Home/SignUp">
                  <Button  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/Home/SignIn">
                  <Button
                    var='conatined'
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <section
        style={{
          backgroundColor: "#ffffffe0",
          margin: "5rem 0",
          padding: "1rem",
          borderRadius: ".8rem",
          margin: "5rem auto",
        }}
        className="container"
      >
        <div className="row">
          <div className="">
            <div className="card mb-4">
              <div className="card-body text-center ">
                <img
                  src={user.photoURL || Avatar}
                  alt="avatar"
                  className="rounded-circle img-fluid mx-auto"
                  style={{
                    width: "12rem",
                    height: "12rem",
                    objectFit: "cover",
                  }}
                />
                <h5 className="my-3">{user.displayName || "Please Login"}</h5>
                <p className="text-muted mb-1">My Details</p>
                <p className="text-muted mb-4">
                  {user.email || "Email Not Found"}
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <Link to="/Home/EditProfile">
                    <button type="button" className="btn btn-primary mx-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.displayName || "Please Sign In"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.email || "Email Not Found"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.phoneNumber || "Number Not Found"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  {/* <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(098) 765-4321</p>
                    </div>
                  </div> */}
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.address || "Address Not Found"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          Assignment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          Assignment
                        </span>
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div
                        className="progress rounded"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow="55"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div
                        className="progress rounded mb-2"
                        style={{ height: "5px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow="66"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
