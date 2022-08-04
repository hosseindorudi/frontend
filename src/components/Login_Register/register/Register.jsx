import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
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
import axios from 'axios'

const Register = ({registerModal,setRegisterModal ,setLoginModal, setAlertOpen, setAlertType, setAlertTitle}) => {
  const [showPass, setShowPass] = useState(false);
  const [passVal, setPassVal] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [confirmpassVal, setConfirmPassVal] = useState("");
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
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
      m:1,
      width:"50%",
    },
    [theme.breakpoints.up('laptop')]: {
      m:1,

      width:"70%",
    },
    [theme.breakpoints.up('mobile')]: {
      m:1,

      width:"90%",
    },
  }

  
  const containerStyle = {
    [theme.breakpoints.up('desktop')]: {
      m:0.5,
      width: "100%",
      display:"flex",
      alignItems:"center",
      flexDirection: 'row'
    },
    [theme.breakpoints.between('laptop', 'desktop')]: {
        m:0.5,
        width: "100%",
        display:"flex",
      alignItems:"center",
      flexDirection:"column"
    },
    [theme.breakpoints.between('mobile','laptop')]: {
        m:0.5,
        width: "100%",
        display:"flex",
      alignItems:"center",
      flexDirection:"column"
    },
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(passVal !== confirmpassVal){
        
        setAlertTitle("رمز و تاییدیه رمز باید یکی باشند")
        setAlertType("error")
        setAlertOpen(true) 
    }
    else {
      let res
      try {
        setLoading(true)
         res = await axios.post('api/auth/register', {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: passVal,
        })
        console.log(res.data)
        if(res.status === 200){
          setAlertTitle(res.data)
          setAlertType("success")
          setAlertOpen(true)
          setRegisterModal(false)
          setLoginModal(true)
        }
      } catch (error) {
        if (error.response.status === 409) {
          console.log(error.response.data)
          setAlertTitle(error.response.data)
          setAlertType("error")
          setAlertOpen(true) 
        }
        setAlertTitle(error.response.data)
        setAlertType("error")
        setAlertOpen(true) 
  
      } finally{
        setLoading(false)
      }
    }

    
    
 
    

  }


  

  return (
    <Modal
      open={registerModal}
      onClose={() => setRegisterModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Container sx={style}>
        <FormGroup>
          <Stack >

            <Stack
              sx={containerStyle}
              container
            >
              
                <TextField
                  sx={textStyle}
                  id="email-basic"
                  label="ایمیل"
                  variant="outlined"
                  value={email}
                  
                  onChange={(e)=> setEmail(e.target.value)}
                />
            
                <TextField
                  sx={textStyle}
                  id="phoneNumber-basic"
                  label="شماره تماس"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                />
          
            </Stack>
            <Stack
              sx={containerStyle}
              container
            >
              
                <TextField
                  sx={textStyle}
                  id="firstName-basic"
                  label="نام"
                  variant="outlined"
                  value={firstName}
                  onChange={(e)=> setFirstName(e.target.value)}
                />
            
                <TextField
                  sx={textStyle}
                  id="lastName-basic"
                  label="نام خانوادگی"
                  variant="outlined"
                  value={lastName}
                  onChange={(e)=> setLastName(e.target.value)}
                />
          
            </Stack>
            <Stack
              sx={containerStyle}
              container
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
              <FormControl sx={textStyle} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  تایید رمز
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmpassVal}
                  onChange={(e) => setConfirmPassVal(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPass(!confirmpassVal)}
                        edge="end"
                      >
                        {confirmpassVal ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="تایید رمز"
                />
              </FormControl>
            </Stack>
            <Stack sx={{ m: 1 }}  alignItems="center" width="100%">
              <Button  variant="outlined" size="medium" sx={textStyle} onClick={(e) => handleSubmit(e)} disabled={loading}>
                ثبت اکانت
              </Button>
            </Stack>
          </Stack>
        </FormGroup>
      </Container>
    </Modal>
  );
}

export default Register