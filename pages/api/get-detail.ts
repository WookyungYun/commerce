import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { isPropertyAccessOrQualifiedName } from 'typescript'

const notion = new Client({
  auth: 'secret_267A29MksPFgUXLJixX9hW52AP6iTzfOeyPtH8oX6Xu',
})

const databaseId = 'dde035b5d4654f458cce42d382d2cc30'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: 'Success' })
  } catch (error) {
    res.status(200).json({ message: 'Failed' })
  }
}
