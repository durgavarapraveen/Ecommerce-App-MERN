import React from "react";
import Layoyt from "../layout/Layoyt";
import UserMenu from "../layout/UserMenu";
import { useAuth } from "../../Context/Auth";

function DashBoard() {

  const [auth] = useAuth();

  return (
    <Layoyt title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name : {auth?.user?.name}</h3>
              <h3>User Email : {auth?.user?.email}</h3>
              <h3>User Contact : {auth?.user?.phone}</h3>
              <h3>User Address : {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default DashBoard;
