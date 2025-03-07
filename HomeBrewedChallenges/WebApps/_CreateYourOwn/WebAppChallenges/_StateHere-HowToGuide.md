# New App Creation
## Create a Repository
- Open a root terminal
- Navigate to whever you keep all of your repos
- Verify the GitHub CLI is installed with `gh version`
  - If not, do the first time setup:
    - `sudo apt install gh`
    - `gh auth login`
    - Login via the browser
      - The authorization code is back in the terminal
- While in the root of our repo directory run `gh repo create`
  - Fllow the prompts such as "Create a new repository on GitHub from scratch"
  - "Clone the new repository locally?" - Y
## Create Frontend Template
- Open a root terminal
- Navigate to whever you keep all of your repos.
- Go into your project's directory
  - `cd repo-name-here`
- Verify all needed packages are installed
  - `node -v && npm -v`
  - `ng version`
    - If not installed:
      - `sudo npm i -g @angular/cli`
- `npm create cloudflare`
  - In which directory do you want to create your application?
    - `./repo-name-here-frontend` -> enter
  - Please Note - following steps in this tutorial will be Angular framework specific
  - Down arrow to choose 'Framework Starter' -> enter
  - Down arrow to choose 'Angular' -> enter
  - Install needed dependencies
  - Choose CSS stylesheet if you dont have a preference
  - Do you want to deploy?
    - Left arrow to highlight yes -> enter
    - Browser will be opened automatically -> login


# Optional Setup
## Create Backend API Template
- Verify you can login to Cloudflare
  - If not then you will need to create your account now at https://www.cloudflare.com/
- Open a root terminal
- Navigate to whever you keep all of your repos and into your project's directory
  - `cd repo-name-here`
- `npm create cloudflare`
  - install any needed packages
  - In which directory do you want to create your application?
    - `./repo-name-here-backend` -> enter
  - Choose 'Hello World' example
    - FYI I am starting to like the 'Hono' template the most for workers
  - Choose 'Hellow World Worker'
  - Do you want to deploy?
    - Left arrow to highlight yes -> enter
    - Browser will be opened automatically -> login
## Database Template
### Creation
- Cloudflare website -> Storage & Databases -> D1 SQL Database -> Create button
- Name: `repo-name-here-database` -> Create
- Create Table button
  - Table Name: comments
  - Column name: id, Type: integer
  - Column name: author, Type: text
  - Column name: body, Type: text
  - Column name: post_slow, Type: text
- Create -> ... menu -> Add data -> Add a couple rows of data
### Connect the Database to the Worker/API
- Cloudflare website
  - Storage & Databases -> D1 SQL Database
  - Copy the ID of the database
- Open the repo-name-here-backed project in Visual Studio code
- Add a property to the wrangler.jsonc file
```
  ,"d1_databases": [
    {
      "binding": "DATABASE_ID",
      "database_name": "cloudflare-tutorial-database",
      "database_id": "PASTE_COPIED_DATABASE_ID_HERE"
    }
  ]
```
- Back in the root terminal inside /repo-name-here-backend run `npm run cf-typegen`
  - This will update the Env interface so you have access to env.database_id
- Back in Visual Studio code open /repo-name-here-backend/src/index.ts
- Update the fetch() to make a database call to the comments table we made earlier
```
		const url = new URL(request.url);
		if (url.pathname === '/api/comments') {
		  const result = await env.DATABASE_ID.prepare('SELECT * FROM comments LIMIT 3').all();
		  return new Response(JSON.stringify(result), {
			headers: { 'Content-Type': 'application/json' },
		  });
		}
```
- `wrangler deploy`
- Note the URL that it was deployed to
- TODO - need to add CORS headers so the app will work

## Connect Frontend to Backend API
### Create the service that calls the Comments API
- In the terminal navigate to repo-name-here/repo-name-here-frontend/src/app
  - `ng generate service services/comments`
  - Open the file in Visual Studio code
- Create a variable of the URL that your backend was deployed to
  - Option 1: This was the URL from the `wrangler deploy` step
  - Option 2: Cloudflare website -> Compute (Workers) -> repo-name-here-backend -> Settings -> Domains and Routes
- Add the /api/comments route to the base URL
  - The route will be found inside repo-name-here/repo-name-here-backend/src/index.ts
  - Ex:   https://app-name-here-backend.username.workers.dev/api/comments
- Import HttpClient, and inject it into an http variable
  - `import { HttpClient } from '@angular/common/http';`
  - `private http: HttpClient = inject(HttpClient);`
- Create a getComments() function that sends a GET request to the api and response the response
```
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommentsService {
  private repoNameHereBackendCommentsAPI: string = 'https://app-name-here-backend.username.workers.dev/api/comments';
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getComments(): Observable<any> {
    return this.http.get(this.repoNameHereBackendCommentsAPI);
  }
}

```
### Display Data in the Template
- Visual Studio Code - navigate to repo-name-here/repo-name-here-frontend/src/app/app.component.ts
- - Update the AppComeponent class to implemnt OnInit
  - `export class AppComponent implements OnInit`
- Inject your CommentsService
  - `private commentsService: CommentsService = inject(CommentsService);`
- Create a variable to store the data that will be returned
  - `comments: any[] = [];`
- Implement the ngOnInit function to call your CommentsService
```
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cloudflare-tutorial-frontend';
  comments: any[] = [];
  private commentsService: CommentsService = inject(CommentsService);

  ngOnInit() {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data.results; 
    });
  }
}
```
- Update the app.component.html to display all of the comments
```
<h2>Comments</h2>
<ul>
  @for(comment of comments; track comment.id) {
    <li>{{ comment.body }}</li>
  }
</ul>

<router-outlet />
```
### Deploy changes to Cloudflare
- Confirm you are on the main branch
- In the terminal navigate to repo-name-here/repo-name-here-frontend
- `npm run deploy`
  - If you go into the packages.json file you can see all the scripts you could run
- In the terminal it will have the URL where the page was deployed to
  - This first part of the subdomain is a unqiue identify, and changes everytime.
  - You dont have to include this to go to the most recently deployed version
    - Example fully qualified: https://f5841f29.repo-name-frontend.pages.dev/
    - Example that works as well: https://repo-name-frontend.pages.dev/


### Local Development (worker)
