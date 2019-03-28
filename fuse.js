const {
    CSSPlugin, CSSResourcePlugin, SassPlugin,
    FuseBox,
    VueComponentPlugin,
    QuantumPlugin,
    WebIndexPlugin,
    Sparky,
} = require("fuse-box");

let fuse;
let isProduction = false;

Sparky.task("set-prod", () => {
    isProduction = true;
});
Sparky.task("clean", () => Sparky.src("./dist").clean("dist/"));
Sparky.task("watch-assets", () => Sparky.watch("./assets", {base: "./src"}).dest("./dist"));
Sparky.task("copy-assets", () => Sparky.src("./assets/**/**.*", {base: "./src"}).dest("./dist"));

Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "./src",
        output: "dist/$name.js",
        sourceMaps: isProduction ? {project: true, vendor: true} : {project: true, vendor: false},
        alias: {
            "@": "~",
        },
        plugins: [
            VueComponentPlugin({
                style: [
                    SassPlugin({
                        importer: true,
                    }),
                    CSSResourcePlugin(),
                    CSSPlugin({
                        group: "components.css",
                        inject: "components.css",
                    }),
                ],
            }),
            WebIndexPlugin({
                template: "./public/index.html",
            }),
            QuantumPlugin({
                ensureES5: true,
            }),
        ],
    });

    fuse.dev({
        port: 8080,
    });

    fuse.bundle("vendor").instructions("~ main.ts");
    fuse.bundle("app").instructions("> [main.ts]");
});

Sparky.task("default", ["clean", "watch-assets", "config"], () => {
    return fuse.run();
});

Sparky.task("dist", ["clean", "copy-assets", "set-prod", "config"], () => {
    return fuse.run();
});
