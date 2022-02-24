#!/usr/bin/env bash

####
# Github pages release script
####

# Base settings
GH_ORG="cogment"
GH_REPO="cogment-doc"
GH_BRANCH="gh-pages"
PUBLISH_AUTHOR_NAME="Artificial Intelligence Redefined"
PUBLISH_AUTHOR_EMAIL="dev+cogment@ai-r.com"
PUB_DIR="publish"
OUT_DIR="build"

# Utility functions
## join_by
## Examples:
##  $ join_by "-delimiter-" "a" "b" "c"
##  "a-delimiter-b-delimiter-c"
function join_by() {
  local delimiter=$1
  shift
  local strings=$1
  shift
  printf %s "${strings}" "${@/#/$delimiter}"
}

function usage() {
  local usage_str=""
  usage_str+="Publish a version of cogment-doc\n\n"
  usage_str+="The package will be deployed to https://github.com/${GH_ORG}/${GH_REPO}/tree/${GH_BRANCH}\n\n"
  usage_str+="Requirements:\n"
  usage_str+="  A running ssh agent having a read/write key for this repo.\n\n"
  usage_str+="Options:\n"
  usage_str+="  --dry-run:      Skip the actual publishing.\n"
  usage_str+="  -h, --help:     Show this screen.\n\n"
  printf "%b" "${usage_str}"
}

# Uncomment to trace every command that are being run
#set -x

# Any subsequent(*) commands which fail will cause the shell script to exit immediately
set -o errexit

root_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
dry_run=0

while [ "$1" != "" ]; do
  case $1 in
    --dry-run)
      dry_run=1
      ;;
    --help | -h)
      usage
      exit 0
      ;;
  esac
  shift
done

pub_dir_full_path="${root_dir}/${PUB_DIR}"
rm -rf "${pub_dir_full_path}"
git clone -q -b "${GH_BRANCH}" "git@github.com:${GH_ORG}/${GH_REPO}.git" "${pub_dir_full_path}"
rm -rf "${pub_dir_full_path:?}"/*
printf "* \"%s\" cloned to \"%s\"\n" "${GH_ORG}/${GH_REPO}@${GH_BRANCH}" "${pub_dir_full_path}"

out_dir_full_path="${root_dir}/${OUT_DIR}"
cp -r "${out_dir_full_path:?}"/* "${pub_dir_full_path}"
printf "* \"%s\" synced to \"%s\"\n" "${out_dir_full_path}" "${pub_dir_full_path}"

echo "docs.cogment.ai" >"${pub_dir_full_path}/CNAME"
echo ".nojekyll" >"${pub_dir_full_path}/.nojekyll"
printf "* required files 'CNAME' and '.nojekyll' updated in \"%s\"\n" "${pub_dir_full_path}"

git -C "${pub_dir_full_path}" config user.name "${PUBLISH_AUTHOR_NAME}"
git -C "${pub_dir_full_path}" config user.email "${PUBLISH_AUTHOR_EMAIL}"
git -C "${pub_dir_full_path}" add -A

publish_url="https://${GH_ORG}.github.io/${GH_REPO}"

set +o errexit
if ! git -C "${pub_dir_full_path}" commit -q -m"Publish documentation" >/dev/null; then
  printf "* Nothing new to publish.\n"
  if [ ${dry_run} == 1 ]; then
    printf "** DRY RUN SUCCESSFUL - Nothing published\n"
  else
    printf "** Existing documentation can be browsed at %s\n" "${publish_url}"
  fi
  exit 0
fi
set -o errexit

if [[ "${dry_run}" == 1 ]]; then
  printf "** DRY RUN SUCCESSFUL - Nothing pushed\n"
else
  git -C "${pub_dir_full_path}" push -q origin "${GH_BRANCH}"
  printf "** New version pushed, it can be browsed at %s\n" "${publish_url}"
fi
