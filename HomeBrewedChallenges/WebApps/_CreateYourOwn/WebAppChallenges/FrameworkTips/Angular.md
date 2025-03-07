https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/

# Source Map Visible
- Alows researches to view source in the browser's Developer Tools easier.
- angular.json file -> build options -> `"sourceMap": true, "optimization": false,`

# Styling / Angular Material
https://material.angular.io/components
- npm i @angluar/material
- angular.json -> styles array -> add `"node_modules/@angular/material/prebuilt-themes/indigo-pink.css"`

# Routing
- `ng g c component-name-here`
- Import the component into app.component.ts
  - `import {ComponentNameHere} from './component-name-here.component';`
- Define routes to components
  - export const routes: Routes = [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'secured/BusinessCenter', component: BusinessCenterComponent, canActivate: [guardFunctionHere] },
      { path: '**', component: PageNotFoundComponent },
  ];

# Images/Files/Assets
- Add the image to /public/images/fileNameHere.svg
- Use the image `<img src="images/fileNameHere.svg">`


# Environment Variables
## Add Variable
- Create environemnt files
  - `/src/environments/environment.ts`
  - `/src/environment/environment-dev.ts`
- Add some variables to all the files
  - export const environment = {
        HINT_SOLUTION_TEXT: 'testing'
    };
- Import the file into the component and create the reference variable
  - import { environment } from '../../environments/environment';
  - environment = environment;
- Update the dev build to replace the environment.ts file with environment-dev.ts
  - "fileReplacements": 
    [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.dev.ts"
      }
    ]
- 