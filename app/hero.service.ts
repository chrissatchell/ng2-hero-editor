import { Injectable } from "@angular/core";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()

export class HeroService {
	
	private heroesUrl = 'app/heroes';  // URL to web api

	constructor(private http: Http) { }

	// Get 
	getHeroes(): Promise<Hero[]> {
	  return this.http.get(this.heroesUrl)
	             .toPromise()
	             .then(response => response.json().data)
	             .catch(this.handleError);
	}

	private handleError(error: any) {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}

	// Post
	// Add new Hero
	private post(hero: Hero): Promise<Hero> {
	  let headers = new Headers({'Content-Type': 'application/json'});

	  return this.http
	             .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
	             .toPromise()
	             .then(res => res.json().data)
	             .catch(this.handleError);
	}

	// Put
	// Update existing Hero
	private put(hero: Hero) {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');

	  let url = `${this.heroesUrl}/${hero.id}`;

	  return this.http
	             .put(url, JSON.stringify(hero), {headers: headers})
	             .toPromise()
	             .then(() => hero)
	             .catch(this.handleError);
	}

	// Delete
	delete(hero: Hero) {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');

	  let url = `${this.heroesUrl}/${hero.id}`;

	  return this.http
	             .delete(url, headers)
	             .toPromise()
	             .catch(this.handleError);
	}

	// Save
	// Combine the call to the private post and put methods.
	// Post or Put is determined by the state of the hero object -
	// if an id is present.
	save(hero: Hero): Promise<Hero>  {
	  if (hero.id) {
	    return this.put(hero);
	  }
	  return this.post(hero);
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