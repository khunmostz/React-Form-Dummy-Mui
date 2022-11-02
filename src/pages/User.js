import * as React from "react";
import Drawer from "../component/Drawer";
import { DataGrid } from "@mui/x-data-grid";
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
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, IconButton, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import FormDialog from "../component/Dialog";
import EditForm from "../component/Edit";

export default function User() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = React.useState([]);
  const [course, setCourse] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [refreshKey, setRefreshKey] = React.useState(0);

  const [listUpdate, setListUpdate] = React.useState([]);

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

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  React.useEffect(() => {
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
    { field: "npcId", headerName: "NPC", width: 100 },
    { field: "courseId", headerName: "ID", width: 80 },
    { field: "courseName", headerName: "Name", width: 160 },
    { field: "courseTeacher", headerName: "Teacher", width: 160 },
    { field: "courseCredit", headerName: "Credit", width: 80 },
    { field: "courseDesc", headerName: "Description", width: 160 },

    {
      headerName: "",
      field: ".",
      width: 120,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <IconButton aria-label="edit" size="large">
            <EditIcon
              fontSize="inherit"
              onClick={(e) => {
                e.preventDefault();
                handleEditOpen();
                console.log(row.courseId);
                setListUpdate(row);
              }}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              deleteCourse(row.npcId);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [eopen, seteOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const handleEditOpen = (courseId) => {
    seteOpen(true);
  };
  const handleEditClose = (value) => {
    seteOpen(false);
  };

  return (
    <Drawer>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          variant="outlined"
          sx={{marginTop: "20px", 
            marginBottom: "10px" }}
          onClick={() => {
            handleClickOpen();
          }}
        >
          Add Course
        </Button>
      </Box>

      {/* Edit Form */}
      <EditForm
        handleEditOpen={eopen}
        handleClose={handleEditClose}
        value={listUpdate}
      ></EditForm>

      {/* Add Form */}
      <FormDialog handleOpen={open} handleClose={handleClose} />

      <Box sx={{
        display: "flex",
        height:740.6  ,
      }}>

        {/* User Table */}
        <Box style={{ height: "90%", width: "40%" }}>
          <h1>User</h1>
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
        {/* Course Table */}
        <Box style={{ height: "90%", width: "60%" }}>
          <h1>Course</h1>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            rows={course.map((item, index) => ({
              id: index,
              npcId: item.npcId,
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
