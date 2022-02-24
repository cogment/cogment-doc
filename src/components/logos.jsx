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
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./logos.module.css";
import Link from "@docusaurus/Link";

export function Logo({ imgSrc, title, href = null, ...otherProps }) {
  if (!href) {
    return (
      <div className={styles.logo} {...otherProps}>
        <img src={useBaseUrl(imgSrc)} alt={`logo for ${title}`} title={title} />
      </div>
    );
  } else {
    return (
      <div className={styles.logo}>
        <Link href={href}>
          <img
            src={useBaseUrl(imgSrc)}
            alt={`logo for ${title}`}
            title={title}
          />
        </Link>
      </div>
    );
  }
}

export function Logos({ children, ...otherProps }) {
  return (
    <div className={styles.logos} {...otherProps}>
      {children}
    </div>
  );
}
