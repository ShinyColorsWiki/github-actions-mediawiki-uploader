# Github-Actions-Mediawiki-Uploader

This action is made for upload lua module to mediawiki instance.

## Inputs

### `mediawiki_api_url`

**Required** A mediawiki instance url to upload text

### `username`

**Required** A mediawiki instance username

### `password`

**Required** A mediawiki instance password

### `filepath`

**Required** A file path of upload text

### `pagename`

**Required** A page name to edit on mediawiki

### `useragent`

An user-agent to communicate mediawiki

### `summary`

A summary to publish on mediawiki. Formatting supported.

|      Name      | Content |
|----------------|---------|
| `{title}`      | `pagename`  |
| `{commit}`     | `github.context.sha` or current commit of action |

Default `'Editing wiki page by action with {commit}'`


## Example usage

```yaml
uses: ShinyColorsWiki/github-actions-mediawiki-uploader@v1
with:
  mediawiki_api_url: "https://mediawiki.org/w/api.php"
  username: ${{ secrets.BOT_USERNAME }}
  password: ${{ secrets.BOT_PASSWORD }}
  filepath: ${{ matrix.file }}
  pagename: ${{ matrix.wiki }}
  useragent: ${{ secrets.BOT_USERAGENT }}
  summary: 'Editing {title} page by Github Action by {commit}.'
```