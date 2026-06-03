import { Router } from "unchain";
import { Home, NotFound, Settings } from "@views";
import { Posts } from "@views/posts";
import { PostForm } from "@views/post-form";

export const routes = {
  "/": {
    component: Home,
    title: "My App | Dashboard",
  },
  404: {
    component: NotFound,
    title: "My App | Not found",
  },
  posts: {
    component: Posts,
    paramComponent: PostForm,
    title: "My App | Posts",
  },
  settings: {
    component: Settings,
    title: "My App | Settings",
  },
};
