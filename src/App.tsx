import React, { useState } from "react";
import { people } from "./data/People";
import { Environment } from "./enums/Environment";
import { Person } from "./models/Person";

// searchPeople without environment filtering
// const searchPeople = async (searchTerm: string): Promise<Person[]> => {
//   // Simulate an API call by waiting for 1 second before returning the filtered results
//   // await new Promise((resolve) => setTimeout(resolve, 1000));
//   return people.filter((person) =>
//     person.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// };

const searchPeople = async (
  searchTerm: string,
  environment: Environment
): Promise<Person[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (environment === Environment.Staging) {
    return filteredPeople.filter((person) => person.environment === "staging");
  } else if (environment === Environment.Production) {
    return filteredPeople.filter(
      (person) => person.environment === "production"
    );
  } else {
    return filteredPeople.filter((person) => person.environment === "test");
  }
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Person[] | undefined>(
    undefined
  );
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Production
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleEnvironmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnvironment(event.target.value as Environment);
  };

  const handleSearchButtonClick = async () => {
    const response = await searchPeople(searchTerm, environment);
    setSearchResults(response);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      <div>
        <label>
          <input
            type="radio"
            value={Environment.Production}
            checked={environment === Environment.Production}
            onChange={handleEnvironmentChange}
          />
          Production
        </label>
        <label>
          <input
            type="radio"
            value={Environment.Staging}
            checked={environment === Environment.Staging}
            onChange={handleEnvironmentChange}
          />
          Staging
        </label>
        <label>
          <input
            type="radio"
            value={Environment.Test}
            checked={environment === Environment.Test}
            onChange={handleEnvironmentChange}
          />
          Test
        </label>
      </div>
      {searchResults?.map((person) => (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Age: {person.age}</p>
        </div>
      ))}
    </div>
  );
}
