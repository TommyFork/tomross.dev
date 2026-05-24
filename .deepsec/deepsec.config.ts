import { defineConfig } from "deepsec/config";

export default defineConfig({
  projects: [
    { id: "tomross-dev", root: ".." },
    // <deepsec:projects-insert-above>
  ],
});
