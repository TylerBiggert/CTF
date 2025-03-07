# Secrets
- `npx wranger secret put SECTET_NAME_HERE` -> enter -> add the value
- `npm run cf-typegen`
- Create a .dev.vars file in the root
  - SECRET_NAME_HERE="secret text here"
- Use the secret's value with c.env.SECRET_NAME_HERE

# Local Host Debugging
- Start server with `npm run dev`
- `b` to open a browser
- `d` to open the debugger
  - This will have the source map
  - navigate to index.ts and set your debugger breakpoint there
- Send requests
  - Use VSC extension
  - http instead of https