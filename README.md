# n8n-nodes-twitter-scraper

This is an n8n community node. It lets you use Twitter (X) in your n8n workflows without requiring the official API.

Twitter is a social media platform where users post and interact with messages known as "tweets". This node allows you to interact with Twitter through web scraping techniques, avoiding Twitter API restrictions and costs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-twitter-scraper
```

Alternatively, you can install it directly from the n8n UI:

## Operations

This node provides operations for two resources: Tweets and Users.

### Tweet Operations

- **Create**: Create, quote, or reply to a tweet
- **Delete**: Delete a tweet
- **Upload Media**: Upload media and return a media ID for use in tweets
- **Retweet**: Retweet a tweet
- **Unretweet**: Unretweet a tweet
- **Like**: Like a tweet
- **Unlike**: Unlike a tweet
- **Search**: Search for tweets, with options for filtering by date, user, and more

### User Operations

- **Get User**: Get user details by username
- **Get Timeline**: Get a user's timeline by username

## Credentials

This node uses the Rettiwt-API under the hood, which requires an API key. The API key is used for authentication with Twitter's web interface, not the official API.

To obtain the API key check out the [Rettiwt-API documentation](https://github.com/Rishikant181/Rettiwt-API#Authentication).

## Compatibility

- Minimum n8n version: Latest regular release
- Requires Node.js v18.10 or later
- Compatible with both n8n desktop and cloud environments

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Rettiwt-API documentation](https://github.com/Rishikant181/Rettiwt-API/)
- [Project repository](https://github.com/AlejandroAkbal/n8n-nodes-twitter-scraper)

## Version history

Check out the [commit history](https://github.com/AlejandroAkbal/n8n-nodes-twitter-scraper/commits/master) for version details.
