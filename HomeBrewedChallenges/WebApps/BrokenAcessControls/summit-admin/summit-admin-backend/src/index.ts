export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "OPTIONS") {
			return handlePreflight();
		}

		const url = new URL(request.url);

		// The /api/auth endpoint will always return false in the response body
		if (url.pathname.startsWith("/api/auth")) {
			return new Response(JSON.stringify({isAuthorizedToFlag: false}), {
				headers: getCORSHeaders()
			});
		}

		if (url.pathname.startsWith("/api/flag")) {
			return handleFlagTextRequest(env, request, url);
		}

		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;

  
async function handleFlagTextRequest(env: Env, request: Request<unknown, IncomingRequestCfProperties<unknown>>, url: URL) {
	const secretPassedInTheRequest = request.headers.get('x-api-key') ?? '';
	if (!secretPassedInTheRequest) {
		const responseBody = {flagText: '', errorMessage: 'Not authorized to this endpoint.'};
		return new Response(JSON.stringify(responseBody), {
			headers: getCORSHeaders()
		});
	}

	const secretRetrievedFromEnvironment = env.shared_secret_for_requests;
	if (secretPassedInTheRequest === secretRetrievedFromEnvironment) {
		const responseBody = {flagText: env.flag_text, errorMessage: ''};
		return new Response(JSON.stringify(responseBody), {
			headers: getCORSHeaders()
		});
	} else {
		const responseBody = {flagText: '', errorMessage: 'Not authorized to this endpoint.'};
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
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, x-api-key",
	};
}
