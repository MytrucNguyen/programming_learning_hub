import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { getBasketAsync } from "../../features/basket/basketSlice";
import { getCurrentUser } from "../../features/account/accountSlice";
import NavBar from "./NavBar";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUser());
      await dispatch(getBasketAsync());
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if (loading) {
    return <LoadingComponent message="Initialising App..." />
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Box sx={{
        minHeight: '100vh',
        background: darkMode ?
          'radial-gradient(circle, #1e3aba, #111b27)'
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
        py: 6
      }}
      >
        <Container maxWidth='xl'>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider >
  )
}

export default App
