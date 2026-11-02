// serkandurusoy.com
//
// Static site served from ./public by Workers static assets. This tiny Worker
// runs in front of the assets (run_worker_first) to handle the hostnames that
// are not the canonical site:
//   - www.serkandurusoy.com      -> 301 to https://serkandurusoy.com (path kept)
//   - mta-sts.serkandurusoy.com  -> serves only /.well-known/mta-sts.txt
// Everything else is handed to the assets binding unchanged.

const APEX = "serkandurusoy.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${APEX}`) {
      url.hostname = APEX;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    if (url.hostname === `mta-sts.${APEX}`) {
      if (url.pathname === "/.well-known/mta-sts.txt") {
        return env.ASSETS.fetch(new URL(url.pathname, `https://${APEX}`));
      }
      return new Response("Not found", { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
