# Step 4 : Create a friendly UI

The previous sections implemented the client using the python programming language. This section outlines implementing a web based client using javascript and webpack.

## Implementation

The bootstrap covered in step 1 of this tutorial, created a directory within the `clients` directory called `js`.  This directory includes the basic files required for implementing a web based client.

Modify the `rps/clients/js/index.html` as follows -

`/rps/clients/index.html`

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.9.0/css/all.css">
  <title>RPS</title>
  <script src="./main.js"></script>
  <style>
    body {
      background-color: linen;
      text-align: center;
    }

    #human_actions>i {
      cursor: pointer;
      margin: 0 1em;
    }

    #machine_actions>span {
      color: #ccc;
    }

    #machine_actions>span>i {
      margin: 0 1em;

    }

    #machine_actions>span.selected {
      color: #000;
    }

    #scores {
      margin: 3em;
      font-size: 3em;
    }

    #human_score, #agent_score {
      border: 2px solid #000;
      padding:0.5em;
      margin: 0 2em;
    }

  </style>
</head>

<body>
  <div id="game">
    <h1>Click on Rock, Paper or Scissors?</h1>
    <div id="human_actions" class="actions">
      <i data-value="ROCK" class="fas fa-hand-rock fa-9x"></i>
      <i data-value="PAPER" class="fas fa-hand-paper fa-9x"></i>
      <i data-value="SCISSOR" class="fas fa-hand-scissors fa-9x"></i>
    </div>
    <div id="scores">
      <span id="agent_move"></span>
      <i class="fas fa-user-alt"></i> <span id="human_score">0</span> <span id="agent_score">0</span> <i class="fas fa-robot"></i>
    </div>
    <h1>The bot chooses:</h1>
    <div id="machine_actions" class="actions">
      <span><i data-value="ROCK" class="fas fa-hand-rock fa-9x"></i></span>
      <span><i data-value="PAPER" class="fas fa-hand-paper fa-9x"></i></span>
      <span><i data-value="SCISSOR" class="fas fa-hand-scissors fa-9x"></i></span>
    </div>
  </div>
</body>

</html>
```

Above, is the simple web page that will be used as the frontend interface.

Modify the `rps/clients/js/main.js` javascript file as follows -

`rps/clients/js/main.js`

```js
import { Connection } from 'cogment';
import cog_settings from './cog_settings';

const rps_protos = require("./data_pb.js")
const hostname = window.location.hostname;

let trial;
let endpoint = `http://${hostname}:8088`;

function display(observation) {
  // console.log(observation.toObject())

  document.getElementById("agent_score").innerHTML = observation.getP2Score();
  document.getElementById("human_score").innerHTML = observation.getP1Score();


  const prev_action = observation.getPreviousP2Action();
  if (prev_action) {
    const agent_choice = prev_action.getDecision();
    if (agent_choice > 0) {
      document.querySelector("#machine_actions > span:nth-child(" + (agent_choice) + ")").classList.add("selected");
    }
  }
}

function cleanup() {
  const buttons = document.querySelectorAll("#machine_actions > span");
  buttons.forEach(b => {
    b.classList.remove("selected");
  })
}

async function launch() {
  const connect = new Connection(cog_settings, endpoint);

  const trial = await connect.start_trial(cog_settings.actor_classes.human);

  let ready = true;

  display(trial.observation);

  const buttons = document.querySelectorAll("#human_actions > i")
  buttons.forEach(b => {
    b.onclick = async function () {
      if (!ready) return;

      cleanup();
      ready = false

      const action = new rps_protos.AgentAction();
      action.setDecision(rps_protos.Decision[this.getAttribute('data-value')]);

      const observation = await trial.do_action(action);

      display(observation);
      ready = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  launch()
  console.log("Game started");
});

```

The above js file demonstrates how to implement communication between the frontend and the orchestrator.

## Generating config files

In the root directory of the project, run the following to generate the config in js format:

`cogment generate --js_dir=frontend/js`

This produces the `cog_settings.js` and `data_pb.js` files.

## Dependencies

### Docker-compose

The bootstrap process has included the `webui` and `envoy` services in the `docker-compose.yaml` and has also created a `Dockerfile` in the `/js` directory that is used to build the webui service.

```yaml
  webui:
    image: registry.gitlab.com/change_me/webui
    build:
      context: .
      dockerfile: clients/js/Dockerfile
      target: dev
    volumes:
      - ./clients/js:/app
      - /app/node_modules
    ports:
      - "8080:8080"

  envoy:
    image: envoyproxy/envoy:v1.13.0
    volumes:
      - ./envoy/envoy.yaml:/etc/envoy/envoy.yaml
    ports:
      - "8088:8088/tcp"
    restart: 'always'
```

The `webui` service starts a `node` image, defines the workdir as `/app`, mounts the current `/js` in the workdir, installs the dependencies and compiles the javascript code.  Note, that this `command` is for quick testing of the framework only and not for production.

Rebuild all services as follows -

```text
$ docker-compose build
```

### Envoy

The envoy proxy is also created by the bootstrap (`rps/envoy/envoy.yaml`).  A web browser is HTTP based and does not directly support GRPC calls.  Envoy is a proxy which can convert HTTP calls into GRPC through a filter and is provided below.  The configuration of [grpc-web][1] is outside of the scope of this tutorial.  See [grpc-web][2] for more information.

By starting only the envoy service, you won't see the logs of all its dependencies (env, player and orchestator). There are two alternatives in order to bypass this -

1. Explicitely start the service you want to monitor -
`docker-compose up envoy orchestator ...`

2. Ask for logs only when needed -
`docker-compose logs --follow player`
This will output (--follow) the logs of the player service in real-time.

Rebuild all services as follows -

```text
$ docker-compose build
```

Run the following command -

```text
$ docker-compose up orchestrator webui env agent envoy
```

In a browser, open localhost:8080 and you should be able to play RPS.

[1]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/grpc_web_filter
[2]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/grpc_web_filter
