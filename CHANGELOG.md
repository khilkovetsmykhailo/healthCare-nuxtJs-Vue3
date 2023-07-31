# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

If the entry into the changelog has a unique identifier such as a MMN or a CR
number, list it in parentheses immediately following the version number and
date. For an example, see the [Web Boilerplate Changelog](https://github.com/EliLillyCo/lusa-web-boilerplate/blob/master/CHANGELOG.md).

## [0.0.4] = 05 October 2019

### Added
- logout page
- logout button in navigation
- "fade" transition

## [0.0.3] - 04 October 2019

### Modified
- removed erroneously copied "log" function from `server/index.js`

## [0.0.2] - 04 October 2019

### Added
- components scss structure
- created (shared) `EIconButton` component
  - default and `lg` sizes
  - add `to`, `href`, and `target`
- http -> https (`koa-sslify`)

## [0.0.1] - 04 October 2019

### Added
- initialized nuxt application
- setup essential bootstrap/-vue variables
- built `/styles` page (kitchen sink)
- built & configured auth pages
  - `/auth/login`
  - `/auth/callback`
  - `/auth/logout`
- built & configured middleware
  - `auth` - redirects users if tokens don't exist in environment
  - `axios` - configures all outbound api calls to use `api_url`
  - `env` - configures "environment" variables based on `config.json`
- configured AWS Cognito tokens endpoint
  - `POST auth/tokens` [getTokens.js]
- partially initialized Database architecture
  - init knexfile.js
  - init config/bookshelf
