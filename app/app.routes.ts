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