import { Agent } from "./models/agent.model";
import { AgentResponseBody } from "./models/agentResponseBody.model";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "OPTIONS") {
			return handlePreflight();
		}

		const url = new URL(request.url);
		if (url.pathname.startsWith("/api/agents")) {
			return handleAgentsRequest(env, request, url);
		}

		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;

  
  async function handleAgentsRequest(env: Env, request: Request<unknown, IncomingRequestCfProperties<unknown>>, url: URL) {
	const agencyNumber = url.searchParams.get("agencyNumber");
	let sqlString = "SELECT FULL_NAME, SSN, AGENCY_NUMBER FROM AGENTS_V WHERE AGENCY_NUMBER = '" + agencyNumber + "' order by FULL_NAME";
	
	// TODO - Not sure how to set a database to Read Only yet on Cloudflare yet...
	const denyKeywordList = ['DELETE', 'INSERT', 'UPDATE', 'REPLACE', 'CREATE', 'ALTER', 'DROP', 'RENAME', 'ADD', 'INDEX', 'REINDEX', 'BEGIN', 'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'RELEASE', 'VACUUM', 'ATTACH', 'DETACH', 'PRAGMA', 'TRIGGER'];
	denyKeywordList.forEach(wordThatIsNotAllowed => {
		if (sqlString.toUpperCase().includes(wordThatIsNotAllowed)) {
			const responseBody: AgentResponseBody = new AgentResponseBody({errorMessage: 'Table manipulation is not the answer. Please only do SELECT queries.'});
			return new Response(JSON.stringify(responseBody));
		}
	});

	let result;
	try {
		result = await env.DATABASE_ID.prepare(sqlString).all();
	} catch (e) {
		const err = e instanceof Error ? e.message : "Unable to run the query.";
		const responseBody: AgentResponseBody = new AgentResponseBody({sqlThatRan: sqlString, errorMessage: err});
		return new Response(JSON.stringify(responseBody), {
			headers: getCORSHeaders()
		});
	}

	try {
		const agentsArray = Array.isArray(result.results) ? result.results as { FULL_NAME: string, SSN: number, AGENCY_NUMBER: number }[] : [];
		const responseBody: AgentResponseBody = new AgentResponseBody({agents: agentsArray, sqlThatRan: sqlString});
		return new Response(JSON.stringify(responseBody), {
			headers: getCORSHeaders()
		});
	} catch (e) {
		const err = e instanceof Error ? e.message : "Unable to parse result set into an Agent array.";
		const responseBody: AgentResponseBody = new AgentResponseBody({sqlThatRan: sqlString, errorMessage: err});
		return new Response(JSON.stringify(responseBody), {
			headers: getCORSHeaders()
		});
	}
  }
  
  function handlePreflight() {
	return new Response(null, {
	  headers: getCORSHeaders()
	});
  }
  
  function getCORSHeaders() {
	return {
	  "Content-Type": "application/json",
	  "Access-Control-Allow-Origin": "https://challenge-summit-demo.summit-ssn-frontend.pages.dev",
	  "Access-Control-Allow-Headers": "Content-Type",
	};
  }
  