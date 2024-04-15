import { strategems } from "./strategems";
import { useState } from "react";


function App() {

  const [rando, setRando] = useState(null);

  const randomizer = () => {
    let strategem_copy = [...strategems];
    for (let i = strategem_copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = strategem_copy[i];
      strategem_copy[i] = strategem_copy[j];
      strategem_copy[j] = temp;
      setRando([...strategem_copy]);
    }
  }



  return (
    <body>
      <main>
        <h2>Offensive</h2>
        <div className="offensive-strategems-comtainer">
          {strategems.filter((strategem) => strategem.category === "Offensive" ) .map(strategem => (
              <div>
                <img src={strategem.icon} alt={strategem.name} />
              </div>
          ))}
        </div>
        <h2>Supply</h2>
        <div className="supply-strategems-comtainer">
          {strategems.filter((strategem) => strategem.category === "Supply" ) .map(strategem => (
              <div>
                <img src={strategem.icon} alt={strategem.name} />
              </div>
          ))}
        </div>
        <h2>Defensive</h2>
        <div className="defensive-strategems-comtainer">
          {strategems.filter((strategem) => strategem.category === "Defensive" ) .map(strategem => (
              <div>
                <img src={strategem.icon} alt={strategem.name} />
              </div>
          ))}
        </div>

        <button onClick={randomizer}>Randomize</button>
        <hr/>

        <div>
          {
            rando !== null ? 
            // rando.map(strategem => (
            //   <img src={strategem.icon} alt={strategem.name} key={strategem.name} />
            // )):
            rando.slice(0,4).map((strategem) => (
              <img src={strategem.icon} alt={strategem.name} />
              // <span>{strategem.name}</span>
            )):
            null
          }

        </div>
      </main>
    </body>
  );
}

export default App;
