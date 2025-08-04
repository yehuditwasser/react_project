import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import styles from "./Cart.css";
import { DeleteFromCart } from "../../services";
import services from '../../services'

const Cart = () => {
    const [cart, setCart] = useState([])

    const getAllCart = async ()=> {
        try{
        const result = await services.getAllCartApi()
        await setCart(result)
        }catch{}
    }

    useEffect(() => {
        getAllCart()
    })

    const getTotalItems = (items) => {
        return items.reduce((acc, item) => acc + item.productId.price * item.amount, 0);
    };

    const deleteCart = () => {
        cart.map(prod => {
            DeleteFromCart(prod._id)
        })
    }

    
    return (<>
        <h1>My cart:</h1>

        {cart.length == 0 ? <h2>No item in cart</h2> :
            cart && cart.map(prod => {
                return prod.amount == 0? DeleteFromCart(prod._id):  <div className={`cart`}>
                    
                    <Card sx={{
                        maxWidth: 345,
                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        height: 400, width: 400
                    }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={prod.productId.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {prod.productId.name} - {prod.productId.price * prod.amount} ש"ח
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {prod.productId.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            
                            <IconButton onClick={() => services.addProdCartApi(prod._id)} aria-label="delete" color="black">
                                <ControlPointIcon />
                            </IconButton>
                            <h1> {prod.amount}  </h1>
                            <IconButton onClick={()=>services.downProdCartApi(prod._id)}  aria-label="delete" color="black">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Button onClick={() => DeleteFromCart(prod._id)} size="small"> delete from cart
                            </Button>
                        </CardActions>
                    </Card>
                    <br></br>
                </div>

            })}
        <h1>Total: {getTotalItems(cart)} ש"ח</h1>
        <Button onClick={() => deleteCart()}>אתחול הזמנה</Button>
    </>
    )
}

export default Cart;


