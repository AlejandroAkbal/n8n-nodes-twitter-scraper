import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TwitterCredentialsApi implements ICredentialType {
	name = 'twitterScraperApi';
	displayName = 'Twitter Scraper API';
	documentationUrl = 'https://github.com/Rishikant181/Rettiwt-API#Authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		// TODO: Proxy
	];
}
