import type { INodeProperties } from 'n8n-workflow';

export const tweetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tweet'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create, quote, or reply to a tweet',
				action: 'Create tweet',
			},
			{
				name: 'Upload Media',
				value: 'uploadMedia',
				description: 'Upload media and return a media ID',
				action: 'Upload media',
			},
			{
				name: 'Retweet',
				value: 'retweet',
				description: 'Retweet a tweet',
				action: 'Retweet tweet',
			},
			{
				name: 'Like',
				value: 'like',
				description: 'Like a tweet',
				action: 'Like tweet',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for tweets',
				action: 'Search tweets',
			},
		],
		default: 'create',
	},
];

export const tweetFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                tweet:create                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 2,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['tweet'],
			},
		},
		description:
			'The text of the status update. URLs must be encoded. Links wrapped with the t.co shortener will affect character count',
	},
	{
		displayName: 'Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['tweet'],
			},
		},
		options: [
			{
				displayName: 'Media ID',
				name: 'mediaId',
				type: 'string',
				default: '',
				description:
					'ID of the media to attach to the tweet (obtained from the Upload Media operation)',
			},
			{
				displayName: 'Reply to Tweet',
				name: 'inReplyToStatusId',
				type: 'resourceLocator',
				default: { mode: 'id', value: '' },
				description: 'The tweet being replied to',
				modes: [
					{
						displayName: 'By ID',
						name: 'id',
						type: 'string',
						validation: [],
						placeholder: 'e.g. 1187836157394112513',
						url: '',
					},
					{
						displayName: 'By URL',
						name: 'url',
						type: 'string',
						validation: [],
						placeholder: 'e.g. https://twitter.com/n8n_io/status/1187836157394112513',
						url: '',
					},
				],
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                tweet:uploadMedia                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Media Attachment',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				operation: ['uploadMedia'],
				resource: ['tweet'],
			},
		},
		description: 'Name of the binary property containing the media to upload',
	},

	/* -------------------------------------------------------------------------- */
	/*                                tweet:retweet                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tweet',
		name: 'tweetId',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		description: 'The tweet to retweet',
		displayOptions: {
			show: {
				operation: ['retweet'],
				resource: ['tweet'],
			},
		},
		modes: [
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				validation: [],
				placeholder: 'e.g. 1187836157394112513',
				url: '',
			},
			{
				displayName: 'By URL',
				name: 'url',
				type: 'string',
				validation: [],
				placeholder: 'e.g. https://twitter.com/n8n_io/status/1187836157394112513',
				url: '',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                tweet:like                                  */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tweet',
		name: 'tweetId',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		description: 'The tweet to like',
		displayOptions: {
			show: {
				operation: ['like'],
				resource: ['tweet'],
			},
		},
		modes: [
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				validation: [],
				placeholder: 'e.g. 1187836157394112513',
				url: '',
			},
			{
				displayName: 'By URL',
				name: 'url',
				type: 'string',
				validation: [],
				placeholder: 'e.g. https://twitter.com/n8n_io/status/1187836157394112513',
				url: '',
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                tweet:search                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Search Text',
		name: 'searchText',
		type: 'string',
		default: '',
		placeholder: 'e.g. automation',
		displayOptions: {
			show: {
				operation: ['search'],
				resource: ['tweet'],
			},
		},
		description: 'The text to search for',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		description: 'Max number of results to return',
		type: 'number',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-limit
		default: 20,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['tweet'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['search'],
				resource: ['tweet'],
			},
		},
		options: [
			{
				displayName: 'After',
				name: 'startTime',
				type: 'dateTime',
				default: '',
				description: 'Tweets before this date will not be returned',
			},
			{
				displayName: 'Before',
				name: 'endTime',
				type: 'dateTime',
				default: '',
				description: 'Tweets after this date will not be returned',
			},

			{
				displayName: 'From Users',
				name: 'fromUsers',
				type: 'string',
				default: '',
				description: 'A comma-separated list of usernames, without the @ symbol',
			},
		],
	},
];
