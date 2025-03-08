

# Example Uses
https://github.com/honojs/examples/blob/main/basic/src/index.ts



# Database binding
- Cloudflare website -> Storage & Databases -> D1 SQL Database -> Create button
- Name: `repo-name-here-database` -> Create
- Create Table button
  - Table Name: comments
  - Column name: id, Type: integer
- Create -> ... menu -> Add data -> Add a couple rows of data
### Connect the Database to the Worker/API
- Cloudflare website
  - Storage & Databases -> D1 SQL Database
  - Copy the ID of the database
- Open the repo-name-here-backed project in Visual Studio code
- `wrangler.jsonc` file
```
  ,"d1_databases": [
    {
      "binding": "DB",
      "database_name": "PASE_COPIED_DATABSE_NAME_HERE",
      "database_id": "PASTE_COPIED_DATABASE_ID_HERE"
    }
  ]
```
- Terminal -> cd to project root /repo-name-here-backend run `npm run cf-typegen`
  - This will update the Env interface so you have access to c.env.database_id
- Back in Visual Studio code open /repo-name-here-backend/src/index.ts
- Update the fetch() to make a database call to the comments table we made earlier

SummitCTF{M3ss4Ges_H4v3_Mean1ng5}
# Secrets
- `npx wranger secret put SECTET_NAME_HERE` -> enter -> add the value
- `npm run cf-typegen`
- Create a .dev.vars file in the root
  - SECRET_NAME_HERE="secret text here"
- Use the secret's value with c.env.SECRET_NAME_HERE

# Local Host Debugging
- Start server with `npm run dev`
- `b` to open a browser and also `d` to open the debugger
  - This will have the source map
  - navigate to index.ts and set your debugger breakpoint there
- Send requests
  - Use VSC extension
  - http instead of https

# Cors
- `app.use('*', cors())`