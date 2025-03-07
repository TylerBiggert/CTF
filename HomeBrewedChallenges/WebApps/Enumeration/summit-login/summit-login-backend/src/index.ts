import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Mount Builtin Middleware
app.use('*', poweredBy())
app.use('*', cors())

app.post('/api/users', async (c) => {
  const requestBodyJson = await c.req.json();
  const emailAressToCheck = requestBodyJson.email;
  if (!emailAressToCheck) {
    return c.json({ err: 'Email address is required.'}, 400);
  }

  try {
    const resultsArray: D1Result<Record<string, unknown>> = await c.env.DB1.prepare('SELECT 1 FROM users WHERE email = ? LIMIT 1').bind(emailAressToCheck).run();
    if (!resultsArray.success) {
      return c.json({ err: 'Error'}, 500);
    }
    // Someone tried to create an account when they already had one....LOL!!!
    if (resultsArray.results.length > 0) {
      return c.json({ isExistingEmail: true }, 418);
    }

    /**
     * Save user to the database after validating the request body...
     */
    return c.json({ isExistingEmail: false }, 200);
  } catch (e) {
    return c.json({ err: 'Error'}, 500);
  }
})

export default app