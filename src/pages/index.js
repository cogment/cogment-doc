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
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import React from "react";
import styles from "./home.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Logos, Logo } from "../components/logos";
import { Benefits, Benefit } from "../components/benefits";
import { Screenshots } from "../components/screenshots";

import contentBenefits from "../content/home/benefits";
import contentFeatures from "../content/home/features";
import ContentCogmentVerse, {
  CogmentVerseScreenshots,
} from "../content/home/cogment-verse";
import CogmentVerseLogo from "@site/static/img/cogment_verse_logo.svg";

config.autoAddCss = false;

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className={clsx("hero", "shadow--md", styles.hero)}>
        <div className="container">
          <h1 className="hero__title">
            Build, train, and operate AI agents in simulated or real
            environments shared with humans.
          </h1>
          <h2 className="hero__subtitle">
            Cogment is the first open source platform designed to address the
            challenges of continuously training humans and AI together.
          </h2>
          <div className={clsx("row", styles.cta)}>
            <Link
              className={clsx(
                "button",
                "button--lg",
                "margin-right--sm",
                "button--primary"
              )}
              href="https://github.com/cogment/cogment-verse"
            >
              <FontAwesomeIcon icon={faGithub} /> Get started for free
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://discord.com/invite/QDxb9Fweqr"
            >
              <FontAwesomeIcon icon={faDiscord} /> Come chat and share!
            </Link>
          </div>
        </div>
      </div>
      <div
        className={clsx("margin-vert--lg", "padding-vert--lg", styles.section)}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Why Cogment</h3>
            </div>
          </div>
          <Benefits className="row padding-vert--md">
            {contentBenefits.map((Content, idx) => (
              <Benefit key={idx} className={"col"}>
                <Content />
              </Benefit>
            ))}
          </Benefits>
          <div className={clsx("row", styles.cta)}>
            <Link
              href="https://ai-r.com/solutions"
              class="button button--secondary"
            >
              Discover Cogment-enabled solutions from AI Redefined
            </Link>
          </div>
        </div>
      </div>
      <div className={clsx("shadow--md", "padding-vert--lg", styles.section)}>
        <div className={clsx("margin-vert--lg", "container")}>
          <div className="row">
            <div className="col">
              <h3>Compatible with your existing tools</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Logos>
                <Logo
                  title="PyTorch"
                  imgSrc="/img/3rd_party_tools/pytorch.svg"
                  href="https://pytorch.org"
                />
                <Logo
                  title="Open AI Gym"
                  imgSrc="/img/3rd_party_tools/openai_gym.svg"
                  href="https://gym.openai.com"
                />
                {/* <Logo
                  title="Stable Baseline 3"
                  imgSrc="/img/3rd_party_tools/stable_baseline.svg"
                  href="https://github.com/DLR-RM/stable-baselines3"
                /> */}
                <Logo
                  title="Petting Zoo"
                  imgSrc="/img/3rd_party_tools/petting_zoo.svg"
                  href="https://www.pettingzoo.ml"
                />
                {/* <Logo
                  title="JAX"
                  imgSrc="/img/3rd_party_tools/jax.svg"
                  href="https://jax.readthedocs.io"
                /> */}
                <Logo
                  title="Tensorflow"
                  imgSrc="/img/3rd_party_tools/tensorflow.svg"
                  href="https://www.tensorflow.org"
                />
              </Logos>
            </div>
          </div>
        </div>
        <div className={clsx("margin-vert--lg", "container")}>
          <div className="row">
            <div className="col">
              <h3>They're already using Cogment</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Logos>
                <Logo
                  title="Thales"
                  imgSrc="/img/users/thales.svg"
                  href="https://www.thalesgroup.com"
                />
                <Logo
                  title="The Chandar Research Lab at MILA"
                  imgSrc="/img/users/mila_chandar_research_lab.svg"
                  href="https://chandar-lab.github.io"
                />
                <Logo
                  title="The Intelligent Robot Learning Laboratory at University of Alberta"
                  imgSrc="/img/users/university_of_alberta_intelligent_robot_learning_laboratory.svg"
                  href="https://irll.ca"
                />
                <Logo
                  title="Alberta Machine Intelligence Institute"
                  imgSrc="/img/users/alberta_machine_intelligence_institute.svg"
                  href="https://www.amii.ca"
                />
              </Logos>
            </div>
          </div>
        </div>
        <div className={clsx("margin-vert--xl", "container")}>
          <div className="row">
            <div className={clsx("col", styles.verticallyJustifiedCol)}>
              <div className="padding--lg">
                <CogmentVerseLogo />
              </div>
              <h3>
                Get started with pretrained models, environments, and demos
              </h3>
            </div>
            <div className={clsx("col", styles.verticallyJustifiedCol)}>
              <ContentCogmentVerse />
            </div>
          </div>
          <Screenshots className="row">
            <CogmentVerseScreenshots />
          </Screenshots>
          <div className={clsx("row", styles.cta)}>
            <Link
              className="button button--primary button--lg margin-right--sm"
              href="https://github.com/cogment/cogment-verse"
            >
              <FontAwesomeIcon icon={faGithub} /> Get started for free
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://discord.com/invite/QDxb9Fweqr"
            >
              <FontAwesomeIcon icon={faDiscord} /> Come chat and share!
            </Link>
          </div>
        </div>
      </div>
      <div
        className={clsx("margin-vert--lg", "padding-vert--lg", styles.section)}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Key features</h3>
            </div>
          </div>
          <div className="row">
            <div className={clsx("col", styles.verticallyJustifiedCol)}>
              {contentFeatures
                .filter((_, index, array) => index < array.length / 2)
                .map((Content) => (
                  <div>
                    <Content />
                  </div>
                ))}
            </div>
            <div className={clsx("col", styles.verticallyJustifiedCol)}>
              {contentFeatures
                .filter((_, index, array) => index >= array.length / 2)
                .map((Content) => (
                  <div>
                    <Content />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
