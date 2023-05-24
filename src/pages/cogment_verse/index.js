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

import { config } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import Layout from "@theme/Layout";
import helpersStyles from "../../css/helpers.module.css";
import Link from "@docusaurus/Link";
import styles from "./cogment_verse.module.css";
import CogmentVerseLogo from "@site/static/img/cogment_verse_logo.svg";
import contentFeatures from "../../content/cogment_verse/features";
import Citation from "../../content/cogment_verse/citation.md";
import Description from "../../content/cogment_verse/description.md";
import { Screenshots } from "../../components/screenshots";
import CogmentVerseScreenshots from "../../content/cogment_verse/screenshots";
import { Cta } from "../../components/cta";
import { Hero } from "../../components/hero";
import { Section } from "../../components/section";

config.autoAddCss = false;

export default function CogmentVerse() {
  return (
    <Layout
      title="Cogment Verse"
      description="Research platform for Human-in-the-loop learning (HILL) & Multi-Agent Reinforcement Learning (MARL)"
    >
      <Hero className="shadow--md">
        <div className="container">
          <div className={clsx("row")}>
            <div
              className={clsx(
                "col",
                "col--5",
                helpersStyles.verticallyJustifiedCol
              )}
            >
              <div className="padding--lg">
                <CogmentVerseLogo className={styles.cogment_verse_logo} />
              </div>
            </div>
            <div className={clsx("col", "col--7")}>
              <h1 className="hero__title">
                Research platform for Human-in-the-loop learning & Multi-Agent
                Reinforcement Learning
              </h1>
              <h2 className="hero__subtitle">
                Start building & training agents with HILL and MARL techniques
                within <Link href="https://www.gymlibrary.dev/">Gym</Link>,{" "}
                <Link href="https://pettingzoo.farama.org/">Petting Zoo</Link>,
                and more...
              </h2>
            </div>
          </div>
          <Cta className="row">
            <Link
              href="https://github.com/cogment/cogment-verse"
              className="button button--lg button--secondary"
            >
              <FontAwesomeIcon icon={faGithub} /> Get started
            </Link>
          </Cta>
        </div>
      </Hero>
      <Section className={clsx("margin-vert--lg", "padding-vert--lg")}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Video Demo</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className={styles.videoContainer}>
                <iframe
                  src="https://www.youtube.com/embed/v-K0DqIL9K0"
                  title="Hiking up that HILL with Cogment Verse"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section
        className={clsx("shadow--md", "margin-vert--lg", "padding-vert--lg")}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Key features</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Description />
            </div>
          </div>
          <Screenshots className="row">
            <CogmentVerseScreenshots />
          </Screenshots>
          <div className="row">
            <div className={clsx("col", helpersStyles.verticallyJustifiedCol)}>
              {contentFeatures
                .filter((_, index, array) => index < array.length / 2)
                .map((Content) => (
                  <div>
                    <Content />
                  </div>
                ))}
            </div>
            <div className={clsx("col", helpersStyles.verticallyJustifiedCol)}>
              {contentFeatures
                .filter((_, index, array) => index >= array.length / 2)
                .map((Content) => (
                  <div>
                    <Content />
                  </div>
                ))}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h3>Citation</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Citation />
            </div>
          </div>
          <Cta className="row">
            <Link
              className="button button--secondary button--lg"
              href="https://discord.com/invite/QDxb9Fweqr"
            >
              <FontAwesomeIcon icon={faDiscord} /> Join the community on Discord
            </Link>
          </Cta>
        </div>
      </Section>
    </Layout>
  );
}
