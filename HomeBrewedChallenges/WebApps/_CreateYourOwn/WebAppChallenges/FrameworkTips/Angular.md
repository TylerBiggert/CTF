https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/

# Environment Variables
## Add Variable
- Create an `environments.ts` file
- Add some variables
  - export const environment = {
        HINT_SOLUTION_TEXT: 'testing'
    };
- Import the file into the component and create the reference variable
  - import { environment } from '../environments/environment';
  - environment = environment;

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


# Images/Assets
- Add the image to /src/assets/images/fileNameHere.svg
- Update angular.json src array to include `src/assets`
- Use the image `<img src="assets/images/fileNameHere.svg">`