import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/settings" element={<Settings />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
