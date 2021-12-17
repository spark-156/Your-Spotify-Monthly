import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from './components/Container'
import { TitleDiv } from './components/TitleDiv'
import { Dashboard } from './Views/Dashboard'
import { Home } from './Views/Home'

function App () {
  return <Container maxWidth='100%'>
    <TitleDiv>your spotify monthly</TitleDiv>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  </Container>
}

export default App
