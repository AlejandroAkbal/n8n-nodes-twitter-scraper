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
import { NodeOperationError } from 'n8n-workflow';
import { tweetFields, tweetOperations } from './TweetDescription';
import { userFields, userOperations } from './UserDescription';

import { Rettiwt, TweetFilter, TweetMediaArgs } from 'rettiwt-api';
import { returnId } from './GenericFunctions';

/**
 * Adapted code from:
 * @see https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Twitter/V2/TwitterV2.node.ts
 * Using the rettiwt-api package to interact with Twitter
 * @see https://github.com/Rishikant181/Rettiwt-API/
 */
export class TwitterScraperV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,

			version: 1,
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
				// USER
				...userOperations,
				...userFields,
			],
		};
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length;
		const returnData: INodeExecutionData[] = [];

		let responseData;

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		// Custom credentials
		const credentials = await this.getCredentials('twitterScraperApi');

		const rettiwt = new Rettiwt({ apiKey: credentials.apiKey as string });

		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'tweet') {
					if (operation === 'delete') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const tweetId = returnId(tweetRLC);

						responseData = await rettiwt.tweet.unpost(tweetId);
					}

					if (operation === 'create') {
						const text = this.getNodeParameter('text', i, '', {});

						const { mediaId, inReplyToStatusId } = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as {
							mediaId: string;
							inReplyToStatusId: INodeParameterResourceLocator;
						};

						let inReplyToStatusIdValue;

						if (inReplyToStatusId) {
							inReplyToStatusIdValue = returnId(inReplyToStatusId);
						}

						let attachmentsValue: TweetMediaArgs[] | undefined;

						if (mediaId) {
							attachmentsValue = [
								{
									id: mediaId,
									// tags: [],
								},
							];
						}

						const tweetId = await rettiwt.tweet.post({
							text: text as string,
							media: attachmentsValue,
							replyTo: inReplyToStatusIdValue,
						});

						responseData = { tweetId };
					}

					if (operation === 'uploadMedia') {
						const binaryPropertyName = this.getNodeParameter(
							'binaryPropertyName',
							i,
							'',
							{},
						) as string;

						// Get binary data from the specified property
						const binaryBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						// Upload the media and get the media ID
						const mediaId = await rettiwt.tweet.upload(binaryBuffer as unknown as ArrayBuffer);

						responseData = { mediaId };
					}

					if (operation === 'retweet') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const tweetId = returnId(tweetRLC);

						responseData = await rettiwt.tweet.retweet(tweetId);
					}

					if (operation === 'unretweet') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const tweetId = returnId(tweetRLC);

						responseData = await rettiwt.tweet.unretweet(tweetId);
					}

					if (operation === 'like') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const tweetId = returnId(tweetRLC);

						responseData = await rettiwt.tweet.like(tweetId);
					}

					if (operation === 'unlike') {
						const tweetRLC = this.getNodeParameter(
							'tweetId',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const tweetId = returnId(tweetRLC);

						responseData = await rettiwt.tweet.unlike(tweetId);
					}

					if (operation === 'search') {
						const searchText = this.getNodeParameter('searchText', i, '', {});

						const limit = this.getNodeParameter('limit', i);

						const { startTime, endTime, fromUsers, searchTop } = this.getNodeParameter(
							'additionalFields',
							i,
							{},
						) as {
							startTime: string;
							endTime: string;
							fromUsers: string;
							searchTop: boolean;
						};

						const tweetFilter: TweetFilter = {};

						if (searchText) {
							tweetFilter.includePhrase = searchText.toString();
						}

						if (startTime) {
							tweetFilter.startDate = new Date(startTime);
						}

						if (endTime) {
							tweetFilter.endDate = new Date(endTime);
						}

						if (fromUsers) {
							tweetFilter.fromUsers = fromUsers.split(',');
						}

						if (searchTop) {
							tweetFilter.top = searchTop;
						}

						responseData = await rettiwt.tweet.search(tweetFilter, limit);
					}
				}

				if (resource === 'user') {
					if (operation === 'getUser') {
						const username = this.getNodeParameter(
							'user',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						responseData = await rettiwt.user.details(username.value as string);
					}

					if (operation === 'getTimeline') {
						const username = this.getNodeParameter(
							'user',
							i,
							'',
							{},
						) as INodeParameterResourceLocator;

						const limit = this.getNodeParameter('limit', i);

						const userData = await rettiwt.user.details(username.value as string);

						if (!userData) {
							throw new NodeOperationError(this.getNode(), 'User not found');
						}

						responseData = await rettiwt.user.timeline(userData.id, limit);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as unknown as IDataObject[]),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);

				// Error handling
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = {
						json: {
							error: (error as JsonObject).message,
						},
					};
					returnData.push(executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
