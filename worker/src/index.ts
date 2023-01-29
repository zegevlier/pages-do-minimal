export { HelloDurable } from "./hello_durable";

export interface Env {
	HELLO_DURABLE: DurableObjectNamespace;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname.slice(1);
		if (path === "hello_durable") {
			const id = env.HELLO_DURABLE.newUniqueId();
			const stub = env.HELLO_DURABLE.get(id);
			const response = await stub.fetch("https://do.fake/");
			const text = await response.text();
			return new Response(text);
		}
		return new Response("Hello from Worker!");
	},
};
