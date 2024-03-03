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
				displayName: 'Reply to Tweet',
				name: 'inReplyToStatusId',
				type: 'resourceLocator',
				default: { mode: 'id', value: '' },
				// required: true,
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
	{
		displayName: 'Attachments are not supported due to Twitter V2 API limitations',
		name: 'noticeAttachments',
		type: 'notice',
		displayOptions: {
			show: {
				'/additionalFields.attachments': [''],
			},
		},
		default: '',
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
];
