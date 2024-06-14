// The code below is not used anymore. 
// But it's being perserved here for reference. 

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