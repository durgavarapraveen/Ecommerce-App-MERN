import React from "react";
import Layoyt from "../../components/layout/Layoyt";
import AdminMenu from "../../components/layout/AdminMenu";

function Users() {
  return (
    <Layoyt>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default Users;
