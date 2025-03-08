import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
import { sign } from 'hono/jwt'

const app = new Hono<{ Bindings: CloudflareBindings }>()

// Mount Builtin Middleware
app.use('*', poweredBy())
app.use('*', cors())

// Validate JWT inside Authorization header for every request to /api/secured/*
app.use('/api/secured/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  })
  return jwtMiddleware(c, next)
})

app.get('/api/secured/flag', (c) => {
  const flagText = c.env.FLAG_TEXT;
  if (flagText) {
    return c.json({returnText: c.env.FLAG_TEXT}, 200);
  }

  return c.json({returnText: 'Sorry, this challenge is broken. Please message the creator to fix this.'}, 500);
});

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
});

app.post('/api/users/login', async (c) => {
  const requestBodyJson = await c.req.json();
  const emailAressToCheck = requestBodyJson.email;
  const passwordToCheck = requestBodyJson.password;
  if (!emailAressToCheck || !passwordToCheck) {
    return c.json({ isLoginSuccessful: false, jwt_token: '' }, 401);
  }

  try {
    const result: D1Result<Record<string, unknown>> = await c.env.DB1.prepare('SELECT uuid FROM users WHERE email = ? and password = ? LIMIT 1').bind(emailAressToCheck, passwordToCheck).run();
    if (result.success && result.results.length == 1) {
      const webUserUUID = result.results[0].uuid;
      if (webUserUUID) {
        const payload = {
          email: emailAressToCheck,
          webUserUUID: webUserUUID,
          exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        }
        const secret = c.env.JWT_SECRET;
        const newlyCreatedToken = await sign(payload, secret)
        if (newlyCreatedToken) {
          return c.json({ isLoginSuccessful: true, jwt_token: newlyCreatedToken }, 200);
        }
      }
    }
  } catch (e) {
    //
  }
  
  return c.json({ isLoginSuccessful: false, jwt_token: '' }, 401);
});

export default app