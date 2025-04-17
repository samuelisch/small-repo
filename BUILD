load("@com_github_atlassian_bazel_tools//multirun:def.bzl", "multirun", "command")


load("//build_tools/bazel:deps.bzl",
     "RULES_JAVA_BUILD_TARGETS",
     "RULES_JAVA_TEST_TARGETS",
     "ASPECT_SERVICES_BUILD_TARGETS",
     "ASPECT_SERVICES_TEST_TARGETS",
     "ASPECT_SERVICES_IMAGE_TARGETS",
     "ASPECT_SERVICES_PUSH_TARGETS",
     "ASPECT_SERVICES_PUSH_TARGETS_DEVELOP",
     "ASPECT_SERVICES_STATIC_TARGETS",
     "MAIN_SERVICE_TARGETS",
     "PYTHON_SERVICE_TARGETS",
     "PYTHON_SERVICES_STATIC_TARGETS",
     "DOCKER_IMAGE_TARGETS",
     "DOCKER_PUSH_TARGETS",
     "FRONTEND_PUSH_TARGETS",
     "OCI_IMAGE_TARGETS",
     "WALDO_IMAGE_TARGETS",
     "OCI_PUSH_TARGETS",
     "WALDO_PUSH_TARGETS",
     "TEST_TARGETS",
     "SWAGGER_TESTS",
)

multirun(
    name = "push_all_jammy",
    commands = DOCKER_PUSH_TARGETS,
    parallel = True,
)

multirun(
    name = "push_all_oci",
    commands = OCI_PUSH_TARGETS + WALDO_PUSH_TARGETS,
    parallel = True,
)

multirun(
    name = "docker_all_jammy",
    commands = DOCKER_IMAGE_TARGETS,
    parallel = False,
)

multirun(
    name = "frontend_docker_push_all_jammy",
    commands = FRONTEND_PUSH_TARGETS,
    parallel = True,
)

genrule(
    name = "build_all_oci",
    srcs = OCI_IMAGE_TARGETS
         + WALDO_IMAGE_TARGETS
         ,
    outs = [
        "build-all-oci.txt"
    ],
    cmd = "echo done > $@"
)

genrule(
    name = "build_non_waldo_oci",
    srcs = OCI_IMAGE_TARGETS
         ,
    outs = [
        "build-non-waldo-oci.txt"
    ],
    cmd = "echo done > $@"
)

# All the tests any good developer should run
# before checking in.
test_suite(
    name = "local_jammy",
    tests = TEST_TARGETS + SWAGGER_TESTS,
)

genrule(
    name = "static_jammy",
    srcs = PYTHON_SERVICES_STATIC_TARGETS,
    outs = [
        "static-build-jammy.txt"
    ],
    tags = ["manual", "static", "no-cache"],
    cmd = "echo done > $@"
)

genrule(
    name = "main_jammy",
    srcs = [":java"] + MAIN_SERVICE_TARGETS + PYTHON_SERVICE_TARGETS,
    outs = [
        "main-build-jammy.txt"
    ],
    tags = ["manual", "main", "no-cache"],
    cmd = "echo done > $@"
)

exports_files([".commit"])

sh_test(
    name = "docker-init-jammy-test",
    srcs = ["docker-init-test.sh"],
    data = [
        "//services:init_jammy"
    ],
    tags = [
        "manual"
    ],
    size = "small"
)

sh_test(
    name = "docker-pigtail-test",
    srcs = ["docker-pigtail-test.sh"],
    data = [
        "//services/pigtail:docker"
    ],
    tags = [
        "manual"
    ],
    size = "small"
)

sh_test(
    name = "docker-pigtailv3-test",
    srcs = ["docker-pigtailv3-test.sh"],
    data = [
        "//services/pigtailv3:docker"
    ],
    tags = [
        "manual"
    ],
    size = "small"
)

sh_test(
    name = "docker-rtsapi-test",
    srcs = ["docker-rtsapi-test.sh"],
    data = [
        "//services/rtsapi:rtsapi"
    ],
    tags = [
        "manual"
    ],
    size = "small"
)


test_suite(
    name  = "docker-tests-jammy",
    tests = [
        "//pipeline_jobs_images/jobs:docker-jobs-test",
        "//pipeline_jobs_images/spark:docker-spark-test",
        "//zeniq-backend:docker-zenbackend-test",
        "docker-pigtailv3-test",
        "docker-pigtail-test",
        "//pipeline_jobs_images/spark3:docker-spark3-test",
    ],
    tags = [
        "manual"
    ],
)

filegroup(
    name="core-pom",
    srcs=glob(
      [
          "pom.xml",
          "java-libs-v2/pom.xml"
      ]
    )
)

genrule(
    name="install-core-pom",
    visibility=["//visibility:public"],
    srcs=[
        "core-pom",
        "//config/mvn:settings"
    ],
    outs=[
        "java.log",
    ],
    cmd = "touch $(@D)/java.log"
        + "&& mvn install:install-file -Dpackaging=pom -Dfile=pom.xml -DpomFile=pom.xml -q --settings $(location //config/mvn:settings)"
        + "&& cd java-libs-v2"
        + "&& mvn install:install-file -Dpackaging=pom -Dfile=pom.xml -DpomFile=pom.xml -q --settings ../$(location //config/mvn:settings)",
    tags = ["no-cache"],

)

genrule(
    name="java",
    message="Building java projects",
    visibility = ["//visibility:public"],
    srcs=[
        "//antlr:build-antlr-jar",
        "//export:build-export-jar",
        "//fileingest:build-fileingest-jar",
        "//h6o:build-h6o-jar",
        "//hive:build-hive-jar",
        "//java-modules-v2/hbase:build-hbase-jar",
        "//java-modules-v2/sales-integration-syncs:build-sales-integration-syncs-jar",
        "//java-modules-v2/orchestration-metrics:build-orchestration-metrics-jar",
        "//java-modules-v2/exports-v2:build-exports-v2-jar",
        "//java-modules-v2/orchestration-jobs/workflow-score-exports:build-workflow-score-exports-jar",
        "//java-modules-v2:build-zoominfo-processing-jar",
        "//java-modules-v2/integrations-auth-util:integrations-auth-util.jar",
        "//java-modules-v2/egress-batch-exports:build-egress-batch-export-jar",
        "//java-scripts-v2/range-lookup-creator:build-range-lookup-creator-jar",
        "//java-scripts-v2/spark-agg-exec:build-spark-agg-exec-jar",
        "//java-scripts-v2/ingestion-pipeline-metrics:build-ingestion-pipeline-metrics-jar",
        "//jdbi:build-jdbi-jar",
        "//libs:build-libs-jar",
        "//mr:build-mr-jar",
        "//nsync:build-nsync-jar",
        "//services/integration-backend/rti-raw-stream-processor:build-rti-raw-stream-processor-jar",
        "//services/integration-backend/rtingestion-snapshot-processor:build-rtingestion-snapshot-processor-jar",
        "//services/integration-backend/rt-std-processor:build-rt-std-processor-jar",
        "//nsyncapi:build-nsyncapi-jar",
        "//orc:build-orc-jar",
        "//rts/rts-app:build-rts-app-jar",
        "//services/api:build-api-jar",
        "//udfs:build-udfs-jar",
        "//trino-querylogger:build-jar",
        "//trino-custom-s3-credentials-provider:build-jar",
        "//presto-udfs:build-presto-udfs-jar",
        "//zeniq-backend:build-core-jar",
        "//services/zeta:build-zeta-jar",
        "//services/rtsapi:build-rtsapi-jar",
        "//services/roscoe:build-roscoe-jar",
        "//services/orchestration-backend:java",
        "//java-modules-v2/orchestration-jobs:java",
    ],
    outs=[
        # todo: identify all jars here
        "jars/api-0.1.jar",
        "jars/udfs-0.1-jar-with-dependencies.jar",
        "jars/udfs-0.1-hive3-jar-with-dependencies.jar",
        "jars/presto-udfs-0.1-jar-with-dependencies.jar",
        "jars/trino-querylogger-0.1-jar-with-dependencies.jar",
        "jars/trino-custom-s3-credentials-provider-0.1.jar",
        "jars/mr-0.1-jar-with-dependencies.jar",
        "jars/nsync-0.1.jar",
        "jars/rti-raw-stream-processor-0.1.jar",
        "jars/rtingestion-snapshot-processor-0.1.jar",
        "jars/rt-std-processor-0.1.jar",
        "jars/nsyncapi-0.1.jar",
        "jars/h6o-0.1.jar",
        "jars/fileingest-0.1-jar-with-dependencies.jar",
        "jars/export-0.1-jar-with-dependencies.jar",
        "jars/orc-0.1-jar-with-dependencies.jar",
        "jars/hive-0.1-jar-with-dependencies.jar",
        "jars/sales-integration-syncs-0.1-jar-with-dependencies.jar",
        "jars/orchestration-metrics-0.1-jar-with-dependencies.jar",
        "jars/exports-v2-0.1-jar-with-dependencies.jar",
        "jars/workflow-score-exports-0.1-jar-with-dependencies.jar",
        "jars/zoominfo-processing-0.1-jar-with-dependencies.jar",
        "jars/zenbackend.jar",
        "jars/rts-app.jar",
        "jars/hbase-0.1-jar-with-dependencies.jar",
        "jars/integrations-auth-util.jar",
        "jars/range-lookup-creator-0.1-jar-with-dependencies.jar",
        "jars/spark-agg-exec-0.1-jar-with-dependencies.jar",
        "jars/ingestion-pipeline-metrics-0.1-jar-with-dependencies.jar",
        "jars/egress-batch-exports-0.1-jar-with-dependencies.jar",
    ],
    cmd = "cp $(@D)/services/api/api-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/udfs/jars/udfs-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/udfs/jars/udfs-0.1-hive3-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/presto-udfs/presto-udfs-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/trino-querylogger/trino-querylogger-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/trino-custom-s3-credentials-provider/trino-custom-s3-credentials-provider-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/mr/mr-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/nsync/nsync-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/services/integration-backend/rti-raw-stream-processor/rti-raw-stream-processor-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/services/integration-backend/rtingestion-snapshot-processor/rtingestion-snapshot-processor-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/services/integration-backend/rt-std-processor/rt-std-processor-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/nsyncapi/nsyncapi-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/h6o/h6o-0.1.jar $(@D)/jars"
        + "&& cp $(@D)/fileingest/fileingest-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/export/export-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/orc/orc-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/hive/hive-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/sales-integration-syncs/sales-integration-syncs-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/orchestration-metrics/orchestration-metrics-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/exports-v2/exports-v2-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/orchestration-jobs/workflow-score-exports/workflow-score-exports-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/zoominfo-processing-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/zeniq-backend/zenbackend.jar $(@D)/jars"
        + "&& cp $(@D)/rts/rts-app/rts-app.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/hbase/hbase-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/integrations-auth-util/integrations-auth-util.jar $(@D)/jars"
        + "&& cp $(@D)/java-modules-v2/egress-batch-exports/egress-batch-exports-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-scripts-v2/range-lookup-creator/range-lookup-creator-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-scripts-v2/spark-agg-exec/spark-agg-exec-0.1-jar-with-dependencies.jar $(@D)/jars"
        + "&& cp $(@D)/java-scripts-v2/ingestion-pipeline-metrics/ingestion-pipeline-metrics-0.1-jar-with-dependencies.jar $(@D)/jars"
)

filegroup(
    name = "checkstyle-cfg",
    visibility=["//visibility:public"],
    srcs = [
        "checkstyle.xml"
    ]
)

genrule(
    name = "aspect_workflows_build_targets",
    srcs = ASPECT_SERVICES_BUILD_TARGETS + ASPECT_SERVICES_IMAGE_TARGETS,
    outs = [
        "aspect_workflows_build_targets.txt"
    ],
    cmd = "echo done > $@"
)

test_suite(
    name = "aspect_workflows_test_targets",
    tests = ASPECT_SERVICES_TEST_TARGETS,
)

genrule(
    name = "aspect_workflows_static_targets",
    srcs = ASPECT_SERVICES_STATIC_TARGETS,
    outs = [
        "aspect_workflows_static_targets.txt"
    ],
    cmd = "echo done > $@"
)

multirun(
    name = "aspect_workflows_deliver_targets",
    commands = ASPECT_SERVICES_PUSH_TARGETS,
    parallel = True
)

multirun(
    name = "rtf_image_discovery_parallel",
    commands = [
        "//python_v2/rtf_image_discovery:rtf_latest_image__rtf_runner",
        "//python_v2/rtf_image_discovery:rtf_latest_image__rtf_runner_base",
    ],
    parallel = True
)

genrule(
    name = "rules_java_build_targets",
    srcs = RULES_JAVA_BUILD_TARGETS,
    outs = [
        "rules_java_build_targets.txt"
    ],
    cmd = "echo done > $@"
)

test_suite(
    name = "rules_java_test_targets",
    tests = RULES_JAVA_TEST_TARGETS,
)

# -*- post deployment multirun begin -*- #
command(
    name = "image_discovery",
    command = "//python_v2/sixsense_image_discovery:run",
    arguments = [
        "store",
        "--skip-checks",
        "--image=big-data-jobs",
	"--image=big-data-jobs3",
        "--image=campaigns-jobs",
        "--image=common-bigdata-jobs",
        "--image=common-bigdata-jobs3",
        "--image=core-data-jobs",
        "--image=core-data-pp-jobs",
        "--image=core-integration-jobs",
        "--image=infra-jobs",
        "--image=integrations-databus-jobs",
        "--image=mi-jobs",
        "--image=ml-ops-jobs",
        "--image=pe-jobs",
        "--image=platform-apps-jobs",
        "--image=ds-jobs",
        "--image=segments-jobs",
        "--image=si-data-jobs",
        "--image=si-jobs",
        "--image=taxonomy-jobs",
        "--image=workflows-jobs",
        "--image=schedulers-image",
        "--tag-path=/build_tools/oci/_stamped.tags.txt",
    ],
)

multirun(
    name = "aspect_workflows_delivery",
    commands = [
        ":aspect_workflows_deliver_targets",
        ":image_discovery",
    ],
    parallel = False
)
# -*- post deployment multirun end -*- #


# -*- develop only post deployment multirun begin -*- #
multirun(
    name = "aspect_workflows_deliver_targets_develop",
    commands = ASPECT_SERVICES_PUSH_TARGETS_DEVELOP,
    parallel = True
)

command(
    name = "upload_sixsense_observability_registry",
    command = "//scripts_v2/observability_scripts:observability_scripts_binary",
    arguments = [
        "execute",
        "UploadRegistry",
    ],
    environment = {
        "SIXSENSE_ENV": "prod1",
    },
)

command(
    name = "delete_orphan_cronjobs",
    command = "//build_tools/scripts/delete-orphan-cronjobs:binary",
    environment = {
        "SIXSENSE_ENV": "prod1",
        "QUEUE_ENDPOINT": "https://queue-vpce.prod1.6si.com/api",
    },
)

multirun(
    name = "aspect_workflows_delivery_develop",
    commands = [
        ":aspect_workflows_deliver_targets_develop",
        ":upload_sixsense_observability_registry",
        ":delete_orphan_cronjobs",
    ],
    parallel = True
)
# -*- develop only post deployment multirun end -*- #
