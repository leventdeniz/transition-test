import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('routes/layout.tsx', [
    index("routes/home.tsx"),
    route("/input", "routes/input.tsx"),
    route("/result", "routes/result.tsx"),
    route("/tds", "routes/tds.tsx"),
  ])
] satisfies RouteConfig;
