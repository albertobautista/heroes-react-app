import React from "react";
import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => {
  if (alter_ego === characters) return <></>;
  return <p>{characters}</p>;
};

export const HeroCard = ({ hero }) => {
  const { id, superhero, publisher, alter_ego, first_appearance, characters } =
    hero;
  const heroImageUrl = `/assets/heroes/${id}.jpg`;
  // const charactersByHero = <p>{characters}</p>;
  return (
    <div className="col-6">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-6 animate__animated animate__fadeIn">
            <img className="card-img" alt={superhero} src={heroImageUrl} />
          </div>
          <div className="col-6">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>
              {/* {alter_ego !== characters && <p>{characters}</p>} */}
              {/* {alter_ego !== characters && charactersByHero} */}
              <CharactersByHero alter_ego={alter_ego} characters={characters} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
