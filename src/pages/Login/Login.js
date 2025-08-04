import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {

    if (!userName || !password) {
      return;
    }

    userLogin({ userName, password })
      .then(() =>
        navigate("/store")
      )
      .catch((error) => {
        if (error.message === "unknown user") {
          navigate("/register");
        }
      });
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
          {"כניסת משתמש"}

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={styles.loginWrapper}>
              <br></br><br></br>
              <TextField onBlur={(e) => setUserName(e.target.value)} id="outlined-basic" label="User name" variant="outlined" /><br></br><br></br>
              <TextField onBlur={(e) => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" type="password" /><br></br><br></br>
              <img src={'./l.png'} style={{ heignt: "70px", width: "70px", fontFamily: "initial" }}></img>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={login()}>Login</Button>
          <Button onClick={() => navigate('/register')}>register</Button>

        </DialogActions>
      </Dialog>

    </>
  );

};

export default Login;
