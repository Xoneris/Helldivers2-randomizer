import { strategems } from "./strategems";
import { useState, useRef } from "react";


function App() {

  const [rando, setRando] = useState(null);
  const [strategemNumber, setStrategemNumber] = useState(4);
  const [disableStrategem, setDisableStrategem] = useState([]);

  let onlyOneBackpack = useRef(false);
  let onlyOneSupportWeapon = useRef(false); 

  let strategem_copy = [...strategems];

  const randomizer = () => {
    if (disableStrategem !== null) {
      strategem_copy = strategems.filter(stratagem => !disableStrategem.includes(stratagem.name));
    }
    

    for (let i = strategem_copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = strategem_copy[i];
      strategem_copy[i] = strategem_copy[j];
      strategem_copy[j] = temp;
      setRando([...strategem_copy]);
    }
  }

  // const disableEnable = (strategem) => {
  //   if (disableStrategem.includes(strategem.name)) {
  //     const index = disableStrategem.indexOf(strategem.name);
  //     setDisableStrategem(disableStrategem.filter(strats => strats.name !== strategem.name))
  //   } else {
  //     setDisableStrategem([...disableStrategem, strategem])
  //   }
  // }
  const disableEnable = (strategemName) => {
    if (disableStrategem.includes(strategemName)) {
      const index = disableStrategem.indexOf(strategemName);
      setDisableStrategem(disableStrategem.filter(strats => strats !== strategemName))
    } else {
      setDisableStrategem([...disableStrategem, strategemName])
    }
  }

  return (
    <body>
      <main>
        <div className="wrapper">
          <section>
            <h2>Offensive</h2>
            <div className="offensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Offensive" ) .map(strategem => (
                  <div>
                    <img src={strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Supply</h2>
            <div className="supply-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack !== true ) .map(strategem => (
                  <div>
                    <img src={strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
              <hr/>
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack === true ) .map(strategem => (
                  <div>
                    <img src={strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Defensive</h2>
            <div className="defensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Defensive" ) .map(strategem => (
                  <div>
                    <img src={strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
          </section>
          <div>
            <h2>Options</h2>
            <fieldset>
              <legend>Available Strategems</legend>
                <input type="radio" name="strategem-number" value="3" onClick={() => {setStrategemNumber(3)}}/>
                <label>3</label>
                <br/> 
                <input type="radio" name="strategem-number" value="4" onClick={() => {setStrategemNumber(4)}}/>
                <label>4</label>
            </fieldset>
            <fieldset>
              <legend>Disable/Enable all Stratagems</legend>
                <button onClick={() => {setDisableStrategem([])}}>Enable All</button>
                <button onClick={() => {setDisableStrategem([])}}>Disable All</button>
            </fieldset>
            <fieldset>
              <legend>Options</legend>
              <input type="checkbox" value="backpack" ref={onlyOneBackpack} onClick={() => onlyOneBackpack.current = !onlyOneBackpack.current} />
              <label>Only 1 Backpack - {onlyOneBackpack.current === true ? "true" : "false"}</label>
              <br/>
              <input type="checkbox" value="support-weapon" ref={onlyOneSupportWeapon} onClick={() => onlyOneSupportWeapon.current = !onlyOneSupportWeapon.current} />
              <label>Only 1 Support Weapon - {onlyOneSupportWeapon.current  === true ? "true" : "false"}</label>
            </fieldset>
          </div>
        </div>
        
        <div>
          <button onClick={randomizer}>Randomize</button>
          <hr/>

          <div>
            {
              rando !== null ? 
              // rando.map(strategem => (
              //   <img src={strategem.icon} alt={strategem.name} key={strategem.name} />
              // )):
              rando.slice(0,strategemNumber).map((strategem) => (
                <>
                  {/* <p>Support Weapon: {String(onlyOneSupportWeapon.current)}</p>
                  <p>Backpack: {String(onlyOneBackpack.current)}</p> */}
                  <img src={strategem.icon} alt={strategem.name} />
                </>
              )):
              null
            }

          </div>
        </div>

        
      </main>
    </body>
  );
}

export default App;
