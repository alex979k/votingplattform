var neon_js = require('@cityofzion/neon-js')

var Neon = neon_js.default
const query = Neon.create.query()
let { rpc, api, sc, u } = require('@cityofzion/neon-js')

const config = {
  name: "PrivateNet",
  extra: {
    neoscan: "http://localhost:4000/api/main_net"
  }
};

const privateNet = new rpc.Network(config);
Neon.add.network(privateNet);

// You will be able to lookup an instance of PrivateNet neoscan
var privateNetNeoscan = new Neon.api.neoscan.instance("PrivateNet");

privateNetNeoscan.getBalance(address).then(res => console.log(res));
