// Object containing real pet names mapped to their traits, color, and type
const petNamesByAttributes = {
  dog: {
    playful: {
      black: ["Shadow", "Zorro", "Ace"],
      white: ["Snowy", "Luna", "Blanca"],
      brown: ["Coco", "Bruno", "Teddy"]
    },
    calm: {
      black: ["Milo", "Bear", "Raven"],
      white: ["Bella", "Angel", "Fluffy"],
      brown: ["Willow", "Oliver", "Rusty"]
    },
    energetic: {
      black: ["Dash", "Rocket", "Bolt"],
      white: ["Max", "Blizzard", "Sparky"],
      brown: ["Charlie", "Rusty", "Simba"]
    },
    loyal: {
      black: ["Knight", "King", "Shadow"],
      white: ["Snow", "Pearl", "Faith"],
      brown: ["Copper", "Buddy", "Duke"]
    },
    curious: {
      black: ["Hunter", "Oreo", "Midnight"],
      white: ["Casper", "Marble", "Nimbus"],
      brown: ["Biscuit", "Hopper", "Mocha"]
    }
  },
  cat: {
    playful: {
      black: ["Midnight", "Zippy", "Salem"],
      white: ["Whiskers", "Snowball", "Marble"],
      brown: ["Simba", "Nala", "Ginger"]
    },
    calm: {
      black: ["Onyx", "Jet", "Pepper"],
      white: ["Pearl", "Casper", "Ivory"],
      brown: ["Chloe", "Willow", "Autumn"]
    },
    energetic: {
      black: ["Luna", "Tigger", "Sable"],
      white: ["Frosty", "Misty", "Angel"],
      brown: ["Tiger", "Mochi", "Ziggy"]
    },
    loyal: {
      black: ["Panther", "King", "Boo"],
      white: ["Snowflake", "Diamond", "Frost"],
      brown: ["Oreo", "Milo", "Biscuit"]
    },
    curious: {
      black: ["Inky", "Smokey", "Noir"],
      white: ["Nimbus", "Cloud", "Frosty"],
      brown: ["Patches", "Hopper", "Whiskers"]
    }
  },
  bird: {
    playful: {
      black: ["Raven", "Chirpy", "Pepper"],
      white: ["Tweety", "Cloud", "Angel"],
      brown: ["Feathers", "Sunny", "Cinnamon"]
    },
    calm: {
      black: ["Noir", "Jet", "Storm"],
      white: ["Ivory", "Snow", "Pearl"],
      brown: ["Hazel", "Autumn", "Coco"]
    },
    energetic: {
      black: ["Swoop", "Flap", "Jet"],
      white: ["Blizzard", "Frosty", "Nimbus"],
      brown: ["Chirpy", "Twig", "Sunny"]
    },
    loyal: {
      black: ["Sable", "Storm", "Raven"],
      white: ["Snowy", "Fluffy", "Frost"],
      brown: ["Cinnamon", "Goldie", "Twig"]
    },
    curious: {
      black: ["Inky", "Smokey", "Noir"],
      white: ["Nimbus", "Frosty", "Ivory"],
      brown: ["Pip", "Hazel", "Twig"]
    }
  }
};

// Function to get the input values
function getInputValues() {
  const petType = document.getElementById('petType').value.toLowerCase();
  const trait = document.getElementById('petTrait').value.toLowerCase();
  const color = document.getElementById('petColour').value.toLowerCase();
  return { petType, trait, color };
}

// Array of static bird image URLs
const birdImages = [
  "../assets/bird1.jpg",
  "../assets/bird2.jpg",
  "../assets/bird3.jpg",
  "../assets/bird4.jpg",
  "../assets/bird5.jpg"
];

// Free API URLs for different pets
const apiUrls = {
  dog: 'https://dog.ceo/api/breeds/image/random',
  cat: 'https://api.thecatapi.com/v1/images/search',
  bird: 'static'  // Placeholder for bird image logic
};

// Function to fetch a random image from the free API based on the pet name
function fetchPetImage(petType) {
  if (petType === 'bird') {
    const randomBirdIndex = Math.floor(Math.random() * birdImages.length);
    return Promise.resolve(birdImages[randomBirdIndex]);
  }

  const apiUrl = apiUrls[petType];
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (petType === 'dog') {
        return data.message;
      } else if (petType === 'cat') {
        return data[0].url;
      }
    })
    .catch(error => {
      console.error("Error fetching pet image:", error);
      return 'https://via.placeholder.com/300';
    });
}

// Function to get a matching pet name based on type, trait, and color
function getMatchingName(petType, trait, color) {
  let matchedNames = [];
  if (petNamesByAttributes[petType]) {
    if (petNamesByAttributes[petType][trait] && petNamesByAttributes[petType][trait][color]) {
      matchedNames = matchedNames.concat(petNamesByAttributes[petType][trait][color]);
    }
  }

  if (matchedNames.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchedNames.length);
    const petName = petType;
    fetchPetImage(petType)
      .then(imageUrl => {
        document.getElementById('pet-image').src = imageUrl;
        document.getElementById('pet-image').style.visibility = "visible";
      })
      .catch(error => {
        console.error("Error displaying pet:", error);
      });

    return matchedNames[randomIndex];
  } else {
    return "No matching name found!";
  }
}

// Form submission handler
document.getElementById('pet-name-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const { petType, trait, color } = getInputValues();
  const suggestedName = getMatchingName(petType, trait, color);
  document.getElementById('generated-name').innerHTML = `Suggested Pet Name: ${suggestedName}`;
  document.getElementById('generated-name').style.visibility = "visible";
});

// Update the footer year
document.getElementById('year').textContent = new Date().getFullYear();
