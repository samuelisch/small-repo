workspace(
    name = "ntropy",
)


########################################################################
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive", "http_file", "http_jar")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository", "new_git_repository")


########################################################################
# Skylib is required
http_archive(
    name = "bazel_skylib",
    sha256 = "bc283cdfcd526a52c3201279cda4bc298652efa898b10b4db0837dc51652756f",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.7.1/bazel-skylib-1.7.1.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.7.1/bazel-skylib-1.7.1.tar.gz",
    ],
)
load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
bazel_skylib_workspace()

########################################################################
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "platforms",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/platforms/releases/download/0.0.11/platforms-0.0.11.tar.gz",
        "https://github.com/bazelbuild/platforms/releases/download/0.0.11/platforms-0.0.11.tar.gz",
    ],
    sha256 = "29742e87275809b5e598dc2f04d86960cc7a55b3067d97221c9abbc9926bff0f",
)

########################################################################
http_archive(
    name = "rules_pkg",
    urls = [
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.10.1/rules_pkg-0.10.1.tar.gz",
    ],
    sha256 = "d250924a2ecc5176808fc4c25d5cf5e9e79e6346d79d5ab1c493e289e722d1d0",
)
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")
# Rules pkg depends on
# skylib
# platforms
# rules_python
# rules_license
# So, make sure to invoke the dependencies call after the above are defined (if we use them directly)
rules_pkg_dependencies()


########################################################################

# aspect_bazel_lib start
http_archive(
    name = "aspect_bazel_lib",
    sha256 = "40ba9d0f62deac87195723f0f891a9803a7b720d7b89206981ca5570ef9df15b",
    strip_prefix = "bazel-lib-2.14.0",
    url = "https://github.com/bazel-contrib/bazel-lib/releases/download/v2.14.0/bazel-lib-v2.14.0.tar.gz",
)

load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies", "aspect_bazel_lib_register_toolchains", "register_coreutils_toolchains")
aspect_bazel_lib_dependencies()
aspect_bazel_lib_register_toolchains()
register_coreutils_toolchains()
# aspect_bazel_lib end

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "08c3cd71857d58af3cda759112437d9e63339ac9c6e0042add43f4d94caf632d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.24.2/rules_go-v0.24.2.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()

# multirun is written in Go and hence needs rules_go to be built.
# See https://github.com/bazelbuild/rules_go for the up to date setup instructions.
git_repository(
    name = "com_github_atlassian_bazel_tools",
    commit = "a8706cd7b818c8f55e9304745693e874c64e4cb1",
    remote = "https://github.com/atlassian/bazel-tools.git",
)
load("@com_github_atlassian_bazel_tools//multirun:deps.bzl", "multirun_dependencies")
multirun_dependencies()


# THESE ARE DEPRECATED
# the build ruls for git repo are kept under the /external directory
new_git_repository(
    name = "pyhive",
    build_file = "BUILD.pyhive",
    commit = "101f0e67e9c4feea10478295d9b5f4fa70600fac",
    remote = "https://github.com/6si/PyHive.git",
)

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "4349f2b0b45c860dd2ffe18802e9f79183806af93ce5921fb12cbd6c07ab69a8",
    strip_prefix = "rules_docker-0.21.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.21.0/rules_docker-v0.21.0.tar.gz"],
)

# we need to load both new and old rules_nodejs as the old one is incompatible with rules_js, and new one is incompatible with cubejs
http_archive(
    name = "rules_nodejs",
    sha256 = "b361863788b15d9d0cebf6803c22e8d1afa689a0eefef96dec46bcce30527090",
    strip_prefix = "rules_nodejs-6.3.4",
    url = "https://github.com/bazel-contrib/rules_nodejs/releases/download/v6.3.4/rules_nodejs-v6.3.4.tar.gz",
)
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "e79c08a488cc5ac40981987d862c7320cee8741122a2649e9b08e850b6f20442",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.8.0/rules_nodejs-3.8.0.tar.gz"],
)

# rules_js (dependencies: https://registry.build/github/aspect-build/rules_ts/)
http_archive(
    name = "aspect_rules_js",
    sha256 = "1be1a3ec3d3baec4a71bc09ce446eb59bb48ae31af63016481df1532a0d81aee",
    strip_prefix = "rules_js-2.3.5",
    url = "https://github.com/aspect-build/rules_js/releases/download/v2.3.5/rules_js-v2.3.5.tar.gz",
)
http_archive(
    name = "aspect_rules_ts",
    sha256 = "fa5659a511f236b1ae6112258bff602fa20a40324b282734c841bc1e857797f3",
    strip_prefix = "rules_ts-3.5.2",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v3.5.2/rules_ts-v3.5.2.tar.gz",
)
load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")
rules_ts_dependencies(
    ts_version_from = "//sixsense-js/packages/rbac:package.json",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")
rules_js_dependencies()

load("@aspect_rules_js//js:toolchains.bzl", "rules_js_register_toolchains")
load("@aspect_rules_js//npm:repositories.bzl", "npm_translate_lock")

rules_js_register_toolchains()
npm_translate_lock(
    name = "npm",
    pnpm_lock = "//sixsense-js/packages/rbac:pnpm-lock.yaml",
)
load("@npm//:repositories.bzl", "npm_repositories")
npm_repositories()

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install", "node_repositories")
node_repositories(
    package_json = ["//services/cubejs:package.json"],
    node_version = "20.18.0",
    node_repositories = {
        "20.18.0-darwin_amd64": ("node-v20.18.0-darwin-x64.tar.gz", "node-v20.18.0-darwin-x64", "c02aa7560612a4e2cc359fd89fae7aedde370c06db621f2040a4a9f830a125dc"),
        "20.18.0-linux_amd64": ("node-v20.18.0-linux-x64.tar.xz", "node-v20.18.0-linux-x64", "4543670b589593f8fa5f106111fd5139081da42bb165a9239f05195e405f240a"),
        "20.18.0-windows_amd64": ("node-v20.18.0-win-x64.zip", "node-v20.18.0-win-x64", "f5cea43414cc33024bbe5867f208d1c9c915d6a38e92abeee07ed9e563662297"),
    },
    node_urls = ["https://nodejs.org/dist/v{version}/{filename}"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)
container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")
container_deps()

http_archive(
    name = "rules_proto",
    sha256 = "602e7161d9195e50246177e7c55b2f39950a9cf7366f74ed5f22fd45750cd208",
    strip_prefix = "rules_proto-97d8af4dc474595af3900dd85cb3a29ad28cc313",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_proto/archive/97d8af4dc474595af3900dd85cb3a29ad28cc313.tar.gz",
        "https://github.com/bazelbuild/rules_proto/archive/97d8af4dc474595af3900dd85cb3a29ad28cc313.tar.gz",
    ],
)

load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")

rules_proto_dependencies()
rules_proto_toolchains()
