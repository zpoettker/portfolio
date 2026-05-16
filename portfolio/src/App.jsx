import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#161616' }}>
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
      </main>
    </div>
  )
}

export default App