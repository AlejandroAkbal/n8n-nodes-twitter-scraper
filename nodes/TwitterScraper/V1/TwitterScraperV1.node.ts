import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeParameterResourceLocator,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow'
import {tweetFields, tweetOperations} from './TweetDescription'

import {returnId} from './GenericFunctions'
import {Rettiwt} from 'rettiwt-api'

/**
 * Adapted code from:
 * @see https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Twitter/V2/TwitterV2.node.ts
 */
export class TwitterScraperV1 implements INodeType {
	description: INodeTypeDescription

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,

			version: 1,
			description: 'Consume Twitter without their API',
			subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
			group: ['output'],
			defaults: {
				name: 'Twitter Scraper',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'twitterScraperApi',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					noDataExpression: true,
					options: [
						{
							name: 'Tweet',
							value: 'tweet',
							description: 'Create, retweet, or like a tweet',
						},
					],
					default: 'tweet',
				},
				// TWEET
				...tweetOperations,
				...tweetFields,
			],
		}
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData()
		const length = items.length
		const returnData: INodeExecutionData[] = []

		let responseData

		const resource = this.getNodeParameter('resource', 0)
		const operation = this.getNodeParameter('operation', 0)

		// Custom credentials
		const credentials = await this.getCredentials('twitterScraperApi')

		const rettiwt = new Rettiwt({apiKey: credentials.apiKey as string})

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'tweet') {
					if (operation === 'create') {
						const text = this.getNodeParameter('text', i, '', {})

						const {attachments, inReplyToStatusId} = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as {
							attachments: string;
							inReplyToStatusId: INodeParameterResourceLocator;
						}

						const inReplyToStatusIdValue = returnId(inReplyToStatusId)

						// TODO: Media
						// @ts-ignore
						const attachmentsValue = attachments

						responseData = await rettiwt.tweet.tweet(
							text as string,
							undefined,
							inReplyToStatusIdValue,
						)
					}

					if (operation === 'like') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator

						const tweetId = returnId(tweetRLC)

						responseData = await rettiwt.tweet.favorite(tweetId)
					}

					if (operation === 'retweet') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator

						const tweetId = returnId(tweetRLC)

						responseData = await rettiwt.tweet.retweet(tweetId)
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as unknown as IDataObject[]),
					{itemData: {item: i}},
				)

				returnData.push(...executionData)

				// Error handling
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = {
						json: {
							error: (error as JsonObject).message,
						},
					}
					returnData.push(executionErrorData)
					continue
				}
				throw error
			}
		}

		return [returnData]
	}
}
