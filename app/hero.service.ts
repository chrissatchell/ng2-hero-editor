import { Injectable } from "@angular/core";
import { HEROES } from "./mock-heroes";
import { Hero } from "./hero";

@Injectable()

export class HeroService {
	
	getHeroes() {
		//return HEROES;
		
		return new Promise<Hero[]>( (resolve, reject) => {
			resolve(HEROES);
		});
		
		/**
		 * Simplier syntax 
		 */
		//return Promise.resolve(HEROES);
	}

	getHeroesSlowly() {
	  return new Promise<Hero[]>(resolve =>
	    setTimeout(() => resolve(HEROES), 2000) // 2 seconds
	  );
	}

	getHero(id: number) {
		return this.getHeroes().then(heroes => // Get array of heroes
			heroes.find(hero => hero.id === id)  // Loop through heroes and return hero object with a matching id
		);
	}
}