import React, { useState } from 'react'
import { useLenis } from './hooks/useLenis'

import CustomCursor from './components/layout/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import BackgroundEffects from './components/effects/BackgroundEffects'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Stats from './components/sections/Stats'
import Testimonials from './components/sections/Testimonials'
import Process from './components/sections/Process'
import Technologies from './components/sections/Technologies'
import Contact from './components/sections/Contact'

function App() {
  useLenis()
  const [loading, setLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <BackgroundEffects />
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Services />
            <Portfolio />
            <Stats />
            <Testimonials />
            <Process />
            <Technologies />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
