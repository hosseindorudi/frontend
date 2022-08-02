import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Container } from '@mui/material';
import { createTheme } from "@mui/system";
import axios from "axios";
const Login = ({ loginModal, setLoginModal }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passVal, setPassVal] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });


  const style = {

    [theme.breakpoints.up('desktop')]: {
      position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"50%",
    borderRadius:5 ,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 10,
    pb:10,
    alignItems: "center",
    },
    [theme.breakpoints.up('laptop')]: {
      position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"60%",
    borderRadius:5 ,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 10,
    pb:10,
    alignItems: "center",
    },
    [theme.breakpoints.up('mobile')]: {
      position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"90%",
    borderRadius:5 ,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 10,
    pb:10,
    alignItems: "center",
    },
 
  };

  const textStyle = {
    [theme.breakpoints.up('desktop')]: {

      width:"50%",
    },
    [theme.breakpoints.up('laptop')]: {

      width:"70%",
    },
    [theme.breakpoints.up('mobile')]: {

      width:"90%",
    },
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    let res
    !isCheck ? 
     res = await axios.post('auth/login', {
      email: email,
      password: passVal,
    })
    : 
    res = await axios.post('auth/login', {
      phoneNumber: phoneNumber,
      password: passVal,
    })

    console.log(res)
  }

  

  return (
    <Modal
      open={loginModal}
      onClose={() => setLoginModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <FormGroup>
          <Stack spacing={2}>
            <Stack spacing={2} alignItems="center" >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={() => setIsCheck(!isCheck)}
                  />
                }
                label={!isCheck ? "ورود با ایمیل" : "ورود با شماره همراه"}
              />
            </Stack>

            <Stack
              sx={{ width: "100%" }}
              spacing={2}
              container
              alignItems="center"
            >
              {!isCheck ? (
                <TextField
                  sx={textStyle}
                  id="email-basic"
                  label="ایمیل"
                  variant="outlined"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
              ) : (
                <TextField
                  sx={textStyle}
                  id="phoneNumber-basic"
                  label="شماره تماس"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                />
              )}
            </Stack>
            <Stack
              spacing={2}
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <FormControl  sx={textStyle} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  رمز
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPass ? "text" : "password"}
                  value={passVal}
                  onChange={(e) => setPassVal(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(!showPass)}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="رمز"
                />
              </FormControl>
            </Stack>
            <Stack sx={{ m: 1 }}  alignItems="center" width="100%">
              <Button  variant="outlined" size="medium" sx={textStyle} onClick={(e) => handleSubmit(e)}>
                ورود
              </Button>
            </Stack>
          </Stack>
        </FormGroup>
      </Container>
    </Modal>
  );
};

export default Login;
