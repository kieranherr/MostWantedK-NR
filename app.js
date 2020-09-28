"use strict";

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
      searchResults = searchByTraits(people);
      break;
    default:
      app(people);
      break;
  }
  mainMenu(searchResults, people);
}

function mainMenu(person, people) {
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
      getFamily(person, people);
      break;
    case "descendants":
      getPersonDescendants();
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(person, people);
  }
}
function searchByTraits(people) {
  let userSearchOptions = promt(
    "What traits or characteristics would you like to search for? 'Gender', 'DOB: month/day/year', 'Height', 'Weight', 'Eye color', 'Occupation'"
  );
  let filteredPeople;
  switch (userSearchOptions) {
    case "Gender":
      filteredPeople = searchByGender(people);
      break;
    case "DOB: month/day/year":
      filteredPeople = searchByDOB(people);
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
function searchByDOB(people) {
  let userInputDOB = prompt(
    "What is the DOB: month/day/year, of the Individual you are looking for?"
  );
  let thisArray = people.filter(function (el) {
    if (el.dob == userInputDOB) {
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
  const newObj = foundPerson.reduce(function (result, item, index) {
    result[index] = item;
    return result;
  });
  return newObj;
}

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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender " + person.gender + "\n";
  personInfo += "Date of Brith: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  alert(personInfo);
}

function getFamily(person, people) {
  let family = people.filter(function (el) {
    if (el.parents === people.id) {
      return true;
    } else {
      return false;
    }
  });
  const newObj = family.reduce(function (result, item, index) {
    result[index] = item;
    return result;
  });
  displayPeople(newObj);
}
function getSpouse(person, people) {
  let foundSpouse = people.filter(function (people) {
    if (people.currentSpouse == person.id) {
      return true;
    } else {
      return false;
    }
  });
  return foundSpouse;
}
function getSiblings(person, people) {
  let foundSiblings = people.filter(function (people) {
    for (let i = 0; i < people.parents.length; i++) {
      if (
        person.parents.includes(people.parents[i]) &&
        person.id !== people.id
      ) {
        return true;
      }
    }
    return false;
  });
  return foundSiblings;
}
function getParents(person, people) {
  let foundParents = people.filter(function (people) {
    if (person.parents.includes(people.id)) {
      return true;
    } else {
      return false;
    }
  });
  return foundParents;
}

function searchForDescendants(person, people) {
  let foundDescendants = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person.id)) {
      foundDescendants.push(people[i]);
    }
  }
  for (let i = 0; i < foundDescendants.length; i++) {
    let thisOne = seachForDescendants(foundDescendants[i], people);
    thisOne.forEach(function (el) {
      foundDescendants.push(el);
    });
  }
  return foundDescendants;
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input) {
  return true;
}
