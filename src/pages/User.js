import * as React from "react";
import Drawer from "../component/Drawer";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { useLocation, useNavigate } from "react-router-dom";
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
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, IconButton } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

export default function User() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const notifySuccess = (message) => toast.success(message);

  const showUser = [];
  const showCourse = [];

  const fetchUser = async () => {
    setName([]);
    try {
      const q = query(collection(db, "users"));
      const doc = await getDocs(q);
      doc.docs.forEach((result) => {
        showUser.push(result.data());
        setName((arr) => [...arr, result.data()]);
      });
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
        showCourse.push(result.data());
        setCourse((arr) => [...arr, result.data()]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const test = async (value) => {
    const db = getFirestore();

    const docRef = doc(db, "course-kbu", value);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
        notifySuccess("Delete Successful!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
    { field: "courseDesc", headerName: "CourseDesc", width: 160 },
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
              test(row.courseId);
              //deleteCourse(row.courseId);
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
              courseDesc: item.courseDesc,
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
