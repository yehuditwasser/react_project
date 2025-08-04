import { useState } from "react";
import styles from "./Register.module.css";
import { registerService } from "../../services";
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
const Register = () => {
  const myNevigate = useNavigate()
  const [res, setRes] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const register = () => {
    setRes(registerService({ name, email, phone, userName, password }));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"רישום משתמש חדש"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={styles.registerWrapper}>
              <TextField onBlur={(e) => setName(e.target.value)} id="outlined-basic" label="name" variant="outlined" /><br></br><br></br>
              <TextField onBlur={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" /><br></br><br></br>
              <TextField onBlur={(e) => setPhone(e.target.value)} id="outlined-basic" label="Phone" variant="outlined" /><br></br><br></br>
              <TextField onBlur={(e) => setUserName(e.target.value)} id="outlined-basic" label="User name" variant="outlined" /><br></br><br></br>
              <TextField onBlur={(e) => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" /><br></br><br></br>

              <Button onClick={() => register()}>Register</Button>
              {res != "" && myNevigate("/login")}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>


    </>
  );
};

export default Register;
