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
import atariDoubleDunkImgUrl from "./atari_double_dunk.gif";
import goImgUrl from "./classic_go.gif";
import atariMontezumasRevengeUrl from "./atari_montezumas_revenge.gif";
import lunarLanderUrl from "./lunar_lander.gif";

function CogmentVerseScreenshots() {
  return (
    <React.Fragment>
      <img
        src={atariDoubleDunkImgUrl}
        alt="Atari Double Dunk - From Petting Zoo"
      />
      <img src={goImgUrl} alt="Go - From Petting Zoo" />
      <img
        src={atariMontezumasRevengeUrl}
        alt="Atari Montezuma's Revenge - From Open AI Gym"
      />
      <img src={lunarLanderUrl} alt="Lunar Lander - From Open AI Gym" />
    </React.Fragment>
  );
}

export default CogmentVerseScreenshots;
