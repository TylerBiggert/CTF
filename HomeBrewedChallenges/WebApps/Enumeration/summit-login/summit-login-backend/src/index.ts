import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { sign } from 'hono/jwt'

const app = new Hono<{ Bindings: CloudflareBindings }>()

/**
 * Not sure what this is for yet, but they used it in the Hono docs
 */
app.use('*', poweredBy())

/**
 * This is only needed until I figure out how to use Cloudflare Functions
 * The frontend and backend run on different servers/origins, so to share resources we need to setup CORS
 */
app.use(
  '*',
  cors({
    origin: ['http://localhost:8788', 'https://summit-login.pages.dev'],
    allowHeaders: [],
    allowMethods: [],
    exposeHeaders: [],
    maxAge: 600
  })
)

/**
 * Hono Middleware
 * Validates the JWT inside Authorization header for every request to /api/secured/*
 */
app.use('/api/secured/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  })
  return jwtMiddleware(c, next)
})

/**
 * Simulates creating a new user
 * Used within the User Profile
 */
app.post('/api/users', async (c) => {
  // Make sure the required field is present
  const requestBodyJson = await c.req.json();
  const emailAressToCheck = requestBodyJson.email;
  if (!emailAressToCheck) {
    return c.json({ err: 'Email address is required.'}, 400);
  }

  try {
    // Make sure the account the user is registering doesnt already exist.
    const resultsArray: D1Result<Record<string, unknown>> = await c.env.DB1.prepare('SELECT 1 FROM users WHERE email = ? LIMIT 1').bind(emailAressToCheck).run();
    if (!resultsArray.success) {
      return c.json({ err: 'Error'}, 500);
    } else if (resultsArray.results.length > 0) {
      // Prevent duplicate user creation
      return c.json({ isExistingEmail: true }, 418);
    }

    //
    //
    //  Logic regarding creating and inserting the new user would go here
    //
    //

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

/**
 * Flag to simulate an endpoint containing sensitive data normally restricted to a logged in user
 */
app.get('/api/secured/flag', (c) => {
  const flagText = c.env.FLAG_TEXT;
  if (flagText) {
    return c.json({returnText: c.env.FLAG_TEXT}, 200);
  }

  // Should never happen, unless the environment variable did not load properly..check the bindings and type
  return c.json({returnText: 'Sorry, this challenge is broken. Please message the creator to fix this.'}, 500);
});

export default app