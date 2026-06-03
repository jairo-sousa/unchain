import { Router } from "unchain";
import { routes } from "@routes";

const outlet = document.getElementById("outlet");

const router = new Router(routes, outlet);

window.location.hash = "/";
