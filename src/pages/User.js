import * as React from "react";
import Drawer from "../component/Drawer";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  query,
  collection,
  getDocs,
  where,
  arrayUnion,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, IconButton } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

export default function User() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);

  const showUser = [];
  const showCourse = [];
  const fakeUser = [
    {
      name: "user 1",
      age: "21",
      tel: "3123213",
    },
    {
      name: "user 2",
      age: "21",
      tel: "3123213",
    },
  ];
  const fetchUser = async () => {
    setName([]);
    try {
      const q = query(collection(db, "users"));
      const doc = await getDocs(q);
      doc.docs.forEach((result) => {
        showUser.push(result.data());
        setName((arr) => [...arr, result.data()]);
      });

      console.log("in function: " + showUser);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    setCourse([]);
    try {
      const q = query(collection(db, "course-kbu"));
      const doc = await getDocs(q);
      doc.docs.forEach((result) => {
        console.log(result.data());
        showCourse.push(result.data());
        setCourse((arr) => [...arr, result.data()]);
      });

      console.log("in function: " + showCourse);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  React.useEffect(() => {
    /*
    Query logic
    */ notifySuccess("Authentication Successful!");
    fetchUser();
    fetchCourse();

    console.log(typeof showUser);
    console.log("name : " + name);
  }, []);
  const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );

  const columnsUsers = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Username", width: 160 },
    { field: "age", headerName: "Age", width: 160 },
    {
      field: "tel",
      headerName: "Tel",
      width: 160,
    },
  ];

  const columnsCourse = [
    { field: "courseId", headerName: "CoureseId", width: 70 },
    { field: "courseName", headerName: "CourseName", width: 160 },
    { field: "courseTeacher", headerName: "CourseTeacher", width: 160 },
    { field: "courseCredit", headerName: "CourseCredit", width: 160 },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <IconButton aria-label="edit" size="large">
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Drawer>
      <Box sx={{ display: "flex" }}>
        <Box style={{ height: 400, width: "50%" }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            rows={name.map((item, index) => ({
              id: index,
              name: item.name,
              age: item.age,
              tel: item.tel,
            }))}
            columns={columnsUsers}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
        <Box style={{ height: 400, width: "50%" }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            rows={course.map((item, index) => ({
              id: index,
              courseId: item.courseId,
              courseName: item.courseName,
              courseTeacher: item.courseTeacher,
              courseCredit: item.courseCredit,
            }))}
            columns={columnsCourse}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
      <ToastContainer />
    </Drawer>
  );
}
