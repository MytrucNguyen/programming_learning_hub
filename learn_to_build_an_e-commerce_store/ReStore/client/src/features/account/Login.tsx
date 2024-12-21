import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import agent from '../../app/api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

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

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { isSubmitting, isValid, errors } } = useForm({
        mode: 'onSubmit',
    });

    async function submitForm(data: FieldValues) {
        await dispatch(signInUser(data));
        navigate('/catalog');
    }

    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
            >
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(submitForm)}
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        error={!!errors.password}
                        helperText={typeof errors?.password?.message === 'string' ? errors.password.message : ''}
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        {...register('password', { required: "Password is required" })}
                    />
                </FormControl>
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                // onClick={validateInputs}
                >
                    Sign in
                </LoadingButton>
            </Box>
            <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link
                    href="/register"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                >
                    Sign up
                </Link>
            </Typography>
        </Card>
    );
}
