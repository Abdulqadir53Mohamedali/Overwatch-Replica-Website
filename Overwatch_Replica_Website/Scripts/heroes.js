
const apiUrl = 'https://overfast-api.tekrop.fr/heroes';

        // Make a GET request to the /heroes endpoint
        fetch(apiUrl)
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON from the response
                return response.json();
            })
            .then(data => {
                // Work with the list of heroes here
                console.log(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });