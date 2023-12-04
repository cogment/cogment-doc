// Copyright 2021 AI Redefined Inc. <dev+cogment@ai-r.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs/promises");
const path = require("path");

const { Octokit } = require("@octokit/core");

/**
 * Docusaurus plugin downloading the cogment web proxy openapi specifications
 *
 * Options are:
 *  - version: The Cogment version (e.g. "v2.10.1"), "latest" can be used to retrieve the latest version. Default is "latest".
 *  - filename: Filename (also github release asset name) of the openapi spec file. Default is "web-proxy-openapi.json".
 *  - output: Output path
 *
 * See https://docusaurus.io/docs/2.x/advanced/plugins
 */
module.exports = async function cogmentWebProxyOpenapi(context, options) {
  // ...
  return {
    name: "cogment-web-proxy-openapi",
    async loadContent() {
      const { version = "latest", filename = "web-proxy-openapi.json" } =
        options;
      const octokit = new Octokit();

      let cogmentRelease;
      try {
        if (version == "latest") {
          cogmentRelease = await octokit.request(
            "GET /repos/{owner}/{repo}/releases/latest",
            {
              owner: "cogment",
              repo: "cogment",
            }
          );
        } else {
          cogmentRelease = await octokit.request(
            "GET /repos/{owner}/{repo}/releases/tags/{tag}",
            {
              owner: "cogment",
              repo: "cogment",
              tag: version,
            }
          );
        }
      } catch (e) {
        throw new Error(
          `Unable to retrieve cogment release [${version}]: ${e}`
        );
      }

      openapiAsset = cogmentRelease.data.assets.find(
        ({ name }) => name === filename
      );

      if (!openapiAsset) {
        throw new Error(
          `[${filename}] not found in target Cogment release [${cogmentRelease.data.tag_name}]`
        );
      }

      openapiSpecs = await octokit.request(
        "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
        {
          owner: "cogment",
          repo: "cogment",
          asset_id: openapiAsset.id,
          headers: {
            Accept: "application/octet-stream",
          },
        }
      );

      var dec = new TextDecoder("utf-8");

      return dec.decode(openapiSpecs.data);
    },
    async contentLoaded({ content, actions }) {
      const { outputPath = "api/web-proxy-openapi.json" } = options;
      const outputFullpath = path.join(context.siteDir, "static", outputPath);

      await fs.mkdir(path.dirname(outputFullpath), { recursive: true });
      await fs.writeFile(outputFullpath, content);
      console.log(
        `Cogment Web Proxy openapi specification available at [${outputFullpath}]`
      );
    },
  };
};
