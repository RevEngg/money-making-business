import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";
import firebase from "./fire";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [semester, setSemester] = React.useState("");
  const [fileCategory, setCategory] = React.useState("");
  const [fileClass, setClass] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [notesAsFile, setNotesAsFile] = React.useState("");

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleClassChange = (event) => {
    setClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSuccessSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setNotesAsFile((notesFile) => file);
  };

  const uploadFileTask = () => {
    if (notesAsFile.size > 10485760) {
      alert("File size must be under 10MB");
      return;
    } else {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(
          `jain_university_jayanagar/bca/${semester}/${fileClass}/${subject}/${fileCategory}${notesAsFile.name}${notesAsFile.name}`
        )
        .put(notesAsFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          setProgress(0);
          setSnackbarOpen(true);
          firebase
            .storage()
            .ref()
            .child(
              `jain_university_jayanagar/bca/${semester}/${fileClass}/${subject}/${fileCategory}${notesAsFile.name}${notesAsFile.name}`
            )
            .getDownloadURL()
            .then((url) => {
              firebase.firestore().collection("files").doc().set({
                college: "Jain University",
                degree: "BCA",
                collegeId: "jain_university_jayanagar",
                semester: semester,
                class: fileClass,
                category: fileCategory,
                subject: subject,
                downloadUrl: url,
                fileName: notesAsFile.name,
                fileSize: notesAsFile.size,
                fileType: notesAsFile.type,
                uploadTime: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const user = firebase.auth().currentUser;

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5">
            Welcome {user.email}!
          </Typography>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <input type="file" id="fileInput" onChange={handleFileSelect} />
      <button onClick={uploadFileTask} disabled={notesAsFile < 1}>
        Upload
      </button>
      <progress value={progress} max="100" />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fileClass}
          onChange={handleClassChange}
        >
          <MenuItem value={"MACT"}>MACT</MenuItem>
          <MenuItem value={"IOT"}>IOT</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          onChange={handleSemesterChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          onChange={handleSubjectChange}
        >
          <MenuItem value={"Sub 1"}>RIMS</MenuItem>
          <MenuItem value={"Sub 2"}>SE</MenuItem>
          <MenuItem value={"Sub 3"}>EVS</MenuItem>
          <MenuItem value={"Sub 4"}>IOSE</MenuItem>
          <MenuItem value={"Sub 5"}>MDC</MenuItem>
          <MenuItem value={"Sub 6"}>Aptitude</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fileCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value={"Notes"}>Notes</MenuItem>
          <MenuItem value={"Question Papers"}>Question Papers</MenuItem>
          <MenuItem value={"Syllabus"}>Syllabus</MenuItem>
          <MenuItem value={"Lab"}>Lab</MenuItem>
        </Select>
      </FormControl>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert onClose={handleSuccessSnackbarClose} severity="success">
          File Uploaded Successfully!
        </Alert>
      </Snackbar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Add another teacher</MenuItem>
        <MenuItem onClick={handleClickOpen}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
