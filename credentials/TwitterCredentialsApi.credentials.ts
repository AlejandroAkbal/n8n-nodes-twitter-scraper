import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TwitterCredentialsApi implements ICredentialType {
	name = 'twitterScraperApi';
	displayName = 'Twitter Scraper API';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			description:
				'The API key from running `npx rettiwt-api auth login <email> <username> <password>`',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
