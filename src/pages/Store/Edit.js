import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import services from '../../services'
import swal from 'sweetalert';
import Button from '@mui/material/Button';

const Edit = (prod) => {
    const data = useLocation()
    const a = data.state;

    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setescription] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (a !== "new")
            setName(prod.prop?.name)
        setPrice(prod.prop?.price)
        setescription(prod.prop?.description)
        setImage(prod.prop?.image)
    }, [])

    const update = () => {
        try {

            services.updateApi(prod.prop, name, price, description, image)
            swal("Good job!", "The product updated!", "success");
            navigate(`/maneger`)

        } catch {

        }
    }
    function Add() {
        services.AddApi(name, price, description, image)
        swal("The product added!", "!!!!", "success");
        navigate(`/maneger`)
    }
    return (
        <div>
            <input onChange={(e) => setName(e.target.value)} placeholder={name} ></input><br></br><br></br>
            <input onChange={(e) => setPrice(e.target.value)} placeholder={price}></input><br></br><br></br>
            <input onChange={(e) => setescription(e.target.value)} placeholder={description}></input><br></br><br></br>
            <input onChange={(e) => setImage(e.target.value)} placeholder={image}></input><br></br><br></br>
            {/* <img src={prod.prop.image} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img> */}
            <br></br>
            <br></br>
            {/* <Button onClick={() => a=="new"?Add():update()}>save</Button> */}
            <Button onClick={() => Add()}>add</Button>
            <Button onClick={() => update()}>up</Button>

        </div>
    )
}
export default Edit;