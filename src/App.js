import { strategems } from "./strategems";
import { primary_weapons, secondary_weapons, grenades } from "./weapons";
import { useState, useRef } from "react";

function App() {

  const [rando, setRando] = useState([]);
  const [strategemNumber, setStrategemNumber] = useState(4);
  const [disableStrategem, setDisableStrategem] = useState([]);

  const [primaryWeaponRando, setPrimaryWeaponRando] = useState([]);
  const [secondaryWeaponRando, setSecondaryWeaponRando] = useState([]);
  const [grenadeRando, setGrenadeRando] = useState([]);

  // let strategemNumber = useRef(4);
  // let onlyOneBackpack = useRef(true);
  // let onlyOneSupportWeapon = useRef(true); 
  const [onlyOneBackpack, setOnlyOneBackpack] = useState(false);
  const [onlyOneSupportWeapon, setOnlyOneSupportWeapon] = useState(false);
  const [isSuperCitizen, setIsSuperCitizen] = useState(true);

  const [removed, setRemoved] = useState([])

  const array_shuffle = (array, array_length) => {
    
    if (isSuperCitizen === false){
      array = array.filter((weapon) => weapon.name !== "MP-98 Knight");
    }

    let random = Math.floor(Math.random() * (array_length));
    let temp = array[0];
    array[0] = array[random];
    array[random] = temp;

    return array[0];
  }  

  const randomizer = () => {

    let strategem_copy = [...strategems];
    let primary_weapons_copy = [...primary_weapons];
    let secondary_weapons_copy = [...secondary_weapons];
    let grenades_copy = [...grenades];

    if (disableStrategem !== null) {
      strategem_copy = strategems.filter(stratagem => !disableStrategem.includes(stratagem.name));
    }

    for (let i = 0 ; i < 4 ; i++) {
      
      let array_length = strategem_copy.length - 1;
      let random
      let temp = strategem_copy[i];

      do {
        random = Math.floor(Math.random() * (array_length + 1));
      }
      while (random < i)

      strategem_copy[i] = strategem_copy[random];
      strategem_copy[random] = temp;

      if (onlyOneBackpack === true && onlyOneSupportWeapon === false && i > 0) {
        for (let x = i-1 ; x >= 0 ; x--) {
          while (strategem_copy[i].backpack === true && strategem_copy[x].backpack === true) {
             
            do {
              random = Math.floor(Math.random() * (array_length + 1));
            }
            while (random < i)
            
            temp = strategem_copy[i];
            strategem_copy[i] = strategem_copy[random];
            strategem_copy[random] = temp;
          }
        } 
      }

      if (onlyOneBackpack === false && onlyOneSupportWeapon=== true && i > 0) {
        for (let x = i-1 ; x >= 0 ; x--) {
          while (strategem_copy[i].support_weapon === true && strategem_copy[x].support_weapon === true) {
             
            do {
              random = Math.floor(Math.random() * (array_length + 1));
            }
            while (random < i)
            
            temp = strategem_copy[i];
            strategem_copy[i] = strategem_copy[random];
            strategem_copy[random] = temp;
          }
        } 
      }

      if (onlyOneSupportWeapon === true && onlyOneSupportWeapon === true && i > 0) {
        for (let x = i-1 ; x >= 0 ; x--) {
          while ((strategem_copy[i].backpack === true && strategem_copy[x].backpack === true) || (strategem_copy[i].support_weapon === true && strategem_copy[x].support_weapon === true)) {
             
            do {
              random = Math.floor(Math.random() * (array_length + 1));
            }
            while (random < i)
            
            temp = strategem_copy[i];
            strategem_copy[i] = strategem_copy[random];
            strategem_copy[random] = temp;
          }
        } 
      }
    }

    setPrimaryWeaponRando(array_shuffle(primary_weapons_copy, (primary_weapons_copy.length - 1)));
    setSecondaryWeaponRando(array_shuffle(secondary_weapons_copy, (secondary_weapons_copy.length - 1)));
    setGrenadeRando(array_shuffle(grenades_copy, (grenades_copy.length - 1)));
    setRando([...strategem_copy.slice(0, strategemNumber)]);
  }


  const newRando = () => {

    let strategem_copy = [...strategems];
    let rando_array = []

    let backpackRemoved = false
    let supportWeaponRemoved = false

    if (disableStrategem !== null) {
      strategem_copy = strategems.filter(stratagem => !disableStrategem.includes(stratagem.name));
    }

    for (let i = 0 ; i < 4 ; i++) {

      let array_length = strategem_copy.length - 1 ;
      let random = Math.floor(Math.random() * (array_length) + 1);
      rando_array.push(strategem_copy[random])

      if (backpackRemoved === false || supportWeaponRemoved === false){

        if (onlyOneBackpack === true && backpackRemoved === false && strategem_copy[random].backpack === true && onlyOneSupportWeapon === true && supportWeaponRemoved === false && strategem_copy[random].support_weapon === true) {
          strategem_copy = strategem_copy.filter(stratagem => stratagem.backpack !== true && stratagem.support_weapon !== true)
          backpackRemoved = true
          supportWeaponRemoved = true
        }
        else if (onlyOneBackpack === true && backpackRemoved === false && strategem_copy[random].backpack === true) {
          strategem_copy = strategem_copy.filter(stratagem => stratagem.backpack !== true)
          backpackRemoved = true
        }
        else if (onlyOneSupportWeapon === true && supportWeaponRemoved === false && strategem_copy[random].support_weapon === true) {
          strategem_copy = strategem_copy.filter(stratagem => stratagem.support_weapon !== true)
          supportWeaponRemoved = true
        }
        else {
          strategem_copy = strategem_copy.filter(stratagem => stratagem.name !== strategem_copy[random].name) 
        }
      } else {
        strategem_copy = strategem_copy.filter(stratagem => stratagem.name !== strategem_copy[random].name) 
      } 
      

      

      // if first round
      // randomly put one stratagem into rando array
      
      // Remove stratagem from copied array
      // if removed strategem is backpack or support weapon
      // If only 1 backpack/support is select also remove all those strategems from array. 
      
      // if >1 round
      // randomly select new stratagem
      // 

    }

    // console.log(rando_array)
    setRando([...rando_array])
  }

  const disableEnable = (strategemName) => {
    if (disableStrategem.includes(strategemName)) {
      setDisableStrategem(disableStrategem.filter(strats => strats !== strategemName))
    } else {
      setDisableStrategem([...disableStrategem, strategemName])
    }
  }

  const disableAll = () => {
    let temp_array = [];
    strategems.map(strategem => { temp_array = [...temp_array, strategem.name] })
    setDisableStrategem([temp_array])
  }

  return (
      <main>
        <div className="wrapper">
          <section>
            <h2>Offensive</h2>
            <div className="offensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Offensive" ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} 
                      alt={strategem.name} 
                      key={strategem.name} 
                      title={strategem.name}
                      onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Supply</h2>
            <div className="supply-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack !== true ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} 
                      alt={strategem.name} 
                      key={strategem.name} 
                      title={strategem.name}
                      onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
              <hr/>
              {strategems.filter((strategem) => strategem.category === "Supply" && strategem.backpack === true ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} 
                      alt={strategem.name} 
                      key={strategem.name} 
                      title={strategem.name}
                      onClick={() => {disableEnable(strategem.name)}}
                      className={disableStrategem.includes(strategem.name) ? "disabled" : null}
                    />
                  </div>
              ))}
            </div>
            <h2>Defensive</h2>
            <div className="defensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Defensive" ).map(strategem => (
                  <div>
                    <img src={process.env.PUBLIC_URL + strategem.icon} 
                      alt={strategem.name} 
                      key={strategem.name} 
                      title={strategem.name}
                      onClick={() => {disableEnable(strategem.name)}}
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
                <button disabled onClick={disableAll}>Disable All</button>
            </fieldset>

            <fieldset>
              <legend>Options</legend>
              <input type="checkbox" value="backpack"  onClick={() => setOnlyOneBackpack(!onlyOneBackpack)} />
              <label>Only 1 Backpack</label>
              <br/>
              <input type="checkbox" value="support-weapon"  onClick={() => setOnlyOneSupportWeapon(!onlyOneSupportWeapon)} />
              <label>Only 1 Support Weapon</label>
            </fieldset>

            <fieldset>
              <legend>Are you a Super Citizen?</legend>
              <input type="radio" name="super-citizen" value="yes" onClick={() => setIsSuperCitizen(true)}/>
              <label>Yes</label>
              <input type="radio" name="super-citizen" value="no" onClick={() => setIsSuperCitizen(false)}/>
              <label>No</label>
            </fieldset>

            {/* <fieldset>
              <legend>Warbonds</legend>
              <input type="checkbox" value="helldivers-mobilize" />
              <label>Helldivers Mobilize</label>
              <br/>
              <input type="checkbox" value="steeled-veterans" />
              <label>Steeled Veterans</label>
              <br/>
              <input type="checkbox" value="cutting-edge" />
              <label>Cutting Edge</label>
              <br/>
              <input type="checkbox" value="democratic-detonation" />
              <label>Democratic Detonation</label>
            </fieldset> */}
          </div>

          {/* <div>
            <h2>titel</h2>
          </div> */}

        </div>
        
        <div>
          {/* <button onClick={randomizer}>Randomize</button> */}
          <button onClick={newRando}>Randomize</button>
          <hr/>

          <div>
            {
              rando !== null ? 
              rando.map((strategem) => (
                <>
                  <img src={process.env.PUBLIC_URL + strategem.icon} 
                    alt={strategem.name} 
                    key={strategem.name} 
                    title={strategem.name}
                    />
                </>
              ))
              :
              null
            }
            <hr/>
            {
              removed !== null?
              removed.map((strategem) => (
                <><img src={process.env.PUBLIC_URL + strategem.icon} 
                    alt={strategem.name} 
                    key={strategem.name} 
                    title={strategem.name}
                    /></>
              ))
              : null
            }
          </div>
          <div>
            <p><b>Primary Weapon:</b> {primaryWeaponRando.name}</p>
            <p><b>Secondary Weapon:</b> {secondaryWeaponRando.name}</p>
            <p><b>Grenade Weapon:</b> {grenadeRando.name}</p>
          </div>
        </div>

        
      </main>
  );
}

export default App;
