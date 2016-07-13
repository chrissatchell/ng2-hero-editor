// ==========================================================================
// main.ts
// ==========================================================================

import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { appRouterProviders } from "./app.routes";

bootstrap(AppComponent, [
  appRouterProviders
]);

// ==========================================================================
// app.routes.ts
// ==========================================================================

import { provideRouter, RouterConfig } from "@angular/router";
import { HeroesComponent } from "./heroes.component";
import { DashboardComponent } from "./dashboard.component";
import { HeroDetailComponent } from "./hero-detail.component";

const routes: RouterConfig = [
	{
		path: 'heroes', 
		component: HeroesComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	
	// Redirect '/' to '/dashboard'
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},

	// Route with parameter
	{
		path: 'detail/:id',
		component: HeroDetailComponent
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];

// ==========================================================================
// hero.service.ts
// ==========================================================================

import { Injectable } from "@angular/core";
import { HEROES } from "./mock-heroes";
import { Hero } from "./hero";

@Injectable()

export class HeroService {
	
	getHeroes() {
		
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

// ==========================================================================
// app.component.ts
// ==========================================================================

import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeroService } from "./hero.service";

@Component({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<nav>
			<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
			<a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES],
	providers: [HeroService]
})

export class AppComponent {
	title = "Tour of Heroes";
}

// ==========================================================================
// dashboard.component.ts
// ==========================================================================

import { Component, OnInit } from "@angular/core";
import { Hero } from './hero';

import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
	selector: 'my-dashboard',
	template: ``,
	providers: [HeroService]
})

export class DashboardComponent implements OnInit {

	heroes: Hero[] = [];

	constructor(
		private heroService: HeroService,
		private router: Router
	) {}

	ngOnInit() {
		this.heroService.getHeroes().then( heroes => {
			this.heroes = heroes.slice(0,4);
			console.log(heroes, this.heroes);
		});
	}
	
	gotoDetail(hero: Hero) {
		let link = ['/detail', hero.id]; //[path, route parameter]
		this.router.navigate(link);
	}
}

// ==========================================================================
// heroes.component.ts
// ==========================================================================

import { Component, OnInit } from '@angular/core';
import { Hero } from "./hero";
import { HeroDetailComponent } from "./hero-detail.component";

import { HeroService } from "./hero.service"; // Service
import { Router } from "@angular/router";

@Component({
	selector: 'my-heroes',
	styles: [...],
	template: `
		<h2>My Heroes</h2>
		<ul class="heroes">
			<li 
				*ngFor="let hero of heroes"
				(click)="onSelect(hero)"
				[class.selected]="hero === selectedHero"
			>
				<span class="badge">{{hero.id}}</span> 
				{{hero.name}}
			</li>
		</ul>

    <div *ngIf="selectedHero">
    	<h2>
				{{selectedHero.name | uppercase}} is my hero!
    	</h2>
    	<button (click)="gotoDetail()">View Details</button>
    </div>
	`
})

export class HeroesComponent implements OnInit { 
	heroes: Hero[];
	selectedHero: Hero;

	constructor(
		private heroService: HeroService,
		private router: Router
	) {}


	getHeroes() {

		/**
		 * Our callback sets the component's heroes property to 
		 * the array of heroes returned by the service.
		 */
		this.heroService.getHeroes().then(returnedFromService => this.heroes = returnedFromService);

	}

	ngOnInit() {
		this.getHeroes();
	}

	onSelect(hero: Hero) {
		this.selectedHero = hero;
	}

	gotoDetail() {
		this.router.navigate(['/detail', this.selectedHero.id]);
	}
}

// ==========================================================================
// hero.ts
// ==========================================================================

export interface Hero {
	id: number;
	name: string;
}
