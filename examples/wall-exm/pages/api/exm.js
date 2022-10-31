import SDK from "weavedb-exm-sdk-web"

export default async function handler(req, res) {
  const query = JSON.parse(req.body)
  const db = new SDK({
    token: process.env.TOKEN,
    functionId: query.functionId,
  })

  if (query.function === "nonce") {
    res.status(200).json(await db.getNonce(query.address))
  } else if (query.function === "ids") {
    res.status(200).json(await db.getIds(query.tx))
  } else if (
    ["get", "cget", "getIndexes", "getSchema", "getRules"].includes(
      query.function
    )
  ) {
    res.status(200).json(await db[query.function](...query.query))
  } else {
    res.status(200).json(await db.send(query.input))
  }
}