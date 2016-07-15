// Trick the HTTP client into fetching and saving data from a mock service, the in-memory web API.
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

// The usual bootstrapping imports
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

// Routes
import { appRouterProviders } from "./app.routes";

// HTTP
import { HTTP_PROVIDERS } from "@angular/http";

bootstrap(AppComponent, [
	appRouterProviders,
	HTTP_PROVIDERS,
	{ provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
	{ provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
