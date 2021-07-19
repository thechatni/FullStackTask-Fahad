const graphql = require("graphql");
const _ = require("lodash");
const Supplier = require("../models/supplier");
const Fleet = require("../models/fleet");
const Vehicle = require("../models/vehicle");
const Driver = require("../models/driver");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const VehicleType = new GraphQLObjectType({
  name: "Vehicle",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    capacity: { type: GraphQLString },
    price: { type: GraphQLString },
    available: { type: GraphQLString },
    driver: {
      type: DriverType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Driver.findById(parent.driverId);
      },
    },
    fleet: {
      type: FleetType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Fleet.findById(parent.fleetId);
      },
    },
  }),
});

const SupplierType = new GraphQLObjectType({
  name: "Supplier",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    fleets: {
      type: new GraphQLList(FleetType),
      resolve(parent, args) {
        return Fleet.find({ supplierId: parent.id });
      },
    },
  }),
});

const DriverType = new GraphQLObjectType({
  name: "Driver",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    available: { type: GraphQLString },
  }),
});

const FleetType = new GraphQLObjectType({
  name: "Fleet",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    supplierId: { type: GraphQLID },
    vehicles: {
      type: new GraphQLList(VehicleType),
      resolve(parent, args) {
        return Vehicle.find({ fleetId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    fleet: {
      type: FleetType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Fleet.findById(args.id);
        // return _.find(authors, { id: args.id });
      },
    },
    vehicle: {
      type: VehicleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Vehicle.findById(args.id);
        // return _.find(authors, { id: args.id });
      },
    },
    driver: {
      type: DriverType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Driver.findById(args.id);
        // return _.find(authors, { id: args.id });
      },
    },
    supplier: {
      type: SupplierType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Supplier.findById(args.id);
        // return _.find(authors, { id: args.id });
      },
    },
    vehicles: {
      type: new GraphQLList(VehicleType),
      resolve(parent, args) {
        // return authors;
        return Vehicle.find({});
      },
    },
    fleets: {
      type: new GraphQLList(FleetType),
      resolve(parent, args) {
        // return authors;
        return Fleet.find({});
      },
    },
    drivers: {
      type: new GraphQLList(DriverType),
      resolve(parent, args) {
        // return authors;
        return Driver.find({});
      },
    },
    suppliers: {
      type: new GraphQLList(SupplierType),
      resolve(parent, args) {
        // return authors;
        return Supplier.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDriver: {
      type: DriverType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        available: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let driver = new Driver({
          name: args.name,
          available: args.available,
        });
        return driver.save();
      },
    },
    addFleet: {
      type: FleetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        supplierId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let fleet = new Fleet({
          name: args.name,
          supplierId: args.supplierId,
        });
        return fleet.save();
      },
    },
    addSupplier: {
      type: SupplierType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let supplier = new Supplier({
          name: args.name,
        });
        return supplier.save();
      },
    },
    addVehicle: {
      type: VehicleType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        capacity: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        driverId: { type: new GraphQLNonNull(GraphQLID) },
        fleetId: { type: new GraphQLNonNull(GraphQLID) },
        available: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let vehicle = new Vehicle({
          name: args.name,
          capacity: args.capacity,
          price: args.price,
          driverId: args.driverId,
          fleetId: args.fleetId,
          available: args.available,
        });
        return vehicle.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
