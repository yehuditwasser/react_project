import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Navigate, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import styles from "./Maneger.css";
import swal from 'sweetalert';
import AddToStore from './AddToStore';
import services from '../../services'
import Edit from './Edit';

const Store = () => {
    const theme = useTheme();
    const [props, setProps] = useState();
    const [product, setProduct] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClickOpen = (prod) => {
        setProps(prod)

        setOpen(true);
    };
    const handleClose = () => {

        setOpen(false);
    };

    const handleClickOpen2 = (prod) => {
        setProps(prod)
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const navigate = useNavigate()


    const deleteProd = (_id) => {
        try {
            services.deleteProdApi(_id)
            const updatedProduct = product.filter((prod) => prod._id !== _id);
            setProduct(updatedProduct);
        } catch {

        }
    }

    const getAllProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:7002/api/prod`)
            let tempList = await res.data;
            setProduct(tempList);
        } catch (error) { console.log(error); }
    }


    getAllProduct();


    const dp = (_id) => {
        swal({
            title: "?האם אתה בטוח שברצונך למחוק פריט זה",
            text: "!!לאחר המחיקה, לא תוכל לשחזר את פריט זה",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteProd(_id)
                    swal("!!המוצר נמחק בהצלחה", {
                        icon: "success",
                    });
                }
            });
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Button onClick={handleClose}>✖️</Button>
                    {"הוספת מוצר"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Edit prop={props} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Button onClick={handleClose2}>✖️</Button>
                    {"עדכון מוצר"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Edit prop={props} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>



            <h1>page of maneger!!</h1>
            <br></br>
            <br></br>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    {product && product.map(prod => {


                        return <div key={prod._id} className='maneger'>
                            <Card sx={{
                                maxWidth: 345,
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                height: 400, width: 400
                            }}>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={prod.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {prod.name} - {prod.price} ש"ח
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {prod.description}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleClickOpen2(prod)} size="small">ערוך
                                        <IconButton color="primary" aria-label="add to shopping cart">
                                            <ModeEditOutlineIcon />
                                        </IconButton>
                                    </Button>
                                    <Button onClick={() => dp(prod._id)} size="small">מחק
                                        <IconButton aria-label="delete" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Button>
                                </CardActions>
                            </Card>
                            <br></br>
                        </div>


                    })}
                </Grid>
                <Grid item xs={2}>
                    <div className='s'>
                        <Button onClick={() => handleClickOpen("new")} variant="outlined" size="medium">
                            הוסף מוצר חדש לרשימה
                        </Button>
                        <br></br>
                        <br></br>
                        <Button onClick={() => navigate(`/store`)} variant="outlined" size="medium">חזרה לחנות</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
export default Store;