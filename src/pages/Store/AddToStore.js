import { useState } from "react";
import Button from '@mui/material/Button';
import swal from 'sweetalert';

import Store from "./Store";
import { useNavigate } from 'react-router-dom';
import styles from "./AddToStore.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import services from '../../services'


const AddToStore = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setescription] = useState();
    const [image, setImage] = useState("");
    const navigate = useNavigate()

    function Add() {
        services.AddApi(name, price, description, image)
        swal("The product added!", "!!!!", "success");
    }
    return (
        <div className={`floating-window ${isOpen ? 'open' : ''}`}>
            <TextField onBlur={(e) => setName(e.target.value)} id="outlined-basic" label="name" variant="outlined" /><br></br><br></br>
            <TextField onBlur={(e) => setPrice(e.target.value)} id="outlined-basic" label="price" variant="outlined" /><br></br><br></br>
            <TextField onBlur={(e) => setescription(e.target.value)} id="outlined-basic" label="description" variant="outlined" /><br></br><br></br>
            <TextField onBlur={(e) => setImage(e.target.value)} id="outlined-basic" label="image" variant="outlined" /><br></br><br></br>

            <Button onClick={() => Add()} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
            {/* <button onClick={() => Add(name, price, description, image)}>save and add</button> */}
            {/* <button onClick={() => navigate(`/maneger`)}>cancle</button> */}
        </div>
    )
}
export default AddToStore;