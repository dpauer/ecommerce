import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Layout from "./Layouts/Layout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // FIXME: find the correct page type
        const page: any = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        );
        page.default.layout =
            page.default.layout || ((page: any) => <Layout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
