import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "./fire";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);

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
  user.providerData.forEach((userInfo) => {});

  return (
    <div>
      <section className="hero">
        <nav>
          <h2>Welcome {user.email}!</h2>
          <Button onClick={handleClickOpen} disableElevation>
            Logout
          </Button>
        </nav>
        <input type="file" onChange={onChange} />
        <progress value={progress} max="100" />
      </section>

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
    </div>
  );
}
