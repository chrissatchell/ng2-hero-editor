import { Component, OnInit, OnDestroy } from "@angular/core";
import { Hero } from "./hero";

import { HeroService } from "./hero.service"; // Service
import { ActivatedRoute } from "@angular/router"; // Service

@Component({
	selector: 'my-hero-detail',
	styles: [`
		label {
		  display: inline-block;
		  width: 3em;
		  margin: .5em 0;
		  color: #607D8B;
		  font-weight: bold;
		}
		input {
		  height: 2em;
		  font-size: 1em;
		  padding-left: .4em;
		}
		button {
		  margin-top: 20px;
		  font-family: Arial;
		  background-color: #eee;
		  border: none;
		  padding: 5px 10px;
		  border-radius: 4px;
		  cursor: pointer; cursor: hand;
		}
		button:hover {
		  background-color: #cfd8dc;
		}
		button:disabled {
		  background-color: #eee;
		  color: #ccc; 
		  cursor: auto;
		}
	`],
	template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>

    <button (click)="goBack()">Back</button>
  `
})

export class HeroDetailComponent implements OnInit, OnDestroy {

	sub: any;
	hero: any;
	
	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {

		/**
		 *  we subscribe to the params observable to extract 
		 *  the id parameter value from the ActivateRoute service 
		 *  and use the HeroService to fetch the hero with that id.
		 */
		this.sub = this.route.params.subscribe( (params) => {
			let id = +params['id']; // Convert to number

			this.heroService.getHero(id).then( (hero) => {
				this.hero = hero;
			});
		});

	}

	ngOnDestroy() {

		this.sub.unsubscribe();

	}

	goBack() {
		window.history.back();
	}

	//@Input() theHero: Hero;
}