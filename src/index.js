// Your code here
const baseURL = "http://localhost:3000/characters";

class Character {
  id;
  name;
  image;
  votes;

  constructor(id, name, image, votes) {
    (this.id = id),
      (this.name = name),
      (this.image = image),
      (this.votes = votes);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getCharacters();

  document.getElementById("votes-form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitVotesForm();
  });

  document.getElementById("reset-btn").addEventListener("click", resetVotes);
});

// function to get character from the API and load on the browser
const getCharacters = () => {
  let bar = document.getElementById("character-bar");

  fetch(baseURL)
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      result.forEach((character) => {
        let characterInfo = new Character(
          character.id,
          character.name,
          character.image,
          character.votes
        );
        let itemContainer = document.createElement("div");
        let itemName = document.createElement("h2");
        itemContainer.append(itemName);
        itemName.innerText = characterInfo.name;
        bar.append(itemContainer);

        itemName.addEventListener("click", () => {
          loadCharacter(characterInfo.id);
        });
      });
    })
    .catch((error) => {
      throw error;
    });
};

// function to load specific character using id from API
const loadCharacter = (id) => {
  fetch(`${baseURL}/${id}`)
    .then((res) => res.json())
    .then((character) => {
      let characterInfo = new Character(
        character.id,
        character.name,
        character.image,
        character.votes
      );
      document.getElementById("name").innerText = characterInfo.name;
      document.getElementById("image").src = characterInfo.image;
      document.getElementById("vote-count").innerText = characterInfo.votes;
    })
    .catch((error) => {
      throw error;
    });
};

// function for adding votes
const submitVotesForm = () => {
  let votes = document.getElementById("votes").value;
  console.log(votes);
  document.getElementById("vote-count").innerText = votes;
};

// function for resetting votes
const resetVotes = () => (document.getElementById("vote-count").innerText = 0);
