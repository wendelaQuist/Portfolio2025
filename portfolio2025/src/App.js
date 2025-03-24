import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Scripts/Navbar.js'
import Hero from './Components/Scripts/Hero.js'
import About from './Components/Scripts/About.js'
import Projects from './Components/Scripts/Projects.js'
import ProjectPage from './Components/Scripts/ProjectPage.js'
import Footer from './Components/Scripts/Footer.js'

function App() {

  return (
    <Router>
      <main className="relative h-screen w-screen box-border">

        <Nav />
        <Routes>
          <Route path="/" element={
            <>
            <div id="home"><Hero /></div>
            <div id="about"><About /></div>
            <div id="projects"><Projects /></div>
            </>
          } 
          />
          <Route  path="/ProjectPage" element={<ProjectPage />}/>
        </Routes>

      <Footer />
    </main>
    </Router>
  );
}

export default App;
