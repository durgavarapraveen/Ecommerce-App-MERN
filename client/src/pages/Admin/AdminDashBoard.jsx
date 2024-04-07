import React from "react";
import Layoyt from "../../components/layout/Layoyt";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../Context/Auth";

function AdminDashBoard() {
  const [auth] = useAuth();

  return (
    <Layoyt title={"Admin Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layoyt>
  );
}

export default AdminDashBoard;
