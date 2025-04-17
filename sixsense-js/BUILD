package(default_visibility = ["//visibility:public"])

filegroup(
    name = "javascript",
    srcs = glob(
        [
            "src/**",
            "*.js",
            "*.json"
        ],
        exclude=[
            "**/*.tgz",      # avoid pulling yarn-generated 'sixsense-js.tgz' into sources
        ]
    )
)

genrule(
    name = "build-static",
    message = "Build sixsense-js static files",
    outs = [
        "sixsense-js_collectstatic.log"
    ],
    srcs = [
        ":javascript"
    ],
    tags = ["no-cache"],
    cmd = "cd sixsense-js"
    + "&& find ~/.cache/yarn/v6/ -name '*sixsense-js*' -exec rm -rf {} \\; || echo sixsense-js does not exists"
    + "&& yarn install --check-files --mutex network >> ../$(location sixsense-js_collectstatic.log)"
    + "&& npm run build || exit 1 >> ../$(location sixsense-js_collectstatic.log)"
)

genrule(
    name = "static",
    message = "Pack sixsense-js static files",
    outs = [
        "sixsense-js.tgz"
    ],
    srcs = [
        ":build-static"
    ],
    tags = ["no-cache"],
    cmd = "cd sixsense-js"
    + "&& npm run pack"
    + "&& mv sixsense-js-*.tgz ../$@"
)
