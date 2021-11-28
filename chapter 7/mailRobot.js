//Eloquent JavaScript Book Chapter 7
//robot to deliver parcels
const roads = [
"Alice's House-Bob's House",
"Alice's House-Post Office",
"Daria's House-Ernie's House",
"Ernie's House-Grete's House",
"Grete's House-Shop",
"Marketplace-Post Office",
"Marketplace-Town Hall",
];
//
function buildGraph(edges) {
  //to make it not derived from Object.prototype
  let graph = Object.create(null);
  //split roads array
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    }else {
      graph[from].push([to]);
    }
  }

  for (let [from, to] of edges.map(r => r.split("-"))) {
    //Make it Bidirectional road way
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    //check if there is a road from the current place to the destination
    if (!roadGraph[this.place].includes(destination)) {
      //if there isn't return old Villagestate
      return this;
    }else {

      //create new sets of parcels and return non delivered parcels
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return  p;
         return {place: destination, address: p.address};
         //filter parcels that have deliverd
      }).filter(p => p.place != p.address)
        //if there is a road => create new villagestate with the destination as the new place and non deliverd parcels
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  //count how many turns the robot did
  for(let turn = 0;; turn++) {
    //check if all parcels has delivered
    if(state.parcels.length == 0) {
      console.log(`Done in ${turns}`);
      break;
    }
   //robot is a function taking state and memory as inputs
   //state is the villagestate and memory is states the robot has passed by
    let action = robot(state, menory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`moved to ${action.direction}`);
  }
}
//this is the most stupid thing a robot can do => to pick random road but it is effective
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
//add random method to villagestate class prototype
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};
var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
function routeRobot(state, memory) {
  //check if robot has memory , if not let the memory the initial mail route
  if(memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
function findRoute(graph, from, to) {
  //create work array of objects contain => {at} : where we are currently , and an empty route array
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    //add each new place to work array
    let {at, route} = work[i];
    //loop over each place of the graph to get to where you wanna go
    for (let place of graph[at]) {
      //add the place to rout array
      if(place == to) return route.concat(place);
      //check if other places get to the place you wanna go
      if(!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}
function goalOrientedRobot({place, parcels}, route) {
  //check if the route is empty
  if (route.length == 0) {
    // create new parcel in the array
    let parcel = parcels[0];
    // if the parcel is in different way from the robot
    if (parcel.place != place) {
      // find a route to take the oarcel
      route = findRoute(roadGraph, place, parcel.place)
    }
    else {
      // deliver the parcel to the specified address
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  // return the direction and memory without the place in the route where we just went
  return {direction: route[0], memory: route.slice(1)};
}
