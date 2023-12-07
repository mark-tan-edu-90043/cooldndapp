"use client"
import React, { useState, useEffect } from 'react';

const ClassCard = ({ dndClass }) => {
  const [expanded, setExpanded] = useState(false);
  const [classDetails, setClassDetails] = useState(null);
  const [classLevels, setClassLevels] = useState(null);

  const toggleExpansion = async () => {
    if (!expanded) {
      try {
        const classResponse = await fetch(`https://www.dnd5eapi.co${dndClass.url}`);
        const classData = await classResponse.json();
        setClassDetails(classData);

        // Fetch class levels
        const levelsResponse = await fetch(`https://www.dnd5eapi.co${classData.class_levels}`);
        const levelsData = await levelsResponse.json();
        setClassLevels(levelsData);
      } catch (error) {
        console.error('Error fetching class details or levels:', error);
      }
    }

    setExpanded(!expanded);
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h1 onClick={toggleExpansion} style={{ cursor: 'pointer' }}>
        {dndClass.name}
      </h1>
      {expanded && classDetails && classLevels && (
        <div>
          <p>
            <strong>Hit Die:</strong> d{classDetails.hit_die}
          </p>
          <p>
            <strong>Saving Throws:</strong>{' '}
            {classDetails.saving_throws.map((savingThrow) => savingThrow.name).join(', ')}
          </p>
          <p>
            <strong>Proficiencies:</strong>{' '}
            {classDetails.proficiencies.map((proficiency) => proficiency.name).join(', ')}
          </p>
          <p>
            <strong>Starting Equipment:</strong>{' '}
            {classDetails.starting_equipment.map((equipment) => equipment.equipment.name).join(', ')}
          </p>
          <p>
            <strong>Skills:</strong>{' '}
            {classDetails.proficiency_choices.map((choice) => {
              return (
                <span key={choice.type}>
                  {choice.desc} (
                  {choice.from.options.map((option) => (
                    <span key={option.index}>{option.item.name}, </span>
                  ))}
                  )
                </span>
              );
            })}
          </p>
          <p>
             <strong>Class Levels:</strong>{' '}
             {classLevels.map((level) => (
               <div key={level.index}>
                 <p>
            <strong>Level:</strong> {level.level}
          </p>
         <p>
        <strong>Features:</strong>{' '}
        {level.features.map((feature) => (
          <span key={feature.index}>{feature.name}, </span>
        ))}
      </p>
      {/* Add more details as needed */}
    </div>
  ))}
</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/classes');
        const data = await response.json();
        setClasses(data.results);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>D&D 5th Edition Classes</h1>
      {classes.map((classInfo) => (
        <ClassCard key={classInfo.index} dndClass={classInfo} />
      ))}
    </div>
  );
};

export default Classes;
