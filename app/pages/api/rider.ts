import type { NextApiRequest, NextApiResponse } from 'next'
import { Rider } from '../../@types/rider'

export default async function riderHandler(
  req: NextApiRequest,
  res: NextApiResponse<Rider>
) {

  let options = {
        method: req.method,
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(req.body)
    }

  switch (req.method) {
    case 'GET':

        fetch('/backend/getRiders',options)
            .then((response)=>response.json())
            .then((data)=>res.status(200).json(data))
        break

    case 'PUT':

        fetch('/backend/updateRiderTask',options)
            .then((response)=>response.json())
            .then((data)=>res.status(200).json(data))
        break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}