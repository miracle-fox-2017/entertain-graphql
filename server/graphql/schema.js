const Profile = require('../models/studentModel');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    _id: {
      type: GraphQLString
    }
  }
})

const ProfileInputType = new GraphQLInputObjectType({
  name: 'ProfileInput',
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    }
  }
})

const ProfileEditType = new GraphQLInputObjectType({
  name: 'ProfileEdit',
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    }
  }
})

const ProfileDeleteType = new GraphQLInputObjectType({
  name: 'ProfileDelete',
  fields: {
    id: {
      type: GraphQLString
    }
  }
})

const graphQuery = new GraphQLObjectType({
  name: 'GraphQL',
  fields: {
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: () =>
        Profile.find()
    }
  }
})


const graphMutation = new GraphQLObjectType({
  name: 'GraphQLMutation',
  fields: {
    addProfile: {
      type: new GraphQLList(ProfileType),
      args: {
        profileParams: {
          name: 'profileParams',
          type: ProfileInputType
        }
      },
      resolve: async (root, args) => {
        const { profileParams } = args
        const newProfile = {
          firstName: profileParams.firstName,
          lastName: profileParams.lastName,
          address: profileParams.address
        }
        await Profile.create(newProfile)
        let dataProfile = await Profile.find()
        return dataProfile
      }
    },
    deleteProfile: {
      type: new GraphQLList(ProfileType),
      args: {
        idProfileParams: {
          name: 'deleteProfile',
          type: ProfileDeleteType
        }
      },
      resolve: async (root, args) => {
        const { idProfileParams } = args
        const id = idProfileParams.id
        await Profile.findByIdAndRemove(id)
        let dataProfile = await Profile.find()
        return dataProfile
      }
    },
    editProfile: {
      type: new GraphQLList(ProfileType),
      args: {
        profileParams: {
          name: 'editProfile',
          type: ProfileEditType
        }
      },
      resolve: async (root, args) => {
        const { profileParams } = args
        await Profile.update({ _id: profileParams.id }, {
          address: profileParams.address,
          firstName: profileParams.firstName,
          lastName: profileParams.lastName
        })
        let dataProfile = await Profile.find()
        return dataProfile
      }
    }
  }
})


const graphSchema = new GraphQLSchema({
  query: graphQuery,
  mutation: graphMutation
})

module.exports = graphSchema