import { strategems } from "./strategems";
import { useState, useRef } from "react";

function App() {

  const [rando, setRando] = useState([]);
  const [strategemNumber, setStrategemNumber] = useState(4);
  const [disableStrategem, setDisableStrategem] = useState([]);

  // let strategemNumber = useRef(4);
  // let onlyOneBackpack = useRef(true);
  // let onlyOneSupportWeapon = useRef(true); 
  const [onlyOneBackpack, setOnlyOneBackpack] = useState(false);
  const [onlyOneSupportWeapon, setOnlyOneSupportWeapon] = useState(false);

  let strategem_copy = [...strategems];

  const randomizer = () => {
    if (disableStrategem !== null) {
      strategem_copy = strategems.filter(stratagem => !disableStrategem.includes(stratagem.name));
    }
    console.log("------------------")
    for (let i = 0 ; i < 4 ; i++) {
      
      let array_length = strategem_copy.length - 1;
      let random = Math.floor(Math.random() * (array_length + 1));
      let temp = strategem_copy[i];
      let x = 4;
      strategem_copy[i] = strategem_copy[random];
      strategem_copy[random] = temp;

      if (onlyOneBackpack === true && i > 0) {
        for (let x = i-1 ; x >= 0 ; x--) {
          // console.log("comparing " + strategem_copy[i].name + " against " + strategem_copy[x].name)
          
          while (strategem_copy[i].backpack === true && strategem_copy[x].backpack === true) {
            console.log("2 backpacks detected:", strategem_copy[x].name, "&", strategem_copy[i].name)
            
            
            random = Math.floor(Math.random() * (array_length + 1));
            temp = strategem_copy[i];
            strategem_copy[i] = strategem_copy[random];
            strategem_copy[random] = temp;
            
          }
        } 
      }
      if (onlyOneSupportWeapon === true && i > 0) {
        for (let x = i-1 ; x >= 0 ; x--) {
          while (strategem_copy[x].support_weapon === true && strategem_copy[i].support_weapon === true) {
              random = Math.floor(Math.random() * (array_length + 1));
              temp = strategem_copy[i];
              strategem_copy[i] = strategem_copy[random];
              strategem_copy[random] = temp;
          }
        } 
      }
      
      

      // if(onlyOneSupportWeapon === true){
      //   while (strategem_copy[i].support_weapon === true && strategem_copy[i+1].support_weapon === true){
      //     j = Math.floor(Math.random() * (array_length + 1));
      //     temp = strategem_copy[i];
      //     strategem_copy[i] = strategem_copy[j];
      //     strategem_copy[j] = temp;
      //   }
      // }
    }

    // for (let i = strategem_copy.length - 1; i > 0; i--) {
    //   let j = Math.floor(Math.random() * (i + 1));
    //   let temp = strategem_copy[i];
    //   strategem_copy[i] = strategem_copy[j];
    //   strategem_copy[j] = temp;
    //   setRando([...strategem_copy]);
    // }
    
    setRando([...strategem_copy.slice(0, strategemNumber)]);

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
      <main>
        <div className="wrapper">
          <section>
            <h2>Offensive</h2>
            <div className="offensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Offensive" ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Supply</h2>
            <div className="supply-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack !== true ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
              <hr/>
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack === true ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Defensive</h2>
            <div className="defensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Defensive" ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} alt={strategem.name} key={strategem.name} onClick={() => {disableEnable(strategem.name)}}
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
                <input type="radio" name="strategem-number" value="3" onClick={() => setStrategemNumber(3)}/>
                <label>3</label>
                <br/> 
                <input type="radio" name="strategem-number" value="4" onClick={() => setStrategemNumber(4)}/>
                <label>4</label>
            </fieldset>

            <fieldset>
              <legend>Disable/Enable all Stratagems</legend>
                <button onClick={() => {setDisableStrategem([])}}>Enable All</button>
                <button disabled onClick={() => {setDisableStrategem([])}}>Disable All</button>
            </fieldset>

            <fieldset>
              <legend>Options</legend>
              <input type="checkbox" value="backpack"  onClick={() => setOnlyOneBackpack(!onlyOneBackpack)} />
              <label>Only 1 Backpack</label>
              <br/>
              <input type="checkbox" value="support-weapon"  onClick={() => setOnlyOneSupportWeapon(!onlyOneSupportWeapon)} />
              <label>Only 1 Support Weapon</label>
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
              rando.map((strategem) => (
                <>
                  {/* <p>Support Weapon: {String(onlyOneSupportWeapon.current)}</p>
                  <p>Backpack: {String(onlyOneBackpack.current)}</p> */}
                  <img src={process.env.PUBLIC_URL + strategem.icon} alt={strategem.name} key={strategem.name} />
                </>
              ))
              :
              null
            }
          </div>
        </div>

        
      </main>
  );
}

export default App;
