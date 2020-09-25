"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
function searchByTraits(people) {
  let userSearchOptions = promt(
    "What traits or characteristics would you like to search for? 'Gender', 'Age', 'Height', 'Weight', 'Eye color', 'Occupation'"
  );
  let filteredPeople;

  switch (userSearchOptions) {
    case "Gender":
      filteredPeople = searchByGender(people);
      break;
    case "Age":
      filteredPeople = searchByAge(people);
      break;
    case "Height":
      filteredPeople = searchByHeight(people);
      break;
    case "Weight":
      filteredPeople = searchByWeight(people);
      break;
    case "Eye Color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "Occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("Invalid search option, please try again.");
      searchByTraits(people);
      break;
  }
  for (i = 0; i < filteredPeople.length; i++) {
    if (filteredPeople.length == 0) {
      alert("This person doesn't exist.");
      app(people);
    } else if (filteredPeople.length > 1) {
      searchByTraits(filteredPeople);
    } else {
      displayPeople(filteredPeople);
    }
  }
}
function searchByGender(people) {
  let userInputGender = prompt(
    "What is the gender of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.gender == userInputGender) {
      return true;
    }
  });
  return thisArray;
}
function searchByAge(people) {
  let userInputAge = prompt(
    "What is the Age of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.Age == userInputAge) {
      return true;
    }
  });
  return thisArray;
}
function searchByHeight(people) {
  let userInputHeight = prompt(
    "What is the Height of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.Height == userInputHeight) {
      return true;
    }
  });
  return thisArray;
}
function searchByWeight(people) {
  let userInputWeight = prompt(
    "What is the Weight of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.weight == userInputWeight) {
      return true;
    }
  });
  return thisArray;
}
function searchByEyeColor(people) {
  let userInputEyeColor = prompt(
    "What is the Eye Colorof the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
  return thisArray;
}
function searchByOccupation(people) {
  let userInputOccupation = prompt(
    "What is the Occupation of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.occupation == userInputOccupation) {
      return true;
    }
  });
  return thisArray;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'"
  );

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      getFamily();
      break;
    case "descendants":
      getPersonDescendants();
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  console.log(foundPerson);
  // TODO: find the person using the name they entered
  const newObj = foundPerson.reduce(function (result, item, index) {
    result[index] = item;
    return result;
  });
  return newObj;
}

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
  app(people);
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Date of Brith: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
