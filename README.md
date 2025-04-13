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
pnpm i n8n-nodes-twitter-scraper
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

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 18.10 or later
- [pnpm](https://pnpm.io/) (for package management)
- [n8n](https://n8n.io/) (for testing)

### Install n8n

```bash
npm install -g n8n
```

### Setup for Development

1. Clone the repository

```bash
git clone https://github.com/AlejandroAkbal/n8n-nodes-twitter-scraper.git
cd n8n-nodes-twitter-scraper
```

2. Install dependencies

```bash
pnpm install
```

3. Build the project

```bash
pnpm build
```

### Local Development Workflow

1. Start the development build

```bash
rm -rf ./dist

pnpm build
```

2. Link to your local n8n installation for testing

```bash
pnpm link --global

mkdir -p ~/.n8n/custom/n8n-nodes-twitter-scraper

cd ~/.n8n/custom/n8n-nodes-twitter-scraper

pnpm link n8n-nodes-twitter-scraper
```

3. Start n8n with your linked node

```bash
n8n start
```

### Publishing

1. Update the version in package.json
2. Build the project

```bash
pnpm build
```

3. Publish to npm

```bash
pnpm publish
```

### Merging from upstream

To merge changes from the upstream n8n-nodes-starter repository:

```bash
# Add the upstream repository as a remote
git remote add upstream https://github.com/n8n-io/n8n-nodes-starter.git

# Fetch the changes from the upstream repository
git fetch upstream

# Merge the changes from the upstream master branch
git merge upstream/master --allow-unrelated-histories

# Resolve any merge conflicts and commit the changes
```
