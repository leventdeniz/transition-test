import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('routes/layout.tsx', [
    index("routes/home.tsx"),
    route("/page1", "routes/page1.tsx"),
    route("/page2", "routes/page2.tsx"),
    route("/page3", "routes/page3.tsx"),
  ])
] satisfies RouteConfig;
