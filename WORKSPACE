workspace(
    name = "small-repo",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive", "http_file", "http_jar")
# load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository", "new_git_repository")

http_archive(
    name = "aspect_rules_ts",
    sha256 = "fa5659a511f236b1ae6112258bff602fa20a40324b282734c841bc1e857797f3",
    strip_prefix = "rules_ts-3.5.2",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v3.5.2/rules_ts-v3.5.2.tar.gz",
)
load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")
rules_ts_dependencies(
    ts_version_from = "//rbac:package.json",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")
rules_js_dependencies()

load("@aspect_rules_js//js:toolchains.bzl", "rules_js_register_toolchains")
load("@aspect_rules_js//npm:repositories.bzl", "npm_translate_lock")

rules_js_register_toolchains()
npm_translate_lock(
    name = "npm",
    pnpm_lock = "//rbac:pnpm-lock.yaml",
)
load("@npm//:repositories.bzl", "npm_repositories")
npm_repositories()
