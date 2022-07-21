import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useNavigate } from "react-router-dom";
const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams("");
  console.log(id);
  const [getUserdata, setUserdata] = useState([]);
  console.log(getUserdata);
  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("Get data");
    }
  };

  useEffect(() => {
    getdata();
  });
  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontweight: 400 }}>Welcome {getUserdata.name} </h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getUserdata._id}`}>
              {" "}
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>

            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getUserdata._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 80 }} alt="profile" />
              <h3 className="mt-3">
                Name:{" "}
                <span style={{ fontWeight: 400 }}>{getUserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span style={{ fontWeight: 400 }}>{getUserdata.age}</span>
              </h3>
              <p>
                <MailOutlineIcon />
                Email: <span>{getUserdata.email}</span>
              </p>
              <p>
                <WorkIcon />
                Occuption: <span>{getUserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p>
                <PhoneAndroidIcon />
                Mobile: <span>+91 {getUserdata.mobile}</span>
              </p>
              <p>
                <LocationOnIcon />
                Location: <span>{getUserdata.add}</span>
              </p>
              <p>
                Description:
                <span>{getUserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
