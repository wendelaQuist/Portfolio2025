import './App.css';
import Header from './Components/Scripts/header.js'
import Hero from './Components/Scripts/Hero.js'

function App() {

  return (
    <main className="relative h-screen w-screen box-border">
      <div className="m-0 p-0">
        <Header />
        <Hero />
      </div>
    </main>
  );
}

export default App;
