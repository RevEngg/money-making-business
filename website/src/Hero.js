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
import Select from "@material-ui/core/Select";
import firebase from "./fire";

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
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [semester, setSemester] = React.useState("");
  const [fileCategory, setCategory] = React.useState("");
  const [fileClass, setClass] = React.useState("");

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleClassChange = (event) => {
    setClass(event.target.value);
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

  const onChange = (e) => {
    const file = e.target.files[0];
    const uploadTask = firebase.storage().ref().child(file.name).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {},
      () => {
        firebase
          .storage()
          .ref()
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            firebase
              .firestore()
              .collection("files")
              .doc()
              .set({
                downloadUrl: url,
                fileName: e.target.files[0].name,
                fileSize: e.target.files[0].size,
                fileType: e.target.files[0].type,
                uploadTime: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .catch((err) => {});
          });
      }
    );
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
      <input type="file" onChange={onChange} />
      <progress value={progress} max="100" />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          onChange={handleSemesterChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
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

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fileClass}
          onChange={handleClassChange}
        >
          <MenuItem value={"MACT"}>MACT</MenuItem>
          <MenuItem value={"ISMA"}>ISMA</MenuItem>
          <MenuItem value={"CTIS"}>CTIS</MenuItem>
          <MenuItem value={"DA"}>DA</MenuItem>
          <MenuItem value={"General"}>General</MenuItem>
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
