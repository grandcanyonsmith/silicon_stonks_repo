import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { loadStripe } from '@stripe/stripe-js';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51HimeLBDP0NXXJ55QNgYgxGu9aWmwLIoOQBxjNQVrmBGeFWm4rhLs0ZIPCTJvTIi2pI2rkasyP2x167hYbgRILr000QYsnR0NU');


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    header: {
        color: 'black'
    },
    container: {
        
    },
    profile: {
        backgroundColor: 'white',
        margin: ' 200px',
        padding: '100px'
    },
    button: {
        backgroundColor: '#3CEC97'
    }
  }));

function Profile() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        first: '',
        last: '',
        phone: '',
        email: '',
        subscribed: '',
        stripeCustomerId: '',
        manageUrl: ''
    });

    useEffect(() => {
        function onLoad() {
            const token = localStorage.getItem('token');
            axios.get('/api/users/profile', {headers: { 'Authorization': token}})
            .then(res => {
                const {first, last, phone, email, stripeCustomerId, subscribed, manageUrl} = res.data.user;
                setLoading(false)
                setUser({
                    first,
                    last,
                    phone,
                    email,
                    stripeCustomerId,
                    subscribed,
                    manageUrl
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [])

      const toggleLoading = () => {
          setLoading(!loading)
      }

      const handleClick = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;
        const token = localStorage.getItem('token')
    
        // Call your backend to create the Checkout Session
        const response = await fetch('/api/stripe/create-checkout-session', { method: 'POST', headers: {
            'Authorization': token
        } });
    
        const session = await response.json();
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      };

    if (loading) {
        return (
            <div className={classes.container}>
                <div className={classes.profile}>
                    <LinearProgress />
                </div>
            </div>
        )
    }
    return (
        <div className={classes.container}>
            <div className={classes.profile}>
                <h1 className={classes.header}>
                    First Name - {user.first}
                </h1>
                <h1 className={classes.header}>
                    Last Name - {user.last}
                </h1>
                <h1 className={classes.header}>
                    Phone Number - {user.phone}
                </h1>
                <h1 className={classes.header}>
                    Email - {user.email}
                </h1>
                {user.subscribed ? 
                    <Button href={user.manageUrl} className={classes.button}>Manage Subscription</Button> : 
                    <Button className={classes.button} role='link' onClick={handleClick}>Subscribe Now</Button>
                }
            </div>
        </div>
    )
}

export default Profile;