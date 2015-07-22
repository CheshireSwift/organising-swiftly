require 'sinatra'
require 'sinatra/reloader' if development?
require 'neo4j-core'
require 'json'

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

def format_row(nodeVar, row)
  node = row[nodeVar]
  format_node(node)
end

def format_node(node)
  {
    labels: node.labels,
    props: node.props
  }
end

def neoQuery(query, keyed=true, nodeVar='n')
  #TODO: upgrade to ruby v.2.2.x+, remove to_proc
  row_formatter = method(:format_row).to_proc.curry[nodeVar]
  db_results = Neo4j::Session.query(query)
  nodes = db_results.map(&row_formatter)
  if keyed
    nodes = nodes.reduce({}) do |hash, n|
      hash[n[:props][:name]] = n
      hash
    end
  end
  JSON.generate(nodes)
end

get '/' do
  neoQuery('MATCH (n) RETURN n', false)
end

get '/entries' do
  neoQuery('MATCH (n:Entry) RETURN n')
end

get '/entry/:name/:text' do |name, text|
  n = Neo4j::Transaction.run do
    Neo4j::Node.create({name: name, text: text}, :Entry)
  end
  JSON.generate(format_node(n))
end

get '/ping' do
  'Pong!'
end
