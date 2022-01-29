
const { gql } = require('apollo-server')
const { DateTimeResolver } = require('graphql-scalars')

const typeDefs = gql`
type Mutation {
  createProduto(data: ProdutoInput!): Produto
  createCliente(data: ClienteInput!): Cliente
  createPedido(data: PedidoInput!): Pedido
  createPedidoItem(data: PedidoItemInput! ): PedidoItem
}

type Produto {
  id: Int!
  nome: String!

  updatedAt: String
  createdAt: String
}

type Cliente {
  id: Int!
  nome: String
  cpf: String
  telefone: String
  endereco: String
  pedidos: [Pedido]
  updatedAt: String
  createdAt: String
}

type Pedido {
  id: Int!
  data_pedido: DateTime
  situacao: String
  cliente: Cliente
  updatedAt: String
  createdAt: String
}

type PedidoItem {
  id: Int!
  pedido: Pedido
  produto: [Produto]
}

input ProdutoInput {
  id: Int!
  nome: String!
}

input ClienteInput {
  id: Int!
  nome: String!
  cpf: String
  telefone: String
  endereco: String
}

input PedidoInput {
  id: Int!
  data_pedido: DateTime
  situacao: String
  cliente: ClienteInput
}

input PedidoItemInput {
  id: Int!
  pedido: PedidoInput
  produto: [ProdutoInput]
}

type Query {
  produto: [Produto]
  cliente: [Cliente]
  pedido: [Pedido]
  pedidoItem: [PedidoItem]
}

scalar DateTime
`

const resolvers = {
  Query: {
    produto: (_parent, _args, context) => {
      return context.prisma.produto.findMany()
    },
    cliente: (_parent, _args, context) => {
      return context.prisma.cliente.findMany()
    },
    pedido: (_parent, _args, context) => {
      return context.prisma.pedido.findMany({
        include: {
          cliente: true,
        }
      })
    },
  },
  Mutation: {
    createProduto: (_parent, args, context) => {
      return context.prisma.produto.create({
        data: {
          nome: args.data.nome,
        },
      })
    },
    createCliente: (_parent, args, context) => {
      return context.prisma.cliente.create({
        data: {
          nome: args.data.nome,
          cpf: args.data.cpf,
          telefone: args.data.telefone,
          endereco: args.data.endereco,
        },
      })
    },

    createPedido: (_parent, args, context) => {
      return context.prisma.pedido.create({
        data: {
          data_pedido: args.data.data_pedido,
          situacao: args.data.situacao,
          cliente: {
            connect: {
              id: args.data.cliente.id,
            }
          },
        },
        include: {
          cliente: true,
        },
        
      } )
    },

    createPedidoItem: (_parent, args, context) => { 
      return context.prisma.pedidoItem.create({
         data: {
          pedido: {
            connect: {
              id: args.data.pedido.id,
            }
          },
          produto: {
            connect: {
              id: args.data.produto.id
            }
          },
      },
      include: {
        pedido: true,
        produto: true,
      },
    })
    },

    
  },
  DateTime: DateTimeResolver,
}

module.exports = {
  resolvers,
  typeDefs,
}
