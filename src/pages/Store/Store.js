import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from "./Store.css";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Badge from '@mui/material/Badge'
//import { AddShoppingCart } from "@material-ui/icons";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { Input } from '@mui/material';
import { Gif } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { DeleteFromCart } from '../../services';
import { addToCart, getAllCartApi } from '../../services';
import swal from 'sweetalert';
import Grid from '@mui/material/Grid';
import services from '../../services'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const Store = () => {
    const theme = useTheme();
    const [product, setProduct] = useState();
    const [productcart, setProductcart] = useState();
    const [categorya, setCategorya] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate()

    const handleChange = (event) => {
        setCategorya(event.target.value);
    };


    async function getAllProduct() {
        try{
            const result = await services.getAllProductApi()
            await setProduct(result)
        }
        catch{}
      }
    getAllProduct();


    const getAllCart = async () => {
        try {
            const result = await getAllCartApi()
            await setProductcart(result)
        } catch {

        }
    }

    getAllCart();


    const deleteCart = () => {
        productcart.map(prod => {
            DeleteFromCart(prod._id)
        })
    }

    const getTotalItems = (items) => {
        return items.reduce((acc, item) => acc + item.amount, 0);
    };
    const getTotalItems2 = (items) => {
        return items.reduce((acc, item) => acc + item.productId.price * item.amount, 0);
    };

    return (
        <>
            {productcart &&
                <div>
                    <div style={{
                        backgroundImage: 'url("./רקע6.png")', height: '200px',
                        width: '1120px',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    <div className="fixed-top">
                        <Button onClick={() => navigate('/cart')}>
                            <Badge badgeContent={getTotalItems(productcart)} color="error">
                                <AddShoppingCart />
                            </Badge>
                        </Button>
                    </div>

                    <Button onClick={() => navigate('/maneger')} className='maneger'>Maneger</Button>

                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <br></br>
                            <br></br>
                            {product && product.map(prod => {
                                if (search != "")
                                    return prod.name.includes(search) && <div key={prod._id} className={`store`} >
                                        <Card sx={{
                                            maxWidth: 345,
                                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                            height: 400, width: 300
                                        }}>
                                            <CardMedia
                                                sx={{ height: 200 }}
                                                image={prod.image}
                                            />
                                            <CardContent>
                                                <Typography  gutterBottom variant="h5" component="div">
                                                    {prod.name} - {prod.price} ש"ח
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {prod.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={() => addToCart(prod)} size="small">הוסף לסל
                                                    <IconButton color="primary" aria-label="add to shopping cart">
                                                        <AddShoppingCartIcon />
                                                    </IconButton>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                        <br></br>
                                    </div>

                                else if (categorya != "")
                                    return prod.category?.includes(categorya) && <div key={prod._id} className={`store`} >
                                        <Card sx={{
                                            maxWidth: 345,
                                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                            height: 400, width: 300
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
                                                <Button onClick={() => addToCart(prod)} size="small">הוסף לסל
                                                    <IconButton color="primary" aria-label="add to shopping cart">
                                                        <AddShoppingCartIcon />
                                                    </IconButton>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                        <br></br>
                                    </div>
                                else
                                    return <div key={prod._id} className={`store`} >
                                        <Card sx={{
                                            maxWidth: 345,
                                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                            height: 400, width: 300
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

                                                <Button onClick={() => addToCart(prod)} size="small">הוסף לסל
                                                    <IconButton color="primary" aria-label="add to shopping cart">
                                                        <AddShoppingCartIcon />
                                                    </IconButton>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                        <br></br>
                                    </div>



                            })}

                        </Grid>
                        <Grid item xs={2}>
                            <div className='search' >
                                <div className='s' style={{ backgroundColor: "white" }}>
                                    {/* <TextField onChange={(e) => setCategorya(e.target.value)} label="חיפוש לפי קטגוריה" color="secondary" focused /> */}
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel >חיפוש לפי קטגוריה</InputLabel>
                                            <Select
                                                value={categorya}
                                                label="חיפוש לפי קטגוריה"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="תוספות">תוספות</MenuItem>
                                                <MenuItem value="תבשילי בשר ודגים">תבשילי בשר ודגים</MenuItem>
                                                <MenuItem value="סלטים">סלטים</MenuItem>
                                                <MenuItem value="מרקים">מרקים</MenuItem>
                                                <MenuItem value="">הכל</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <br></br><br></br>
                                    <TextField onChange={(e) => setSearch(e.target.value)} label="חיפוש לפי שם מוצר" color="secondary" focused />
                                </div>
                                <br></br><br></br>
                                <h1>סיכום הזמנה</h1>
                                {productcart.length == 0 ? <h2>No item in cart</h2> :
                                    productcart && productcart.map(prod => {
                                        return prod.amount == 0 ? DeleteFromCart(prod._id) : <div >
                                            <h3>{prod.productId.name}   -  {prod.productId.price * prod.amount} ש"ח  </h3>

                                            <div style={{ display: "flex" }}>
                                                <IconButton onClick={() => DeleteFromCart(prod._id)} aria-label="delete" color="primary">
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={() => services.addProdCartApi(prod._id)} aria-label="delete" color="black">
                                                    <ControlPointIcon />
                                                </IconButton>
                                                <h1> {prod.amount}  </h1>
                                                <IconButton onClick={() => services.downProdCartApi(prod._id)} aria-label="delete" color="black">
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                            </div>

                                            <br></br>
                                            -----------------------------------------
                                            <br></br>
                                        </div>
                                    })}
                                <h1>סה"כ: {getTotalItems2(productcart)} ש"ח</h1>
                                <Button onClick={() => deleteCart()}>אתחול הזמנה</Button>


                            </div>
                        </Grid>
                    </Grid></div>}
        </>
    )
}
export default Store;