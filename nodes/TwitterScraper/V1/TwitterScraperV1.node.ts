import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeParameterResourceLocator,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { tweetFields, tweetOperations } from './TweetDescription';

import { Rettiwt, TweetFilter } from 'rettiwt-api';
import { returnId } from './GenericFunctions';



/**
 * Adapted code from:
 * @see https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Twitter/V2/TwitterV2.node.ts
 * Using the rettiwt-api package to interact with Twitter
 * @see https://github.com/Rishikant181/Rettiwt-API/
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
							description: 'Interact with tweets',
						},
						{
							name: 'User',
							value: 'user',
							description: 'Search users',
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

		const rettiwt = new Rettiwt({ apiKey: credentials.apiKey as string })

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'tweet') {
					if (operation === 'create') {
						const text = this.getNodeParameter('text', i, '', {})

						const { attachments, inReplyToStatusId } = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as {
							attachments: string;
							inReplyToStatusId: INodeParameterResourceLocator;
						}

						let inReplyToStatusIdValue

						if (inReplyToStatusId) {
							inReplyToStatusIdValue = returnId(inReplyToStatusId)
						}

						let attachmentsValue

						if (attachments) {
							attachmentsValue = [{
								path: attachments
							}]
						}

						responseData = await rettiwt.tweet.tweet(
							text as string,
							attachmentsValue,
							inReplyToStatusIdValue,
						)
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

					if (operation === 'search') {
						const searchText = this.getNodeParameter('searchText', i, '', {});

						const limit = this.getNodeParameter('limit', i);

						const { startTime, endTime, fromUsers } = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as {
							startTime: string;
							endTime: string;
							fromUsers: string;
						};

						const tweetFilter: TweetFilter = {}

						if (searchText) {
							tweetFilter.includePhrase = searchText.toString()
						}

						if (startTime) {
							tweetFilter.startDate = new Date(startTime)
						}

						if (endTime) {
							tweetFilter.endDate = new Date(endTime)
						}

						if (fromUsers) {
							tweetFilter.fromUsers = fromUsers.split(',')
						}


						responseData = await rettiwt.tweet.search(tweetFilter, limit)
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as unknown as IDataObject[]),
					{ itemData: { item: i } },
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
