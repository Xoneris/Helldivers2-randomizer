import { strategems } from "./strategems";
import { primary_weapons, secondary_weapons, grenades } from "./weapons";
import { useState, useRef } from "react";

function App() {

  const [rando, setRando] = useState([]);
  const [disableStrategem, setDisableStrategem] = useState([]);

  const [primaryWeaponRando, setPrimaryWeaponRando] = useState([]);
  const [secondaryWeaponRando, setSecondaryWeaponRando] = useState([]);
  const [grenadeRando, setGrenadeRando] = useState([]);

  const [onlyOneBackpack, setOnlyOneBackpack] = useState(false);
  const [onlyOneSupportWeapon, setOnlyOneSupportWeapon] = useState(false);
  const [isSuperCitizen, setIsSuperCitizen] = useState(true);

  let strategem_copy = [...strategems];

  const primary_weapons_copy = useRef(primary_weapons)
  const secondary_weapons_copy = useRef(secondary_weapons)
  const grenades_copy = useRef(grenades)

  const array_shuffle = (array, array_length) => {
    
  if (isSuperCitizen === false){
      array = array.filter((weapon) => weapon.name !== "MP-98 Knight");
    }

    let random = Math.floor(Math.random() * (array_length + 1));
    let temp = array[0];
    array[0] = array[random];
    array[random] = temp;

    return array[0];
  }  

  const newRando = () => {
    
    let rando_array = []
    let backpackRemoved = false
    let supportWeaponRemoved = false

    if (disableStrategem !== null) {
      strategem_copy = strategems.filter(stratagem => !disableStrategem.includes(stratagem.name));
    }

    for (let i = 0 ; i < 4 ; i++) {

      const array_length = strategem_copy.length - 1 ;
      const random = Math.floor(Math.random() * (array_length) + 1);
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
    }
    setRando([...rando_array])
    setPrimaryWeaponRando(array_shuffle(primary_weapons_copy.current, (primary_weapons_copy.current.length - 1)));
    setSecondaryWeaponRando(array_shuffle(secondary_weapons_copy.current, (secondary_weapons_copy.current.length - 1)));
    setGrenadeRando(array_shuffle(grenades_copy.current, (grenades_copy.current.length - 1)));
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

  const disableWarbond = (event, warbond_name) => {

    let warbond_primarys = primary_weapons.filter((primary) => primary.warbond === warbond_name)
    let warbond_secondarys = secondary_weapons.filter((secondary) => secondary.warbond === warbond_name)
    let warbond_grenades = grenades.filter((grenade) => grenade.warbond === warbond_name)

    if (event.target.checked === true){
      primary_weapons_copy.current = primary_weapons_copy.current.filter((primary) => primary.warbond !== warbond_name)
      secondary_weapons_copy.current = secondary_weapons_copy.current.filter((secondary) => secondary.warbond !== warbond_name)
      grenades_copy.current = grenades_copy.current.filter((grenade) => grenade.warbond !== warbond_name)
    } else {
      primary_weapons_copy.current.push(...warbond_primarys)
      secondary_weapons_copy.current.push(...warbond_secondarys)
      grenades_copy.current.push(...warbond_grenades)
    }
  }

  return (
      <main>
        <div className="wrapper">
          <section>
            <h2>Offensive</h2>
            <div className="offensive-strategems-comtainer">
              {strategems.filter((strategem) => strategem.category === "Offensive").map(strategem => (
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
              {strategems.filter((strategem) => strategem.category === "Defensive").map(strategem => (
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

            <fieldset>
              <legend>Warbonds</legend>
              <label>Disable Warbonds you don't own</label>
              <br/>
              
              
              <input type="checkbox" value="Steeled Veterans" onClick={(e) => disableWarbond(e, "Steeled Veterans")}/>
              <label>Steeled Veterans</label>
              <br/>
              <input type="checkbox" value="Cutting Edge" onClick={(e) => disableWarbond(e, "Cutting Edge")}/>
              <label>Cutting Edge</label>
              <br/>
              <input type="checkbox" value="Democratic Detonation" onClick={(e) => disableWarbond(e, "Democratic Detonation")}/>
              <label>Democratic Detonation</label>
              <br/>
              <input type="checkbox" value="Polar Patriots" onClick={(e) => disableWarbond(e, "Polar Patriots")}/>
              <label>Polar Patriots</label>
              <br/>
              <input type="checkbox" value="Viper Commandos" onClick={(e) => disableWarbond(e, "Viper Commandos")}/>
              <label>Viper Commandos</label>
            </fieldset>
            
            {/* <fieldset>
              <legend>Steeled Veterans</legend>
              {
                primary_weapons.filter((primary) => primary.warbond === "Steeled Veterans").map(primary => (
                  <p>{primary.name}</p>
                ))
              }
              {
                secondary_weapons.filter((secondary) => secondary.warbond === "Steeled Veterans").map(secondary => (
                  <p>{secondary.name}</p>
                ))
              }
              {
                grenades.filter((grenade) => grenade.warbond === "Steeled Veterans").map(grenade => (
                  <p>{grenade.name}</p>
                ))
              }
            </fieldset> */}

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
