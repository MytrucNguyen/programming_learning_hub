import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RegisterType } from '../../app/models/user';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, isValid, errors } } = useForm({
        mode: 'onChange',
    });

    function handleApiErrors(errors: string[]) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
            >
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(data => {
                    const registerData: RegisterType = {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    };

                    agent.Account.register(registerData)
                        .then(() => {
                            toast.success("Registration successful - you can now login");
                            navigate('/login');
                        })
                        .catch(error => handleApiErrors(error));
                })}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <TextField
                        error={!!errors.username}
                        helperText={typeof errors?.username?.message === 'string' ? errors.username.message : ''}
                        id="username"
                        type="username"
                        placeholder="Username"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        {...register('username', { required: 'Username is required' })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={!!errors.email}
                        helperText={typeof errors?.email?.message === 'string' ? errors.email.message : ''}
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                        fullWidth
                        variant="outlined"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Not a valid email address'
                            }
                        })}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        error={!!errors.password}
                        helperText={typeof errors?.password?.message === 'string' ? errors.password.message : ''}
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        variant="outlined"
                        {...register('password', {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/,
                                message: 'Password must contain at least one number and one letter, and be at least 6 characters long'
                            }
                        })}
                    />
                </FormControl>

                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Register in
                </LoadingButton>
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                    href="/login"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                >
                    Login
                </Link>
            </Typography>
        </Card >
    );
}
