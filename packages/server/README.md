# how to start server

`npm start`

# test

`http POST http://localhost:4000/graphql query='query { hello }'`

## 全件取得

`http POST :4000/graphql query='query { notes { id content } }'`

## 単一取得

`http POST :4000/graphql query='query { note(id: "1") { id content } }'`

## 新規作成 (Create)

`http POST :4000/graphql query='mutation { addNote(content: "New note") { id content } }'`

## 更新 (Update)

`http POST :4000/graphql query='mutation { updateNote(id: "1", content: "Updated note") { id content } }'`

## 削除 (Delete)

`http POST :4000/graphql query='mutation { deleteNote(id: "2") }'`
