import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#161616' }}>
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <About />
        <Resume />
      </main>
    </div>
  )
}

export default App