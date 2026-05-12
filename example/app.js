import { Router } from "../src/unchain.js";
import { Home, NotFound, Posts, Settings } from "./views.js";

const outlet = document.getElementById("outlet");

const router = new Router(
  {
    "/": {
      component: Home,
      title: "My App | Dashboard",
    },
  },
  outlet,
);

router.add("404", {
  component: NotFound,
  title: "My App | Not found",
});
router.add("posts", {
  component: Posts,
  title: "My App | Posts",
});
router.add("settings", {
  component: Settings,
  title: "My App | Settings",
});

window.location.hash = "/";
