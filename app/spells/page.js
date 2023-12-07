"use client"

import { useState, useEffect } from 'react';

const SpellCard = ({ spell }) => { //Nice little card for all the spells
  const [expanded, setExpanded] = useState(false);
  const [spellDetails, setSpellDetails] = useState(null);

  const toggleExpansion = async () => {
    if (!expanded) {
      const response = await fetch(`https://www.dnd5eapi.co${spell.url}`);
      const data = await response.json();
      setSpellDetails(data);
    }

    setExpanded(!expanded);
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3 onClick={toggleExpansion} style={{ cursor: 'pointer' }}>
        {spell.name}
      </h3>
      {expanded && (
        <div>
          <p>
            <strong>Level:</strong> {spellDetails.level}
          </p>
          <p>
            <strong>Range:</strong> {spellDetails.range}
          </p>
          <p>
            <strong>Description:</strong> {spellDetails.desc}
          </p>
        </div>
      )}
    </div>
  );
};

const Spells = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [filter, setFilter] = useState({ level: null, name: '' }); // Set the initial level to null
  const [selectedLevel, setSelectedLevel] = useState(null); // Set the initial level to null
  const [selectedSchool, setSelectedSchool] = useState(null); //Null be like

  useEffect(() => {
    const fetchSpells = async () => {
      const queryParams = new URLSearchParams();
  
      if (selectedLevel !== null) {
        queryParams.set('level', selectedLevel);
      }
  
      if (selectedSchool !== null && selectedSchool !== 'any') {
        queryParams.set('school', selectedSchool);
      }
      
      console.log(queryParams.toString());

      const response = await fetch(`https://www.dnd5eapi.co/api/spells?${queryParams.toString()}`);
      const data = await response.json();
      setSpells(data.results);
      setFilteredSpells(data.results);
    };
  
    fetchSpells();
  }, [selectedLevel, selectedSchool]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleLevelChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLevel(selectedValue === 'any' ? null : parseInt(selectedValue));
    //setFilter((prevFilter) => ({ ...prevFilter, level: selectedValue === 'any' ? null : parseInt(selectedValue) })); Woohoo redundant copy-paste code
  };

  const handleSchoolChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSchool(selectedValue === 'any' ? null : selectedValue);
    //setFilter((prevFilter) => ({ ...prevFilter, school: selectedValue === 'any' ? null : selectedValue }));
  }

  

  return (
    <div>
      <h1>Spells</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Select Spell Level:
          <select name="level" value={selectedLevel === null ? 'any' : selectedLevel} onChange={handleLevelChange}>
            <option value="any">Any</option>
            <option value={1}>1st</option>
            <option value={2}>2nd</option>
            <option value={3}>3rd</option>
            <option value={4}>4th</option>
            <option value={5}>5th</option>
            <option value={6}>6th</option>
            <option value={7}>7th</option>
            <option value={8}>8th</option>
            <option value={9}>9th</option>
          </select>
        </label>
        <label>
          Select Spell School:
          <select name="school" value={selectedSchool === null ? 'any' : selectedSchool} onChange={handleSchoolChange}>
            <option value="any">Any</option>
            <option value={"Evocation"}>Evocation</option>
            <option value={"Conjuration"}>Conjuration</option>
            <option value={"Abjuration"}>Abjuration</option>
            <option value={"Divination"}>Divination</option>
            <option value={"Enchantment"}>Enchantment</option>
            <option value={"Illusion"}>Illusion</option>
            <option value={"Necromancy"}>Necromancy</option>
            <option value={"Transmutation"}>Transmutation</option>
          </select>
        </label>
        <label>
          Filter by Name:
          <input
            type="text"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            placeholder="Enter name"
            color='#000000'
          />
        </label>
      </div>
      {filteredSpells.map((spell) => (
        <SpellCard key={spell.index} spell={spell} />
      ))}
    </div>
  );
};

export default Spells;