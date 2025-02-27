import './App.css';
import Nav from './Components/Scripts/Navbar.js'
import Hero from './Components/Scripts/Hero.js'
import About from './Components/Scripts/About.js'
import Projects from './Components/Scripts/Projects.js'

function App() {

  return (
    <main className="relative h-screen w-screen box-border">
      <div className="m-0 p-0">
        <Nav />
        <Hero />
      </div>
      <About  />
      <Projects />
    </main>
  );
}

export default App;
