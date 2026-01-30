# RSS proxy

really simple, it does two things:

1. transform rss to json
2. append an `isoDate`(original `pubDate` but in ISO 8601 format) property to rss item

This project is designed to run on Cloudflare Workers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/gucheen/rss-proxy)

## Usage

```bash
curl https://rss-proxy.guchengf.workers.dev?url=https://kagi.com/api/v1/smallweb/feed/?gh

curl https://rss-proxy.guchengf.workers.dev/?url=https://free.com.tw/feed/
```
