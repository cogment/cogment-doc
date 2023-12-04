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

// @ts-check

import React from "react";
import { RedocStandalone } from "redoc";

import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./openApiDoc.module.css";

export function OpenApiDoc({ src }) {
  const url = useBaseUrl(src);
  return (
    <div className={styles.openapidoc}>
      <RedocStandalone
        specUrl={url}
        // see https://redocly.com/docs/redoc/config/
        options={{
          disableSearch: true,
          nativeScrollbars: true,
          hideHostname: true,
          pathInMiddlePanel: true,
          scrollYOffset: "nav.navbar--fixed-top",
          theme: {
            colors: {
              primary: { main: "#5217b8" },
              secondary: { main: "#ffb300" },
            },
            sidebar: {
              width: "0px",
            },
          },
        }}
      />
    </div>
  );
}
