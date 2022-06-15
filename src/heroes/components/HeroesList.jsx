import { useMemo } from "react";
import { HeroCard } from "./";
import { getHeoresByPublisher } from "../helpers/getHeroesByPublisher";

export const HeroesList = ({ publisher }) => {
  const heroes = useMemo(() => getHeoresByPublisher(publisher), [publisher]);
  return (
    <div className="row rows-cols-1 row-cols-md-3 columns g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
