import * as React from "react";
import Drawer from "../component/Drawer";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { Await, useLocation, useNavigate } from "react-router-dom";
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
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, IconButton, Button } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import { OpenInBrowserOutlined } from "@mui/icons-material";
import FormDialog from "../component/Dialog";
import { Chart } from "../component/Chart";
export default function User() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [refreshKey, setRefreshKey] = React.useState(0);

  const notifySuccess = (message) => toast.success(message);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const fetchUser = async () => {
    setName([]);
    try {
      const q = query(collection(db, "users"));
      const doc = await getDocs(q);
      doc.docs.forEach((result) => {
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
        setCourse((arr) => [...arr, result.data()]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (value) => {
    const db = getFirestore();

    const docRef = doc(db, "course-kbu", value);

    deleteDoc(docRef)
      .then(async () => {
        console.log("Entire Document has been deleted successfully.");
        notifySuccess("Delete Successful!");
        await delay(1500);
        setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCourse = async (
    value,
    CourseId,
    CourseName,
    CourseCredit,
    CourseDesc,
    CourseTeacher
  ) => {
    const db = getFirestore();

    const docRef = doc(db, "course-kbu", value);

    updateDoc(docRef, {
      CourseId,
      CourseName,
      CourseCredit,
      CourseDesc,
      CourseTeacher,
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
  }, [refreshKey]);
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
            onClick={(e) => {
              e.preventDefault();
              deleteCourse(row.courseId);
              console.log(row.courseId);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    //setSelectedValue(value);
  };

  return (
    <Drawer>
      <Chart></Chart>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onClick={() => {
            handleClickOpen();
            console.log("form user " + open);
          }}
        >
          Add Course
        </Button>
      </Box>

      <FormDialog handleOpen={open} handleClose={handleClose} />
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
        <Box sx={{ width: "20px" }}></Box>
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
