import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { noauthinstance } from '../utils/api';





const defaultTheme = createTheme();

export default function Login() {

    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate('/Dashboard');
        }
    }, [isLoggedIn, navigate]);

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [userToken, setUserToken] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formdata = {
            email,
            password,
        };

        try {
            const response = await noauthinstance.post("user/login/", formdata);
            console.log({ response })

            if (response.data && response.data.access) {
                const NewaccessToken = response.data.access;
                const userRole = response.data.roles;
                localStorage.setItem('NewaccessToken', NewaccessToken);
                console.log(NewaccessToken)

               
                localStorage.setItem('userRole', userRole);
                if (userRole === 'agent') {
                
                    toast.info("Please log in using the mobile app.");
                } else {
                   
                    toast.success("User logged in successfully!");
                    navigate("/Dashboard/home", { state: { userRole } });
                }
            }

        } catch (error) {
            // Handle errors here
            if (error.response) {
                console.error("Server error:", error.response.data);
                if (error.response.status === 400 && error.response.data.non_field_errors) {
                    toast.error("Incorrect credentials. Please check your email and password.");
                } else {
                    toast.error("An error occurred while logging in.");
                }
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Request setup error:", error.message);
            }
        }
    };
   

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}