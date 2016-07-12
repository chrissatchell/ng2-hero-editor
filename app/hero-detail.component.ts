import { Component, Input } from "@angular/core";
import { Hero } from "./hero";

@Component({
	selector: 'my-hero-detail',
	template: `
    <div *ngIf="theHero">
      <h2>{{theHero.name}} details!</h2>
      <div><label>id: </label>{{theHero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="theHero.name" placeholder="name"/>
      </div>
    </div>
  `
})

export class HeroDetailComponent {
	@Input() theHero: Hero;
}