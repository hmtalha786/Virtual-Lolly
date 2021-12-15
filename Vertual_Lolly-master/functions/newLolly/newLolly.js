const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb')
q = faunadb.query
var dotenv = require('dotenv');
dotenv.config()
const shortid = require('shortid')

const typeDefs = gql`
  type Query {
   
    getLolly: [Lolly!]
    getlolly(lollyPath: String!):Lolly
  
  }
  type Lolly {
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom:String!
    recipientName: String!
    message: String!
    senderName: String!
    lollyPath: String!
    
  }
  type Mutation {
    createLolly(recipientName: String!,  message: String!, senderName: String!, flavourTop: String!, flavourMiddle: String!, flavourBottom:String!, lollyPath: String):Lolly
  }
`



const resolvers = {
  Query: {
    getlolly: async (_,{lollyPath}) => {
      
      try {
        const client = new faunadb.Client({ secret: process.env.ADMIN_SECRET });

        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_path"), lollyPath))
          )
          
               
         return result.data
        
       
      }
      catch (error) {
        console.log(error)
      }
    }

  },
  Mutation: {
    createLolly: async (_, { flavourTop, flavourMiddle, flavourBottom, recipientName, message, senderName }) => {
      try {
        const client = new faunadb.Client({ secret: process.env.ADMIN_SECRET });
        const id = shortid.generate()
        const result = await client.query(
          q.Create(q.Collection('posts'), {
            data: { flavourTop:flavourTop, flavourMiddle:flavourMiddle, flavourBottom:flavourBottom, recipientName:recipientName, message:message, senderName, lollyPath:id }
          })
        )
        
          return result.data
      }
      catch(error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler();
