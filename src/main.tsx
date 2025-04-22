
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource/roboto"; 
import "@fontsource/inter"; 
import "@fontsource/condiment"
import { AuthProvider } from './components/context/AuthContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>,
)
