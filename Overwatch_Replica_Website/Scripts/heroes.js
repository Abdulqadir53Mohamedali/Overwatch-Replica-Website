const baseUrl = 'https://overfast-api.tekrop.fr/heroes';
const rolesUrl = 'https://overfast-api.tekrop.fr/roles';

// Make a GET request to the /heroes endpoint
fetch(baseUrl)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON from the response
    return response.json();
  })
  .then(heroesData => {
    // Once heroes data is loaded, fetch roles data
    fetch(rolesUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(rolesData => {
        // Both heroesData and rolesData are now available
        herocards(heroesData, rolesData);
        console.log(heroesData);
        console.log(rolesData);

      })
      .catch(error => {
        console.error('Fetch error for roles:', error);
      });
  })
  .catch(error => {
    console.error('Fetch error for heroes:', error);
  });






function herocards(heroesData, rolesData) {
    const roleMap = {}; // Create a map to store roles based on their key

    // Populate the roleMap with roles from rolesData
    for (const role of rolesData) {
      roleMap[role.key] = role;
    }
  
    for (let heropic = 0; heropic < 38; heropic++) {
      const hero = heroesData[heropic];
      if (hero) {
        const heroName = hero.name;
        const heroPortrait = hero.portrait;
        const heroBox = document.querySelector(`#hero${heropic}`);
  
        // Get the role for the current hero using the role key
        const heroRole = roleMap[hero.role];
  
        if (heroRole) {
          // Now you can access role data for the hero, e.g., heroRole.name
          heroBox.innerHTML += `<div class = "HC">
            <img src="${heroPortrait}">
            <p>${heroName}</p>
            <img id = "icon" src="${heroRole.icon}" alt="${heroRole.name} Icon">
            </div>
            `
        } else {
          console.log("Role not found for hero");
        }
      } else {
        console.log("Hero not found");
      }
    }
}
