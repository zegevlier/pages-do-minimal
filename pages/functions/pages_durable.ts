import { DurableObjectNamespace } from "@cloudflare/workers-types";

interface Env {
    HELLO_DURABLE: DurableObjectNamespace;
}

export const onRequestGet = async (context) => {
    const id = context.env.HELLO_DURABLE.newUniqueId();
    const stub = context.env.HELLO_DURABLE.get(id);

    // This code does work:
    const response = await stub.fetch("http://do.fake/");
    // This code does not work:
    // const response = await stub.fetch("https://do.fake/");

    const text = await response.text();
    return new Response(text);
}
