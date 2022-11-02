import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import {
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, value } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  var [npcId, setnpcId] = React.useState("");
  var [courseId, setCourseId] = React.useState("");
  var [courseName, setCourseName] = React.useState("");
  var [courseTeacher, setCourseTeacher] = React.useState("");
  var [courseCredit, setCourseCredit] = React.useState("");
  var [courseDesc, setCourseDesc] = React.useState("");

  npcId = value.npcId;
  courseName = value.courseName;
  courseTeacher = value.courseTeacher;
  courseCredit = value.courseCredit;
  courseDesc = value.courseDesc;

  const updateCourse = async (
    npcId,
    courseId,
    courseName,
    courseCredit,
    courseTeacher,
    courseDesc,

  ) => {
    const db = getFirestore();

    const docRef = doc(db, "course-kbu", npcId);

    console.log(courseId, courseName, courseCredit, courseDesc, courseTeacher);
    try {
      updateDoc(docRef, {
        courseId: courseId,
        courseName: courseName,
        courseTeacher: courseTeacher,
        courseCredit: courseCredit,
        courseDesc: courseDesc,
      })
        .then(() => {
          console.log("success");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) { }

  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>แก้ไขหลักสูตร</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="รหัสรายวิชา"
            //value={courseId}
            defaultValue={value.courseId}
            onChange={(e) => {
              value.courseId = e.target.value;
              console.log(value.courseId);
            }}
            sx={{
              width: 500,
            }} 
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="ชื่อรายวิชา"
            //value={courseId}
            defaultValue={value.courseName}
            onChange={(e) => (value.courseName = e.target.value)}
            sx={{
              width: '100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="ชื่อผู้สอน"
            //value={courseId}
            defaultValue={value.courseTeacher}
            onChange={(e) => {
              (value.courseTeacher = e.target.value)
              console.log(value.courseTeacher)
            }}
            sx={{
              width: '100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="หน่วยกิต"
            //value={courseId}
            defaultValue={value.courseCredit}
            onChange={(e) => (value.courseCredit = e.target.value)}
            sx={{
              width: '100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            sx={{
              width: "100%",
              height: 100,
              marginBottom: "10%",
            }}
            required
            id="outlined-multiline-static"
            label="รายละเอียด"
            multiline
            rows={4}
            //value={courseId}
            defaultValue={value.courseDesc}
            onChange={(e) => (value.courseDesc = e.target.value)}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              console.log("accepth");
              updateCourse(
                value.npcId,
                value.courseId,
                value.courseName,
                value.courseCredit,
                value.courseTeacher,
                value.courseDesc,
              );
            }}
          >
            ยืนยันการแก้ไข
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function EditForm({ handleEditOpen, handleClose, value }) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  //console.log(value);
  return (
    <div>
      <SimpleDialog
        //selectedValue={selectedValue}
        open={handleEditOpen}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
