# AI App Creation
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
## Create the App
- Verify you can login to Cloudflare
  - If not then you will need to create your account now at https://www.cloudflare.com/
- Open a root terminal
- Navigate to whever you keep all of your repos and into your project's directory
  - `cd repo-name-here`
- `npm create cloudflare`
  - install any needed packages
  - In which directory do you want to create your application?
    - `./repo-name-here-backend` -> enter
  - Choose 'Framework Starter' example -> Choose Hono
  - Install dependencies
  - Do you want to deploy?
    - Left arrow to highlight no -> enter
    - Browser will be opened automatically -> login
- Add the AI Worker Binding:
  - open the wrangler.toml file
  - In the Bindings section, add the entry for AI and save
  - ,"ai": {
     "binding": "AI"
    }
- Allow typescript to know of the AI Worker Binding:
  - In the terinal, make sure you are at /repo-name-here/repo-name-here-backend
  - `npm run cf-typegen`
- Cloudflare docs
  - Grab the model ID for the AI model you want to use (beta versions are free)
    - https://developers.cloudflare.com/workers-ai/models/
    - example: @cf/meta-llama/llama-2-7b-chat-hf-lora
  - In the docs, it will have example usage code for you to copy
  - Add that code to your /src/index.ts file
    - Make the function async and grab the env off the context (c variable)
    ```
    import { Hono } from 'hono'

    const app = new Hono<{ Bindings: CloudflareBindings }>()

    app.get('/', async (c) => {
      const messages = [
        { role: "system", content: "You are a friendly assistant" },
        {
          role: "user",
          content: "What is the origin of the phrase Hello, World",
        },
      ];
      const response = await c.env.AI.run("@cf/meta-llama/llama-2-7b-chat-hf-lora", { messages });

      return Response.json(response);
    })

    export default app
    ```
- 
## Cloudlare AI Gateway
- Cloudflare Dashboard -> AI -> AI Gateway -> Create Gateway -> Name it default -> Save
- Click default -> Settings tab -> Turn on Rate Limit -> Turn on Authenticated
- Create authentication token -> Name it what you want -> Copy it and save it to use late -> Finish 