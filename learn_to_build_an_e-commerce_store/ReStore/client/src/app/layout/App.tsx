import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { getBasketAsync } from "../../features/basket/basketSlice";
import { getCurrentUser } from "../../features/account/accountSlice";

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
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
