workspace(
    name = "small-repo",
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

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "bazel_features",
    sha256 = "d852f389ce8db8b8c2f9807a4faf065b0d0ba302163898cd2428b6ca7d086681",
    strip_prefix = "bazel_features-1.29.0",
    url = "https://github.com/bazel-contrib/bazel_features/releases/download/v1.29.0/bazel_features-v1.29.0.tar.gz",
)
load("@bazel_features//:deps.bzl", "bazel_features_deps")
bazel_features_deps()

http_archive(
    name = "io_bazel_stardoc",
    sha256 = "ca933f39f2a6e0ad392fa91fd662545afcbd36c05c62365538385d35a0323096",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/stardoc/releases/download/0.8.0/stardoc-0.8.0.tar.gz",
        "https://github.com/bazelbuild/stardoc/releases/download/0.8.0/stardoc-0.8.0.tar.gz",
    ],
)

load("@io_bazel_stardoc//:setup.bzl", "stardoc_repositories")

stardoc_repositories()

load("@io_bazel_stardoc//:deps.bzl", "stardoc_external_deps")

stardoc_external_deps()

http_archive(
    name = "rules_shell",
    sha256 = "3e114424a5c7e4fd43e0133cc6ecdfe54e45ae8affa14fadd839f29901424043",
    strip_prefix = "rules_shell-0.4.0",
    url = "https://github.com/bazelbuild/rules_shell/releases/download/v0.4.0/rules_shell-v0.4.0.tar.gz",
)

load("@rules_shell//shell:repositories.bzl", "rules_shell_dependencies", "rules_shell_toolchains")
rules_shell_dependencies()
rules_shell_toolchains()

http_archive(
    name = "buildifier_prebuilt",
    sha256 = "bf9101bd5d657046674167986a18d44c5612e417194dc55aff8ca174344de031",
    strip_prefix = "buildifier-prebuilt-8.0.3",
    urls = [
        "http://github.com/keith/buildifier-prebuilt/archive/8.0.3.tar.gz",
    ],
)

load("@buildifier_prebuilt//:deps.bzl", "buildifier_prebuilt_deps")

buildifier_prebuilt_deps()

load("@buildifier_prebuilt//:defs.bzl", "buildifier_prebuilt_register_toolchains")

buildifier_prebuilt_register_toolchains()

http_archive(
    name = "com_google_protobuf",
    strip_prefix = "protobuf-29.3",
    sha256 = "PTKUDpdcStm4umlkDnj1UnB1uuM8ookCdb8muFPAliw=",
    urls = [
            "https://github.com/protocolbuffers/protobuf/releases/download/v29.3/protobuf-29.3.tar.gz",
        ],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

http_archive(
    name = "rules_proto",
    sha256 = "14a225870ab4e91869652cfd69ef2028277fc1dc4910d65d353b62d6e0ae21f4",
    strip_prefix = "rules_proto-7.1.0",
    url = "https://github.com/bazelbuild/rules_proto/releases/download/7.1.0/rules_proto-7.1.0.tar.gz",
)

load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies")
rules_proto_dependencies()

load("@rules_proto//proto:toolchains.bzl", "rules_proto_toolchains")
rules_proto_toolchains()

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "f2d15bea3e241aa0e3a90fb17a82e6a8ab12214789f6aeddd53b8d04316d2b7c",
    urls = [
        "https://mirror.bazel.build/github.com/bazel-contrib/rules_go/releases/download/v0.54.0/rules_go-v0.54.0.zip",
        "https://github.com/bazel-contrib/rules_go/releases/download/v0.54.0/rules_go-v0.54.0.zip",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()

# we need to load both new and old rules_nodejs as the old one is incompatible with rules_js, and new one is incompatible with cubejs
http_archive(
    name = "rules_nodejs",
    sha256 = "b361863788b15d9d0cebf6803c22e8d1afa689a0eefef96dec46bcce30527090",
    strip_prefix = "rules_nodejs-6.3.4",
    url = "https://github.com/bazel-contrib/rules_nodejs/releases/download/v6.3.4/rules_nodejs-v6.3.4.tar.gz",
)
# http_archive(
#     name = "build_bazel_rules_nodejs",
#     sha256 = "e79c08a488cc5ac40981987d862c7320cee8741122a2649e9b08e850b6f20442",
#     urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/3.8.0/rules_nodejs-3.8.0.tar.gz"],
# )

# # rules_js (dependencies: https://registry.build/github/aspect-build/rules_ts/)
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
    ts_version_from = "//:package.json",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")
rules_js_dependencies()

load("@aspect_rules_js//js:toolchains.bzl", "rules_js_register_toolchains")
load("@aspect_rules_js//npm:repositories.bzl", "npm_translate_lock")

rules_js_register_toolchains()
npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
)
load("@npm//:repositories.bzl", "npm_repositories")
npm_repositories()
