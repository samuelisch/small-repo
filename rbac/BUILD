load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
# load("@aspect_rules_js//js:defs.bzl", "js_library")

# npm_link_all_packages(name = "node_modules")

ts_project(
    name = "tsc",
    srcs = glob([
        "src/**",
        "tsconfig.json",
    ]),
    declaration = True,
    validate = False,
    transpiler = 'tsc',
    tsconfig = "tsconfig.json",
    out_dir = "lib",
)

genrule(
    name = "debug-tsc",
    srcs = glob([
        "src/**",
        "tsconfig.json",
    ]),
    outs = ["debug.txt"],
    # This command runs inside the sandbox CWD (execroot/small-repo)
    cmd = """
        echo "--- Current Directory: $$(pwd) ---" > $@
        echo "\n--- Listing CWD Contents ---" >> $@
        ls -la >> $@
        echo "\n--- Listing ./rbac/ ---" >> $@
        ls -la ./rbac >> $@ || echo "*** ./rbac/ directory not found ***" >> $@
        echo "\n--- Listing ./rbac/tsconfig.json ---" >> $@
        ls -la ./rbac/tsconfig.json >> $@ || echo "*** ./rbac/tsconfig.json not found ***" >> $@
        echo "\n--- Done ---" >> $@
    """,
)

# js_library(
#     name = "rbac",
#     srcs = ["package.json"],
#     visibility = ["//visibility:public"],
#     deps = [":tsc"],
# )

# OLD RULES DONT TOUCH
# filegroup(
#     name = "javascript",
#     srcs = glob(
#         [
#             "src/**",
#             "*.ts",
#             "*.js",
#             "*.json",
#             "pnpm-lock.yaml",
#             "source-hash.txt",
#         ],
#         exclude=[
#             "**/*.tgz",      # avoid pulling yarn-generated 'sixsense-core-*.tgz' into sources
#         ]
#     )
# )

# genrule(
#     name = "rbac",
#     message = "Building sixsense-js rbac static files",
#     srcs = [
#         ":javascript",
#     ],
#     outs = [
#         "rbac-version.txt",
#     ],
#     tags = ["no-cache"],
#     cmd = "cd sixsense-js/packages/rbac"
#         + "&& find ~/.cache/pnpm/ -name '*sixsense-rbac*' -exec rm -rf {} \\; || echo rbac cache does not exists"
#         + "&& echo 'Installing @sixsense/rbac dependencies'"
#         + "&& pnpm install --frozen-lockfile"
#         + "&& echo 'Successfully installed @sixsense/rbac dependencies'"
#         + "&& echo 'Building rbac files'"
#         + "&& pnpm build"
#         + "&& cp source-hash.txt ../../../$(@D)/rbac-version.txt"
# )

# genrule(
#     name = "test-source-hash",
#     message = "Testing the source-hash.txt file is up to date",
#     srcs = [
#         ":javascript",
#     ],
#     outs = [
#         "test-commit-log.txt",
#     ],
#     cmd = "cd sixsense-js/packages/rbac"
#         + "&& pnpm write-source-hash > test-commit-log.txt"
#         + "&& git diff --exit-code source-hash.txt || (echo ---------------------------"
#         + "&& echo 'source-hash.txt out of date. Please run `pnpm write-source-hash` and commit the updated `source-hash.txt` file'."
#         + "&& echo ---------------------------"
#         + "&& exit 1)"
#         + "&& mv test-commit-log.txt ../../../$(location test-commit-log.txt)",
# )
