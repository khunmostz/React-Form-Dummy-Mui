import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import {
  query,
  collection,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [courseId, setCourseId] = React.useState("");
  const [npcId, setNpcId] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [courseTeacher, setCourseTeacher] = React.useState("");
  const [courseCredit, setCourseCredit] = React.useState("");
  const [courseDesc, setCourseDesc] = React.useState("");

  const addCourse = async (
    npcId,
    courseId,
    courseName,
    courseCredit,
    courseDesc,
    courseTeacher
  ) => {
    console.log(courseTeacher);

    const db = getFirestore();
    const q = query(collection(db, "course-kbu"));
    const docRef = doc(q, npcId);
    await setDoc(docRef, {
      npcId: npcId,
      courseId: courseId,
      courseName: courseName,
      courseTeacher: courseTeacher,
      courseCredit: courseCredit,
      courseDesc: courseDesc,
    })
      .then(() => {
        window.location.reload();
        console.log("add Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ width: "100%" }}>
      <DialogTitle>เพิ่มหลักสูตรการเรียน</DialogTitle>
      <List sx={{ pt: 0 }}>
      <ListItem>
          <TextField
            required
            id="outlined-required"
            label="npcId"
            value={npcId}
            onChange={(e) => {
              setNpcId(e.target.value);
              console.log(npcId);
            }}
            sx={{
              width:500,
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="รหัสรายวิชา"
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
              console.log(courseId);
            }}
            sx={{
              width:500,
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="ชื่อรายวิชา"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
              console.log(courseName);
            }}
            sx={{
              width:'100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="ชื่อผู้สอน"
            value={courseTeacher}
            onChange={(e) => {
              setCourseTeacher(e.target.value);
              console.log(courseTeacher);
            }}
            sx={{
              width:'100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            required
            id="outlined-required"
            label="หน่่วยกิต"
            value={courseCredit}
            onChange={(e) => {
              setCourseCredit(e.target.value);
              console.log(courseCredit);
            }}
            sx={{
              width:'100%',
            }}
          />
        </ListItem>
        <ListItem>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-multiline-static"
            label="รายละเอียด"
            multiline
            rows={4}
            value={courseDesc}
            onChange={(e) => {
              setCourseDesc(e.target.value);
              console.log(courseDesc);
            }}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => {
              addCourse(
                npcId,
                courseId,
                courseName,
                courseCredit,
                courseDesc,
                courseTeacher
              );
            }}
          >
            เพิ่มหลักสูตร
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

export default function FormDialog({ handleOpen, handleClose }) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  return (
    <div>
      <SimpleDialog
        //selectedValue={selectedValue}
        open={handleOpen}
        onClose={handleClose}
      />
    </div>
  );
}
