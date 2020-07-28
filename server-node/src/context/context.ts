import Context from "./models/context";

const context: Context = {
  state: "receiving",
  connections: {},
  map: {},
  pending: [],
};

export default context;
