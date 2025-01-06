import './App.css';
import Header from './Components/Images/header.js'
import bg from "./Components/Images/apple-splash.png"

function App() {

  const hero ={
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }

  const link ={

  }

  return (
    <main className="h-screen w-screen" style={hero}>
      <div className="m-8">
      <Header></Header>
      </div>
    </main>
  );
}

export default App;
