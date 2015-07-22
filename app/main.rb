require "sinatra"
require "sinatra/reloader" if development?
require "neo4j-core"

set :port, ENV['PORT']
set :bind, ENV['IP']

Neo4j::Session.open(
  :server_db,
  ENV['NEO4J_URL'],
  basic_auth: {
    username: 'neo4j',
    password: ENV['NEO4J_PW']
  },
  initialize: { ssl: { verify: true }}
)


get '/' do
  Neo4j::Session.query('MATCH (n) RETURN n').to_a.map { |n| n[:name] }
end

get '/entry/:name/:tag' do |name, tag|
  n = Neo4j::Transaction.run do
    Neo4j::Node.create({name: name}, tag)
  end
  n.props.to_s
end
