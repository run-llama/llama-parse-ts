# Changelog

## [2.15.0](https://github.com/run-llama/llama-parse-ts/compare/v2.14.1...v2.15.0) (2026-08-28)


### Features

* **extract:** publish the turbo tier on the public API surface (LI-8873) ([0a9b65e](https://github.com/run-llama/llama-parse-ts/commit/0a9b65edf0ce6adbcba66f07334f27ea2ca9e9d5))

## [2.14.1](https://github.com/run-llama/llama-parse-ts/compare/v2.14.0...v2.14.1) (2026-08-20)


### Features

* **parse:** expose legal-document preset in v2 ([#24192](https://github.com/run-llama/llama-parse-ts/issues/24192)) ([e80af33](https://github.com/run-llama/llama-parse-ts/commit/e80af33ebaca8d694da8093c80fa072c3dbf2521))


### Bug Fixes

* **parse:** restore inline_images on cost_effective (new version 2026-08-11) ([#23804](https://github.com/run-llama/llama-parse-ts/issues/23804)) ([a532ea5](https://github.com/run-llama/llama-parse-ts/commit/a532ea5389e40c55067937a0dc018ec44b95210b))
* route security reports to support@runllama.ai; name LlamaIndex, Inc. in LICENSE ([#16](https://github.com/run-llama/llama-parse-ts/issues/16)) ([75e495f](https://github.com/run-llama/llama-parse-ts/commit/75e495f2c201b7ecc989edd6468597006f1a9041))


### Reverts

* expose legal-document preset in v2 ([110d2b0](https://github.com/run-llama/llama-parse-ts/commit/110d2b0ca8b455334585d0e010ed5466d7a4b0a3))


### Documentation

* fix non-compiling README examples (LI-8881) ([4edd2ad](https://github.com/run-llama/llama-parse-ts/commit/4edd2ad0e300559b827ae6cd55328b6f88d26429))

## [2.13.0](https://github.com/run-llama/llama-parse-ts/compare/v2.12.0...v2.13.0) (2026-07-22)


### Features

* **extract:** report num_pages_billed on extract job usage ([#22323](https://github.com/run-llama/llama-parse-ts/issues/22323)) ([2e3da28](https://github.com/run-llama/llama-parse-ts/commit/2e3da288675d99f91111ef587831eef7030f3409))
* **sheets:** cost_effective/agentic tiers and per-region billing ([#22508](https://github.com/run-llama/llama-parse-ts/issues/22508)) ([a1350b9](https://github.com/run-llama/llama-parse-ts/commit/a1350b9f6d6655754b27c231118e974dc33bdce7))

## [2.12.0](https://github.com/run-llama/llama-parse-ts/compare/v2.11.0...v2.12.0) (2026-07-21)


### Features

* **brokered-connection:** wire data-source create/read to brokered_connection_id ([#21699](https://github.com/run-llama/llama-parse-ts/issues/21699)) ([92df958](https://github.com/run-llama/llama-parse-ts/commit/92df958ca0da48ddbdabae3a3dd18fd463f387a7))
* **gdrive:** reuse-first connection picker in the data-source connect modal ([#21725](https://github.com/run-llama/llama-parse-ts/issues/21725)) ([4139205](https://github.com/run-llama/llama-parse-ts/commit/413920500f852e5252999b6decb63972562baa3c))
* **llamaparse:** agentic 2026-07-15 — Markdown-pipe table body for Gemini 3.1 Flash-Lite (EU primary) ([#22208](https://github.com/run-llama/llama-parse-ts/issues/22208)) ([19c059a](https://github.com/run-llama/llama-parse-ts/commit/19c059ae67c1bf8439c253a16ef93c0e1bdd437f))
* **parse:** adding forms pass to api layer (forms=`enrich` param + output types) ([#22012](https://github.com/run-llama/llama-parse-ts/issues/22012)) ([4a52e97](https://github.com/run-llama/llama-parse-ts/commit/4a52e97054de66538a985ed1ef4cefd52824318b))
* **parse:** confidence_scores="verified" — per-page AI-verified confidence + document-level score ([#22083](https://github.com/run-llama/llama-parse-ts/issues/22083)) ([239f9f3](https://github.com/run-llama/llama-parse-ts/commit/239f9f31c8d3cf76178bc587bbaa56609636556a))
* **parse:** rename confidence scoring option + billing event (confidence_score_effort / confidence_score_high) ([#22290](https://github.com/run-llama/llama-parse-ts/issues/22290)) ([49059bf](https://github.com/run-llama/llama-parse-ts/commit/49059bf875260943ef7ea4bfe33cecab894b8487))
* **sdk:** drop the `prod` project suffix from Go and Java namespaces ([3fb3bed](https://github.com/run-llama/llama-parse-ts/commit/3fb3bed3a700af0a540695fa04db4dabff3da536))


### Bug Fixes

* **parse:** declare the recursive form node schemas as models ([fe0a9a4](https://github.com/run-llama/llama-parse-ts/commit/fe0a9a45719fd04d59fd3ca0b459c83a34056165))

## [2.11.0](https://github.com/run-llama/llama-parse-ts/compare/v2.10.0...v2.11.0) (2026-07-09)


### Features

* **agentic-plus:** dated version 2026-07-08 — graduate decomposed-gemini (flash-lite), fallback to 2026-06-18 ([#21738](https://github.com/run-llama/llama-parse-ts/issues/21738)) ([9bdc8b6](https://github.com/run-llama/llama-parse-ts/commit/9bdc8b61cae2d541d89ddfd6085b943f5000b7e0))
* update fast tier latest version to use liteparse + markdown ([#21669](https://github.com/run-llama/llama-parse-ts/issues/21669)) ([c64e5fd](https://github.com/run-llama/llama-parse-ts/commit/c64e5fd636e98dd62828ab4be8c5266487d0520f))

## 2.9.0 (2026-06-09)

Full Changelog: [v2.8.0...v2.9.0](https://github.com/run-llama/llama-parse-ts/compare/v2.8.0...v2.9.0)

### Features

* **api:** api update ([4c0f78c](https://github.com/run-llama/llama-parse-ts/commit/4c0f78cba52bdbc60814533fe7b766b990d3fd7b))
* **api:** api update ([1f3c3ae](https://github.com/run-llama/llama-parse-ts/commit/1f3c3ae42790fa93d7a8f7dcbca7b1c53dc1930d))
* **api:** api update ([cc58ff8](https://github.com/run-llama/llama-parse-ts/commit/cc58ff845900fb4db9826643e7b736e8b16c9645))
* **api:** api update ([1552a14](https://github.com/run-llama/llama-parse-ts/commit/1552a14000d4e565ba9b32a0ae8052c27aa41652))
* **api:** api update ([d6c7874](https://github.com/run-llama/llama-parse-ts/commit/d6c7874b0253597570a9c5ade4d078590b88ef58))
* **api:** api update ([4e4091d](https://github.com/run-llama/llama-parse-ts/commit/4e4091d4d49c2bc22b80a71052b9e8fa50503805))


### Bug Fixes

* allow empty path from ui to fallback to default packages and avoid parsing problems ([7f63ef1](https://github.com/run-llama/llama-parse-ts/commit/7f63ef12c5eaccdc8c4fa9e29c842b124f212f0d))
* eslintignore ([b528694](https://github.com/run-llama/llama-parse-ts/commit/b5286941c62afd480ee2a9433753a2b689fcaf87))
* remove registry_url from the setup node action and rely on the one defined in the publishing script ([e81b46f](https://github.com/run-llama/llama-parse-ts/commit/e81b46f9c915f31df811e160daa4e57c22b9eaff))


### Chores

* update SDK settings ([398577f](https://github.com/run-llama/llama-parse-ts/commit/398577f70c45d8d42f5ebe605bd24fac277566dc))
* update SDK settings ([de82273](https://github.com/run-llama/llama-parse-ts/commit/de822734ada5d1cabfa0354059bd8a73e4b28854))


### Documentation

* index v2 examples ([a00bd7c](https://github.com/run-llama/llama-parse-ts/commit/a00bd7c381d478e091bdd5fc84c0e02a9f1572e8))

## 2.8.0 (2026-05-28)

Full Changelog: [v2.7.0...v2.8.0](https://github.com/run-llama/llama-parse-ts/compare/v2.7.0...v2.8.0)

### Features

* **api:** api update ([a4ac164](https://github.com/run-llama/llama-parse-ts/commit/a4ac16433ea44b039a3236722a3ea882512dc151))
* **api:** api update ([bd67a45](https://github.com/run-llama/llama-parse-ts/commit/bd67a4501b4826e5f8ebf69c865df4febfe6954e))
* **api:** batches support ([426038d](https://github.com/run-llama/llama-parse-ts/commit/426038d5471f8fca6e603873beab2ed3c36dc093))


### Bug Fixes

* **mcp:** use `pure-lockfile` when building mcp server ([df07213](https://github.com/run-llama/llama-parse-ts/commit/df072137963f39413a3ce1c15d1dc5494c32cc1b))

## 2.7.0 (2026-05-21)

Full Changelog: [v2.6.0...v2.7.0](https://github.com/run-llama/llama-parse-ts/compare/v2.6.0...v2.7.0)

### Features

* **api:** Adding in Resources For Retrieval and Chat ([6191a57](https://github.com/run-llama/llama-parse-ts/commit/6191a57e85d1958a2fadbfff71c227f3ecc09da5))
* **api:** api update ([d9f59d6](https://github.com/run-llama/llama-parse-ts/commit/d9f59d6b624a8df9c7c155d1c05700730298da1b))
* **api:** api update ([c3293f7](https://github.com/run-llama/llama-parse-ts/commit/c3293f7398f24a08669a5700df768d9d98c357a2))
* **api:** api update ([4ff1de4](https://github.com/run-llama/llama-parse-ts/commit/4ff1de4f2d13731cfcc241cf59e2ac48218214b6))
* **api:** api update ([ad064c2](https://github.com/run-llama/llama-parse-ts/commit/ad064c2f02906940dc545822a75852ef2365c9e0))
* **api:** api update ([171ab38](https://github.com/run-llama/llama-parse-ts/commit/171ab38cc12f43ce3ba6f79d6601481495796a48))
* **api:** api update ([6ced29f](https://github.com/run-llama/llama-parse-ts/commit/6ced29fa0de433e07074ac37a4b88cac06e6d8a3))
* **api:** api update ([bb024eb](https://github.com/run-llama/llama-parse-ts/commit/bb024ebecb9f446fbc0a887fab91257d8ed8143f))
* **api:** api update ([61ef427](https://github.com/run-llama/llama-parse-ts/commit/61ef4277f3efe1a69238f8c08afb0fc27bf73bac))
* **api:** swap grep and file search to grep/find + pagination ([f8d974c](https://github.com/run-llama/llama-parse-ts/commit/f8d974caa9c9f8fe564a90ed035ada1861b1776a))
* **api:** Updating indexes endpoints within the sub resources. ([1d0f434](https://github.com/run-llama/llama-parse-ts/commit/1d0f43464b99cc9422b032d311dd8a04cc482aaa))


### Bug Fixes

* **typescript:** upgrade tsc-multi so that it works with Node 26 ([85cf2fb](https://github.com/run-llama/llama-parse-ts/commit/85cf2fb5cc31bbd21e83bcc18e878ac415f8fc7c))


### Chores

* avoid formatting file that gets changed during releases ([260676d](https://github.com/run-llama/llama-parse-ts/commit/260676d188ade2b3fd9b1391529979164714d8c2))
* configure new SDK language ([5d06aa0](https://github.com/run-llama/llama-parse-ts/commit/5d06aa0bfe13d651a6ba9c6041accad4a1e925be))
* **internal:** version bump ([0323f7a](https://github.com/run-llama/llama-parse-ts/commit/0323f7ae3373812e4c60979812b0bd980a688823))
* redact api-key headers in debug logs ([88a8b08](https://github.com/run-llama/llama-parse-ts/commit/88a8b081ee8067a7054a42fced96d44d4b8f6772))
* **tests:** remove redundant File import ([b5d0991](https://github.com/run-llama/llama-parse-ts/commit/b5d09918d0195e66524bcbb969956f2086831c99))


### Documentation

* update http mcp docs ([136ce21](https://github.com/run-llama/llama-parse-ts/commit/136ce212ebd0625e72dab5e53b37b70261873565))

## 2.6.0 (2026-05-20)

Full Changelog: [v2.5.0...v2.6.0](https://github.com/run-llama/llama-parse-ts/compare/v2.5.0...v2.6.0)

### Features

* **api:** api update ([afd7060](https://github.com/run-llama/llama-parse-ts/commit/afd70605618b7f99e05344d1983f39f63194506a))
* support setting headers via env ([39f1244](https://github.com/run-llama/llama-parse-ts/commit/39f12444f48b1522a1f04b931b000bfbad78355a))


### Chores

* **format:** run eslint and prettier separately ([9f487c9](https://github.com/run-llama/llama-parse-ts/commit/9f487c94ec7133dc2913029a9bd47592e8e713a4))
* **internal:** codegen related update ([e3d89cd](https://github.com/run-llama/llama-parse-ts/commit/e3d89cdb945e19f0b891f78cb4eafd0d5422b27b))
* update SDK settings ([0a87797](https://github.com/run-llama/llama-parse-ts/commit/0a8779779080f3aa6bbb55f6776c26f3bdd83098))
* update SDK settings ([c0155b1](https://github.com/run-llama/llama-parse-ts/commit/c0155b1b19541155765de5b0ccfd76f59ed4cc3d))

## 2.5.0 (2026-04-29)

Full Changelog: [v2.4.1...v2.5.0](https://github.com/run-llama/llama-parse-ts/compare/v2.4.1...v2.5.0)

### Features

* **api:** api update ([fff3903](https://github.com/run-llama/llama-parse-ts/commit/fff390360da61decec1ab92210429974b4f33b9d))


### Chores

* **formatter:** run prettier and eslint separately ([7393e67](https://github.com/run-llama/llama-parse-ts/commit/7393e67613979984ee108560ea971d532ed88ad2))
* **internal:** codegen related update ([4509431](https://github.com/run-llama/llama-parse-ts/commit/45094310b3069da9e68268dcc36ccce200ce55d0))
* sync repo ([985eb21](https://github.com/run-llama/llama-parse-ts/commit/985eb21719b8226fb2e24f8322bcf95663f88dac))

## 2.4.1 (2026-04-17)

Full Changelog: [v2.4.0...v2.4.1](https://github.com/run-llama/llama-cloud-ts/compare/v2.4.0...v2.4.1)

### Bug Fixes

* **api:** Also support agent data `.create` for consistency ([05076d5](https://github.com/run-llama/llama-cloud-ts/commit/05076d5636c9bea969abcb58cba44048484f5fb0))
* **beta:** re-add agentData() alias for backwards compat ([#59](https://github.com/run-llama/llama-cloud-ts/issues/59)) ([6e4fd36](https://github.com/run-llama/llama-cloud-ts/commit/6e4fd363eab85da711e4543dfff5b755c738eccd))

## 2.4.0 (2026-04-16)

Full Changelog: [v2.3.0...v2.4.0](https://github.com/run-llama/llama-cloud-ts/compare/v2.3.0...v2.4.0)

### Features

* **api:** api update ([a01c154](https://github.com/run-llama/llama-cloud-ts/commit/a01c154e61851d05aea455724ba8433232128911))
* **api:** api update ([6120c9d](https://github.com/run-llama/llama-cloud-ts/commit/6120c9d79b1dbbf0ab9871b34969d1b14e3a8829))
* **api:** api update ([4624695](https://github.com/run-llama/llama-cloud-ts/commit/462469536fc105f4cdcbf823046779598175a419))
* **classify:** add waitForCompletion and run() helpers ([#57](https://github.com/run-llama/llama-cloud-ts/issues/57)) ([fc99e92](https://github.com/run-llama/llama-cloud-ts/commit/fc99e92727ad1ebcee8bc976d437795f7b3fd292))


### Chores

* fix example snippet imports ([975b94c](https://github.com/run-llama/llama-cloud-ts/commit/975b94c7d5ae7176a3aa52e762373ced139acc16))
* **internal:** codegen related update ([3e62868](https://github.com/run-llama/llama-cloud-ts/commit/3e62868017d2c02d562dad0e4716a755a60854d8))
* **internal:** codegen related update ([cfe2469](https://github.com/run-llama/llama-cloud-ts/commit/cfe2469a37bd8d3fad9ab6f06425ea610bddb767))
* **internal:** show error causes in MCP servers when running in local mode ([a22eca6](https://github.com/run-llama/llama-cloud-ts/commit/a22eca639a5953ef77a3c2a7d440b62aac8a6270))
* **mcp-server:** increase local docs search result count from 5 to 10 ([34104a4](https://github.com/run-llama/llama-cloud-ts/commit/34104a4a751d1980e84f24b13af09cf958851063))


### Documentation

* update examples ([ed02729](https://github.com/run-llama/llama-cloud-ts/commit/ed027293be711c9e618a526a971a47d53b717a1d))

## 2.3.0 (2026-04-07)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/run-llama/llama-cloud-ts/compare/v2.2.0...v2.3.0)

### Features

* **api:** remove parse configurations, superseded by generic configurations from 2.2.0 ([82100d7](https://github.com/run-llama/llama-cloud-ts/commit/82100d724f84fd739ecf0a03acb163807af7bb12))


### Chores

* **internal:** fix MCP server import ordering ([bf9a596](https://github.com/run-llama/llama-cloud-ts/commit/bf9a596877c8ca54a883ba8409f670b67eff9e05))

## 2.2.0 (2026-04-03)

Full Changelog: [v2.1.0...v2.2.0](https://github.com/run-llama/llama-cloud-ts/compare/v2.1.0...v2.2.0)

### Features

* **api:** Add product configurations ([1897e79](https://github.com/run-llama/llama-cloud-ts/commit/1897e798eafd15760d552375d2b2877b793a6bdf))

### Chores

* **internal:** fix MCP docker image builds in yarn projects ([b555e0c](https://github.com/run-llama/llama-cloud-ts/commit/b555e0c39c44ea7e4843e15ea1b5b985c61046dc))
* **internal:** use link instead of file in MCP server package.json files ([994db2a](https://github.com/run-llama/llama-cloud-ts/commit/994db2ab0dec8b9d375dc1b5b3074132c19da7c0))
* **mcp-server:** log client info ([7b0eb76](https://github.com/run-llama/llama-cloud-ts/commit/7b0eb762b01e72069243bcca9dd1a1b2ad8eaa08))

## 2.1.0 (2026-04-01)

Full Changelog: [v2.0.0...v2.1.0](https://github.com/run-llama/llama-cloud-ts/compare/v2.0.0...v2.1.0)

### Features

* **api:** api update ([3be01a3](https://github.com/run-llama/llama-cloud-ts/commit/3be01a376a29cf085d73e3af16c58ccbb852c133))
* **api:** api update ([6fc5797](https://github.com/run-llama/llama-cloud-ts/commit/6fc579733519a07f389bb99c08c3347a57979383))


### Chores

* **internal:** support type annotations when running MCP in local execution mode ([a218a5d](https://github.com/run-llama/llama-cloud-ts/commit/a218a5d99995a3188eefb94c41c5145ab23ef883))

## 2.0.0 (2026-03-31)

Full Changelog: [v1.8.0...v2.0.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.8.0...v2.0.0)

### ⚠ BREAKING CHANGES

* remove extraction v1 resource, extract v2 metadata restructure

### Features

* add run() and waitForCompletion() convenience methods to extract resource ([96d1aa0](https://github.com/run-llama/llama-cloud-ts/commit/96d1aa0aad573daa679f63f8bedc1bdcb36c3e71))
* **api:** api update ([61dc402](https://github.com/run-llama/llama-cloud-ts/commit/61dc402f47b78a1cf95c7e907095cb0840f89c10))
* **api:** api update ([024110d](https://github.com/run-llama/llama-cloud-ts/commit/024110d2008519712589d12328f656151c4858b6))
* **api:** api update ([965aedd](https://github.com/run-llama/llama-cloud-ts/commit/965aeddf978e993151109028308e8196b69e1c8d))
* **api:** api update ([9768450](https://github.com/run-llama/llama-cloud-ts/commit/9768450b84eceac169fb3cd739e41b6818517d97))
* **api:** api update ([4da25c2](https://github.com/run-llama/llama-cloud-ts/commit/4da25c23f06e0e071eeb8d169480dfa34736e4c3))
* **api:** api update ([3a5fb62](https://github.com/run-llama/llama-cloud-ts/commit/3a5fb62bf9c5ecfbb569a9455b79bb50575f57d4))
* **api:** api update ([4d6023d](https://github.com/run-llama/llama-cloud-ts/commit/4d6023d31e9268af855b8ea64ab0ae690e25cd64))
* **api:** api update ([fb3da19](https://github.com/run-llama/llama-cloud-ts/commit/fb3da19df447ed633807659e3c21af6ec2e9fc4f))
* **api:** api update ([278a91b](https://github.com/run-llama/llama-cloud-ts/commit/278a91b32496871530391c89e63548e90ae34b26))
* **api:** api update ([420402f](https://github.com/run-llama/llama-cloud-ts/commit/420402fdebb23e72ffac25d4e2fa52b10440429d))
* **api:** api update ([ae3d506](https://github.com/run-llama/llama-cloud-ts/commit/ae3d506c1bb5a7f24022da9e326d9e6a10b95244))
* **api:** api update ([99e6976](https://github.com/run-llama/llama-cloud-ts/commit/99e697600caac5e6eda908ec67779f3bc4dc74cb))
* **api:** api update ([1f4937c](https://github.com/run-llama/llama-cloud-ts/commit/1f4937c9ea1b9217b8153d302aae30d8d4f2a055))
* **api:** api update ([52f993b](https://github.com/run-llama/llama-cloud-ts/commit/52f993bac2030f522e67940b87a5adca5be6109f))
* **api:** manual updates ([8b4f3f1](https://github.com/run-llama/llama-cloud-ts/commit/8b4f3f1350de54e4597dde23c6c09d1d7fc72724))
* remove extraction v1 resource, extract v2 metadata restructure ([098acff](https://github.com/run-llama/llama-cloud-ts/commit/098acff189c66f4a9d5ba739146c69d7f31c3111))


### Bug Fixes

* **client:** preserve URL params already embedded in path ([462a010](https://github.com/run-llama/llama-cloud-ts/commit/462a010d3c1198289d28851ad54eb897b3cd9753))
* **internal:** gitignore generated `oidc` dir ([5458f1b](https://github.com/run-llama/llama-cloud-ts/commit/5458f1b67cb27a2c5a1046a7a935d01a715d3e15))
* prettier formatting for run() method signature ([2f519eb](https://github.com/run-llama/llama-cloud-ts/commit/2f519eb21b9a3e0a371cfb6444f15ecf543b8f8d))


### Chores

* **ci:** escape input path in publish-npm workflow ([f6824e5](https://github.com/run-llama/llama-cloud-ts/commit/f6824e58e99a78170e410bfed5f8bae7524f5540))
* **ci:** skip lint on metadata-only changes ([e724615](https://github.com/run-llama/llama-cloud-ts/commit/e72461500b0d98c233f6233cb6c264f317d7731d))
* **ci:** skip uploading artifacts on stainless-internal branches ([66dad00](https://github.com/run-llama/llama-cloud-ts/commit/66dad0082d5ff2c5ab27989d7f38405077d3b237))
* **internal:** bump @modelcontextprotocol/sdk, @hono/node-server, and minimatch ([c378b29](https://github.com/run-llama/llama-cloud-ts/commit/c378b29b9dd39f28a3e06362a486ef45ce91a10a))
* **internal:** codegen related update ([f020487](https://github.com/run-llama/llama-cloud-ts/commit/f020487075c0781a780a4ad0cb540ba7f6af419b))
* **internal:** fix MCP server TS errors that occur with required client options ([ae014b5](https://github.com/run-llama/llama-cloud-ts/commit/ae014b5eebfbae86babc6bc158a8b5ebcf833f5a))
* **internal:** improve local docs search for MCP servers ([161f73f](https://github.com/run-llama/llama-cloud-ts/commit/161f73fd4c0fed9763d2649abe536cc0f95a36d4))
* **internal:** improve local docs search for MCP servers ([bb404a1](https://github.com/run-llama/llama-cloud-ts/commit/bb404a177b9bf824d9dcdf452cb67434a8ed2b59))
* **internal:** make generated MCP servers compatible with Cloudflare worker environments ([ddaee8b](https://github.com/run-llama/llama-cloud-ts/commit/ddaee8b79ffe3f73e63c99e403fd95fdafc8b274))
* **internal:** support custom-instructions-path flag in MCP servers ([888b6d4](https://github.com/run-llama/llama-cloud-ts/commit/888b6d4c47a393873126f4037cf5533d830bb6bd))
* **internal:** support local docs search in MCP servers ([64936e2](https://github.com/run-llama/llama-cloud-ts/commit/64936e2761501b67e54a786ec7a58997f4fd5f70))
* **internal:** support x-stainless-mcp-client-envs header in MCP servers ([d354f6c](https://github.com/run-llama/llama-cloud-ts/commit/d354f6c722fb4c20b324609bb63188319822b33f))
* **internal:** support x-stainless-mcp-client-permissions headers in MCP servers ([fbf5cc1](https://github.com/run-llama/llama-cloud-ts/commit/fbf5cc1c95a1130ad3fbfe8d0b6174fcfee76561))
* **internal:** tweak CI branches ([60fb5de](https://github.com/run-llama/llama-cloud-ts/commit/60fb5de4915ca8fa067eb6a67460be536a491e77))
* **internal:** update dependencies to address dependabot vulnerabilities ([58642b7](https://github.com/run-llama/llama-cloud-ts/commit/58642b73ba6a7bce81e973829e5f616a24c5c553))
* **internal:** update gitignore ([4b34bb7](https://github.com/run-llama/llama-cloud-ts/commit/4b34bb7c1d9004c71008c92b09ae15b051b33b9a))
* **mcp-server:** add support for session id, forward client info ([097d2f8](https://github.com/run-llama/llama-cloud-ts/commit/097d2f8849edf3ba390d2ed55a3b6a7db1c6c93c))
* **mcp-server:** improve instructions ([30d149c](https://github.com/run-llama/llama-cloud-ts/commit/30d149ce56f129b0b9afc00b52430e165ade3370))
* update placeholder string ([e6c1a34](https://github.com/run-llama/llama-cloud-ts/commit/e6c1a346e6174b0f1351e15b92de7180074052e0))

## 1.8.0 (2026-03-05)

Full Changelog: [v1.7.0...v1.8.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.7.0...v1.8.0)

### Features

* **api:** add better deprecation messages ([249c29c](https://github.com/run-llama/llama-cloud-ts/commit/249c29c7eae0343136d84180305dfa4c9c833200))
* **api:** Add Classify V2 API ([466e946](https://github.com/run-llama/llama-cloud-ts/commit/466e946aa23b0d00ede11608a3d1b136560ed9bc))
* **api:** api update ([fffb54f](https://github.com/run-llama/llama-cloud-ts/commit/fffb54f32b7a4e31cd3631d8a150e6aecd0509c4))
* **api:** better deprecation config ([222f946](https://github.com/run-llama/llama-cloud-ts/commit/222f946dda7d71c29788c64c58f89d70e2c84800))
* support LLAMA_PARSE_API_KEY as fallback env var for authentication ([756b8de](https://github.com/run-llama/llama-cloud-ts/commit/756b8dedcf354cb28a981bf341eb0a442b1d39e5))


### Bug Fixes

* fix request delays for retrying to be more respectful of high requested delays ([b191726](https://github.com/run-llama/llama-cloud-ts/commit/b191726c37e8eaf7870151a4e6cdebc1f27294c8))


### Chores

* **internal:** use x-stainless-mcp-client-envs header for MCP remote code tool calls ([43a1bf2](https://github.com/run-llama/llama-cloud-ts/commit/43a1bf2fe8d25742442815b42e3b22305b89a33b))

## 1.7.0 (2026-03-03)

Full Changelog: [v1.6.0...v1.7.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.6.0...v1.7.0)

### Features

* **api:** api update ([1118a71](https://github.com/run-llama/llama-cloud-ts/commit/1118a71e1a81b008a0f010171055363fff91d029))
* **api:** api update ([3e86820](https://github.com/run-llama/llama-cloud-ts/commit/3e868203b1802b41fab57d8c23a8b929c7a31abe))
* **api:** api update ([e53cdc7](https://github.com/run-llama/llama-cloud-ts/commit/e53cdc779e95a2b7a3cfb0e1cff5603f6dfbd8ec))
* **mcp:** add an option to disable code tool ([59a4382](https://github.com/run-llama/llama-cloud-ts/commit/59a43823a951cf488f29da4af3136a71eec9d437))


### Bug Fixes

* **docs/contributing:** correct pnpm link command ([8ebcd1e](https://github.com/run-llama/llama-cloud-ts/commit/8ebcd1eb8a1276b5d774d4a7c35a99dc58de767e))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([586ef99](https://github.com/run-llama/llama-cloud-ts/commit/586ef99cc38543cae92003a6ad3c076b97b5e15a))
* **mcp:** update prompt ([51ff157](https://github.com/run-llama/llama-cloud-ts/commit/51ff1578bb202b50c9df2d900ae868f918bec825))


### Chores

* **internal:** cache fetch instruction calls in MCP server ([1910716](https://github.com/run-llama/llama-cloud-ts/commit/1910716b6965286951b05e2cbae6839117df7d81))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([c71507a](https://github.com/run-llama/llama-cloud-ts/commit/c71507adf02a899adb554e0feadfa161477253c9))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([8cafa3b](https://github.com/run-llama/llama-cloud-ts/commit/8cafa3b5ebdcf3cde636edacb5a8fe81c1537df7))
* **internal:** make MCP code execution location configurable via a flag ([753240c](https://github.com/run-llama/llama-cloud-ts/commit/753240c9d3e0e813ca22b999076cd86bcb923107))
* **internal:** move stringifyQuery implementation to internal function ([c5931c5](https://github.com/run-llama/llama-cloud-ts/commit/c5931c55cd5e961173c4ffbf7485496bc6280579))
* **internal:** remove mock server code ([28fd07f](https://github.com/run-llama/llama-cloud-ts/commit/28fd07f362276fbda68955d0ef27ea3e53f2380e))
* **internal:** switch MCP servers to use pino for logging ([f4b2326](https://github.com/run-llama/llama-cloud-ts/commit/f4b232620c447f2043b3ccc4a7eda0799f6e38dc))
* **internal:** upgrade @modelcontextprotocol/sdk and hono ([4161193](https://github.com/run-llama/llama-cloud-ts/commit/4161193bf554873976f442c0f62511af9a2dfbca))
* **mcp-server:** return access instructions for 404 without API key ([fe1526d](https://github.com/run-llama/llama-cloud-ts/commit/fe1526d4d9e09feb074affe5c2690bc0ca0167d8))
* **mcp:** correctly update version in sync with sdk ([89f6113](https://github.com/run-llama/llama-cloud-ts/commit/89f6113e42525fd8533b18e58a77d8b859b85d39))
* update mock server docs ([9536239](https://github.com/run-llama/llama-cloud-ts/commit/9536239d4291dac002823d687ba74055ed7e175d))

## 1.6.0 (2026-02-18)

Full Changelog: [v1.5.0...v1.6.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.5.0...v1.6.0)

### Features

* **api:** api update ([73206e4](https://github.com/run-llama/llama-cloud-ts/commit/73206e482c7a384aa592fa19bc87d7c71484557c))


### Chores

* **internal/client:** fix form-urlencoded requests ([2d71aaa](https://github.com/run-llama/llama-cloud-ts/commit/2d71aaa42e346dfe749c57e85c00e9b8e545457e))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([be4f208](https://github.com/run-llama/llama-cloud-ts/commit/be4f20865fd505dbc771b7b7299fde7045083297))
* **internal:** avoid type checking errors with ts-reset ([b72cbf3](https://github.com/run-llama/llama-cloud-ts/commit/b72cbf3ce1fa2bfd7b9a58e1c5651417580a136e))
* **internal:** improve layout of generated MCP server files ([9bbf5a2](https://github.com/run-llama/llama-cloud-ts/commit/9bbf5a29a9154c852fcd90942a798b14c71d62d9))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([5ce3838](https://github.com/run-llama/llama-cloud-ts/commit/5ce3838f31c015457f04152ee704631ee39a1f37))

## 1.5.0 (2026-02-12)

Full Changelog: [v1.4.0...v1.5.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.4.0...v1.5.0)

### Features

* **api:** api update ([497bf51](https://github.com/run-llama/llama-cloud-ts/commit/497bf51dd9197d00ced688523ac290b6970cee59))


### Bug Fixes

* **client:** avoid removing abort listener too early ([35ed735](https://github.com/run-llama/llama-cloud-ts/commit/35ed73563d7626c6f6c87e1e622eabe53574bb99))
* **types:** correctly define false enum ([eb774cf](https://github.com/run-llama/llama-cloud-ts/commit/eb774cf9334b06639b78fc8f27ce7d6b223eec72))


### Chores

* **api:** minor updates ([5510bb1](https://github.com/run-llama/llama-cloud-ts/commit/5510bb19191b9ee5e5c78fbd10bbb1583886eb64))
* **internal:** add health check to MCP server when running in HTTP mode ([2aafc6b](https://github.com/run-llama/llama-cloud-ts/commit/2aafc6b869a719b903f2d7539ea7f8afa270ec8a))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([a262cff](https://github.com/run-llama/llama-cloud-ts/commit/a262cff49824499b7a392cc84061e73e9f32c23c))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([bfec623](https://github.com/run-llama/llama-cloud-ts/commit/bfec6235d47b6d6788235533bad2cc50eee71428))
* **internal:** fix pagination internals not accepting option promises ([8ce5e8f](https://github.com/run-llama/llama-cloud-ts/commit/8ce5e8fc342ef4c3a1724df2acb75f3f2f53a344))

## 1.4.0 (2026-02-05)

Full Changelog: [v1.3.0...v1.4.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.3.0...v1.4.0)

### Features

* **mcp:** add initial server instructions ([4d00a81](https://github.com/run-llama/llama-cloud-ts/commit/4d00a818b4de576d34422cb00a13a34b38fe4dfa))


### Chores

* **client:** restructure abort controller binding ([17ad7cf](https://github.com/run-llama/llama-cloud-ts/commit/17ad7cf1fc18b949eee92ff9842c7d00fe062280))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([6d493d7](https://github.com/run-llama/llama-cloud-ts/commit/6d493d7cd0ba5582aba4f3894e447f806d67bb6c))

## 1.3.0 (2026-02-04)

Full Changelog: [v1.2.0...v1.3.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.2.0...v1.3.0)

### Features

* add cookie-based auth support for browser environments ([#36](https://github.com/run-llama/llama-cloud-ts/issues/36)) ([52fdba3](https://github.com/run-llama/llama-cloud-ts/commit/52fdba34380ae3336e0ba917be2fe821c0c6d0e2))
* **api:** api update ([fbdfe8d](https://github.com/run-llama/llama-cloud-ts/commit/fbdfe8d1ff00643bd297c71bf8c2c212c493eee5))
* **api:** manual updates ([0e6388f](https://github.com/run-llama/llama-cloud-ts/commit/0e6388f0c27aad159e77bba1204fa6256190a8c3))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([609080b](https://github.com/run-llama/llama-cloud-ts/commit/609080b4d8698abdec7aafc6bfcec6f0cc42d23a))
* throw error on empty expand parameter in e2e 'parse' method ([ac77e24](https://github.com/run-llama/llama-cloud-ts/commit/ac77e2498245e5cf2a1e9072cfad6de5c9ece4e4))


### Chores

* **client:** do not parse responses with empty content-length ([162b998](https://github.com/run-llama/llama-cloud-ts/commit/162b9981c2687bf5ae7811478e99f6c9f1273752))
* **internal:** support oauth authorization code flow for MCP servers ([d661ac4](https://github.com/run-llama/llama-cloud-ts/commit/d661ac4bc9b0aaa25c9c076e77cad9a078e1f8c4))

## 1.2.0 (2026-01-30)

Full Changelog: [v1.1.0...v1.2.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.1.0...v1.2.0)

### Features

* **api:** api update ([986df16](https://github.com/run-llama/llama-cloud-ts/commit/986df16ed546557eb6cb8d2b21e9e3cdc538dbcd))
* **api:** api update ([799ccd4](https://github.com/run-llama/llama-cloud-ts/commit/799ccd45d13fd6143c72da6178bb125839d2f60b))
* **api:** api update ([8abbae2](https://github.com/run-llama/llama-cloud-ts/commit/8abbae2cf8348297c775ce8e20c5adcb4782b21f))
* **api:** api update ([37cc9d9](https://github.com/run-llama/llama-cloud-ts/commit/37cc9d915c5268396db0284ef986258443185636))
* **api:** manual updates - Google Drive ([f501366](https://github.com/run-llama/llama-cloud-ts/commit/f50136685b257654bf92245f56c182dc495fca41))
* **api:** Reordering resources ([e4bc61f](https://github.com/run-llama/llama-cloud-ts/commit/e4bc61fe8003d10e6261b34843c43598af3ad885))


### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([64b5e1c](https://github.com/run-llama/llama-cloud-ts/commit/64b5e1cb34aca06a89416dc32d6a2aa8a14b1423))
* **mcp:** allow falling back for required env variables ([52e2cb9](https://github.com/run-llama/llama-cloud-ts/commit/52e2cb9ac2240b3b5c81b2d6887d698590bfe326))
* **publish:** use npm registry directly for trusted publishing support ([45312cc](https://github.com/run-llama/llama-cloud-ts/commit/45312cceab939805f073e6871411c94e1989694b))


### Chores

* **internal:** codegen related update ([ef15441](https://github.com/run-llama/llama-cloud-ts/commit/ef15441ce7c2c5d33b0944515796ab47170c3b41))
* **internal:** codegen related update ([6f4e1eb](https://github.com/run-llama/llama-cloud-ts/commit/6f4e1eb5738522a85f687ad1fe120eeaa6f9c9bd))
* **mcp:** up tsconfig lib version to es2022 ([6bbfcf2](https://github.com/run-llama/llama-cloud-ts/commit/6bbfcf2137ef1510e5a7e02d6d0e1daf446da373))

## 1.1.0 (2026-01-24)

Full Changelog: [v1.0.0...v1.1.0](https://github.com/run-llama/llama-cloud-ts/compare/v1.0.0...v1.1.0)

### Features

* **api:** api update ([7e548d9](https://github.com/run-llama/llama-cloud-ts/commit/7e548d9a9444c8c4ec8b90edc259ea352bcdde8b))
* **api:** api update ([46a30ab](https://github.com/run-llama/llama-cloud-ts/commit/46a30abece07fba5f5ef70158ee409f502f6845b))


### Chores

* **ci:** upgrade `actions/github-script` ([be78ddc](https://github.com/run-llama/llama-cloud-ts/commit/be78ddcbd5552ba1496589274aa76b1a50f5dae3))
* **internal:** update lock file ([0055150](https://github.com/run-llama/llama-cloud-ts/commit/005515017615317e372ac07dc796a3ce4a3e9175))

## 1.0.0 (2026-01-21)

Full Changelog: [v0.17.0...v1.0.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.17.0...v1.0.0)

### Features

* **api:** api update ([a2d99d8](https://github.com/run-llama/llama-cloud-ts/commit/a2d99d807e528c2704f936afe4bc57ebb0ecc617))

## 0.17.0 (2026-01-19)

Full Changelog: [v0.16.0...v0.17.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.16.0...v0.17.0)

### Features

* **api:** api update ([a76b3b5](https://github.com/run-llama/llama-cloud-ts/commit/a76b3b550304bcd67d17e7b806a50ab57596020f))


### Chores

* **internal:** update `actions/checkout` version ([f7a7aa1](https://github.com/run-llama/llama-cloud-ts/commit/f7a7aa168d2e099d9e3fc7fe989d570482bfaefc))

## 0.16.0 (2026-01-17)

Full Changelog: [v0.15.3...v0.16.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.15.3...v0.16.0)

### Features

* **api:** api update ([fe67667](https://github.com/run-llama/llama-cloud-ts/commit/fe67667a10f7e25fd2192ca0c0f466cbab4bdcb7))


### Bug Fixes

* Parse examples in comments ([e69d254](https://github.com/run-llama/llama-cloud-ts/commit/e69d2541dba4efabb7c031ed55a01eb5cb5cf84d))

## 0.15.3 (2026-01-16)

Full Changelog: [v0.15.2...v0.15.3](https://github.com/run-llama/llama-cloud-ts/compare/v0.15.2...v0.15.3)

## 0.15.2 (2026-01-16)

Full Changelog: [v0.15.1...v0.15.2](https://github.com/run-llama/llama-cloud-ts/compare/v0.15.1...v0.15.2)

## 0.15.1 (2026-01-16)

Full Changelog: [v0.15.0...v0.15.1](https://github.com/run-llama/llama-cloud-ts/compare/v0.15.0...v0.15.1)

## 0.15.0 (2026-01-16)

Full Changelog: [v0.14.1...v0.15.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.14.1...v0.15.0)

### Features

* **api:** adding oidc for npm publishing ([9b5f1e6](https://github.com/run-llama/llama-cloud-ts/commit/9b5f1e600566d016cfedc2ded7a1fc851376d5c5))
* **api:** Consolidate more pagination, rename functions ([6156441](https://github.com/run-llama/llama-cloud-ts/commit/6156441eb6617d9394530eb63eca14054f974b25))
* **api:** manual updates ([741ea9c](https://github.com/run-llama/llama-cloud-ts/commit/741ea9c3bf38b9d9c4457164d329f8c9d441316c))


### Chores

* **internal:** upgrade babel, qs, js-yaml ([e212b85](https://github.com/run-llama/llama-cloud-ts/commit/e212b856be7f01ff437aeae9a1eaf84f5f9b8fa8))
* **mcp:** add intent param to execute tool ([1743c32](https://github.com/run-llama/llama-cloud-ts/commit/1743c32d59534b7c6833105a981639f60481da19))
* **mcp:** pass intent param to execute handler ([501b60e](https://github.com/run-llama/llama-cloud-ts/commit/501b60e460e21a1e80c6b1f90c99cc4e8c2328a3))
* **mcp:** upgrade dependencies ([c9bbf4c](https://github.com/run-llama/llama-cloud-ts/commit/c9bbf4ce9bef23ac44e56dce8cf1370d35a3ca1f))

## 0.14.1 (2026-01-14)

Full Changelog: [v0.14.0...v0.14.1](https://github.com/run-llama/llama-cloud-ts/compare/v0.14.0...v0.14.1)

### Chores

* update SDK settings ([594003b](https://github.com/run-llama/llama-cloud-ts/commit/594003b1cfb25e06cbf51cc0f911ed6605e9f6d3))

## 0.14.0 (2026-01-14)

Full Changelog: [v0.13.1...v0.14.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.13.1...v0.14.0)

### Features

* **api:** manual updates ([b0b6576](https://github.com/run-llama/llama-cloud-ts/commit/b0b6576dbdf3c7e9871815c71c1317317d7999d0))
* **api:** manual updates ([e9e3ef6](https://github.com/run-llama/llama-cloud-ts/commit/e9e3ef68c223df45f155cb553f44123cbd758dd0))
* **api:** Remove extract batch ([850ba20](https://github.com/run-llama/llama-cloud-ts/commit/850ba20abd41cb5ad516662c7018764f29392c1c))
* **api:** Remove extract batch ([1167d9b](https://github.com/run-llama/llama-cloud-ts/commit/1167d9b8a24e01173a699d79ebd2523b8337a9ee))


### Bug Fixes

* comments and example ([a3358c9](https://github.com/run-llama/llama-cloud-ts/commit/a3358c9df6826e7bf5265e4abf6afba89406d5fc))
* comments and example ([a3358c9](https://github.com/run-llama/llama-cloud-ts/commit/a3358c9df6826e7bf5265e4abf6afba89406d5fc))

## 0.13.1 (2026-01-14)

Full Changelog: [v0.13.0...v0.13.1](https://github.com/run-llama/llama-cloud-ts/compare/v0.13.0...v0.13.1)

### Chores

* configure new SDK language ([c997afd](https://github.com/run-llama/llama-cloud-ts/commit/c997afd2d11ca230a094a868ce86f87b31c0ef3f))
* **internal:** configure MCP Server hosting ([3388583](https://github.com/run-llama/llama-cloud-ts/commit/33885835e3c033b4cdf8c19cd2d96933154d44df))

## 0.13.0 (2026-01-10)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.12.0...v0.13.0)

### Features

* **api:** api update ([de73699](https://github.com/run-llama/llama-cloud-ts/commit/de7369971a4a290e5704cc5934e9ed3e695f5bb3))
* **api:** manual updates ([028da8f](https://github.com/run-llama/llama-cloud-ts/commit/028da8fc73389c76b139639f3c8f33d831154575))

## 0.12.0 (2026-01-08)

Full Changelog: [v0.11.0...v0.12.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.11.0...v0.12.0)

### Features

* **api:** add list commands to pipeline file images ([f3d15aa](https://github.com/run-llama/llama-cloud-ts/commit/f3d15aa753772365c0fcdf98842d9bf91d1192d1))


### Chores

* break long lines in snippets into multiline ([be79fed](https://github.com/run-llama/llama-cloud-ts/commit/be79fedccaace854ac3e9359e9db811201850749))

## 0.11.0 (2026-01-07)

Full Changelog: [v0.10.0...v0.11.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.10.0...v0.11.0)

### Features

* **api:** add back pipeline files ([030ed5a](https://github.com/run-llama/llama-cloud-ts/commit/030ed5ac7d900abee20101a7f6fbd6a646998b74))
* **api:** add pipelines image utils ([d63dea5](https://github.com/run-llama/llama-cloud-ts/commit/d63dea5e06ec184fe4bd5c7fd61eacbd4a316c25))
* **api:** api update ([37ffb79](https://github.com/run-llama/llama-cloud-ts/commit/37ffb79d2934544e9826fd03eabef5016e412777))
* **api:** api update ([59d9aa7](https://github.com/run-llama/llama-cloud-ts/commit/59d9aa7540380053fd70c967bd52397fe4e2479c))
* **api:** api update ([8ca9422](https://github.com/run-llama/llama-cloud-ts/commit/8ca94227fc74a7e00a4a996f6b3ccbbec06e607e))
* **api:** api update ([f29c0e6](https://github.com/run-llama/llama-cloud-ts/commit/f29c0e6a25d3e7818ee5a02ecb8826fd28cdb1bf))
* **api:** Fix readme ([e19ac1c](https://github.com/run-llama/llama-cloud-ts/commit/e19ac1c709ad8c9ef07f645a2d3bd4848d04f7a7))
* **api:** swap in files v2 support ([b946834](https://github.com/run-llama/llama-cloud-ts/commit/b94683432cd3b74b30abdb5c740fa48d20cfd7d8))
* **api:** typo ([ccf6c44](https://github.com/run-llama/llama-cloud-ts/commit/ccf6c446cda52b927888d8ff27ffc197b0de36ee))

## 0.10.0 (2026-01-06)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.9.0...v0.10.0)

### Features

* **api:** api update ([e216e29](https://github.com/run-llama/llama-cloud-ts/commit/e216e294c2e7a8d3bc988935a45b317fdb66e0eb))
* **api:** update ts package name ([9a620bf](https://github.com/run-llama/llama-cloud-ts/commit/9a620bfc51605903718d01a5c8214f0b79a23786))


### Chores

* **internal:** codegen related update ([992cdd7](https://github.com/run-llama/llama-cloud-ts/commit/992cdd7b583e22d19dc6c5b3f6b277d72b2fd6fb))

## 0.9.0 (2025-12-23)

Full Changelog: [v0.8.1...v0.9.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.8.1...v0.9.0)

### Features

* **api:** api update ([99e1075](https://github.com/run-llama/llama-cloud-ts/commit/99e1075e19311a88c29d8d889732b542ffc6ba89))
* **api:** api update ([e449fe1](https://github.com/run-llama/llama-cloud-ts/commit/e449fe10c862ebfd0069b22628ab2721e68130ad))
* **api:** api update ([fbbc9fc](https://github.com/run-llama/llama-cloud-ts/commit/fbbc9fc357c9ca2fe7941cc1ae67657295b48511))
* **api:** api update ([46fea14](https://github.com/run-llama/llama-cloud-ts/commit/46fea14bebb8945f033dce9699efc69fdd5b74ac))
* **api:** api update ([2da62c7](https://github.com/run-llama/llama-cloud-ts/commit/2da62c79711b8e2f8d2bdfc7206cdaf2c16f169b))
* **api:** api update ([bdbb7d8](https://github.com/run-llama/llama-cloud-ts/commit/bdbb7d865a39a03f82cf8ca74eb3c70e8bfc1e74))
* **api:** parse v2 updates ([d0c1980](https://github.com/run-llama/llama-cloud-ts/commit/d0c198039fc10caba726f3f362b3ad7007970f66))
* **api:** swap in parse v2 support ([31e56cf](https://github.com/run-llama/llama-cloud-ts/commit/31e56cfc72d39a5190a8913592c692c60c029d41))
* **api:** update readme ([1ed4d6a](https://github.com/run-llama/llama-cloud-ts/commit/1ed4d6aa86a873f574c9f8ae5f20277cc12afd55))
* **api:** use repeat query params with and char ([c51e1a6](https://github.com/run-llama/llama-cloud-ts/commit/c51e1a69a82402859ad6139097a295fdbd6167cd))


### Chores

* **internal:** codegen related update ([2da8f95](https://github.com/run-llama/llama-cloud-ts/commit/2da8f9546116815691d866535f631cecc9793570))

## 0.8.1 (2025-12-06)

Full Changelog: [v0.8.0...v0.8.1](https://github.com/run-llama/llama-cloud-ts/compare/v0.8.0...v0.8.1)

### Bug Fixes

* **mcp:** correct code tool API endpoint ([4be8229](https://github.com/run-llama/llama-cloud-ts/commit/4be8229897ff09547ca3ff2d77ca4f1a5a514921))
* **mcp:** return correct lines on typescript errors ([53e6cf6](https://github.com/run-llama/llama-cloud-ts/commit/53e6cf67e6719f579cb919ab27bc6872b7b4b8f9))


### Chores

* **internal:** codegen related update ([f8a6f4c](https://github.com/run-llama/llama-cloud-ts/commit/f8a6f4c45ef078897704a12aef89ecac7d28a274))
* **internal:** codegen related update ([0f7b512](https://github.com/run-llama/llama-cloud-ts/commit/0f7b512b81172b98df6043451b4fe17831e54d3e))

## 0.8.0 (2025-12-04)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.7.0...v0.8.0)

### Features

* **api:** add list page screenshots/figures ([c24fc9c](https://github.com/run-llama/llama-cloud-ts/commit/c24fc9cf2c17baa114e532aa7067bfde151cbc9c))

## 0.7.0 (2025-12-03)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.6.0...v0.7.0)

### Features

* **api:** add split ([387bf2e](https://github.com/run-llama/llama-cloud-ts/commit/387bf2e29e60ec877b91b5bf1e7fdd330b7ba558))


### Chores

* **internal:** upgrade eslint ([31a164f](https://github.com/run-llama/llama-cloud-ts/commit/31a164f8bc2d23ba04018d81e1268f77070a5889))

## 0.6.0 (2025-12-03)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.5.0...v0.6.0)

### Features

* **api:** add some missing endpoints ([00263ce](https://github.com/run-llama/llama-cloud-ts/commit/00263ce32190c3f14b6ab7ac1d3407dbba9d97fb))

## 0.5.0 (2025-12-02)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.4.0...v0.5.0)

### Features

* **api:** api update ([e200adc](https://github.com/run-llama/llama-cloud-ts/commit/e200adcad2968ab152e5bcc3e10091837e738c57))

## 0.4.0 (2025-12-02)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.3.0...v0.4.0)

### Features

* **api:** add back projects list/get ([e150597](https://github.com/run-llama/llama-cloud-ts/commit/e150597c6c9c55e656c2e827281ffc37f52742c3))
* **api:** add get page figure/screenshot methods ([5264e78](https://github.com/run-llama/llama-cloud-ts/commit/5264e78a2f5627df4ab2e8ae773cfa1c8158d166))
* **api:** add pipeline.retrieve method ([284ec83](https://github.com/run-llama/llama-cloud-ts/commit/284ec8389b0d22f172581bcf43aa64159be06ab6))
* **api:** api update ([ae8dd73](https://github.com/run-llama/llama-cloud-ts/commit/ae8dd7333702108645b3d01d164ea375833442e2))
* **api:** api update ([417ae7b](https://github.com/run-llama/llama-cloud-ts/commit/417ae7b50ff6b612f8def36d1b7b86b7f6b2bf54))
* **api:** api update ([19aa818](https://github.com/run-llama/llama-cloud-ts/commit/19aa8185c589a2f5195eba24a232b7d6aa21902e))
* **api:** api update ([2ea1fa7](https://github.com/run-llama/llama-cloud-ts/commit/2ea1fa715769b1eec6497ea5e9f01a5ebbf9f994))
* **api:** api update ([56d6f9b](https://github.com/run-llama/llama-cloud-ts/commit/56d6f9bdc08dfd11878a78e215c4eab57c0d1fb4))
* **api:** api update ([4deb4e5](https://github.com/run-llama/llama-cloud-ts/commit/4deb4e5c2a554e975cc4ecb08aa5a3fb0ffedf58))
* **api:** api update ([177da82](https://github.com/run-llama/llama-cloud-ts/commit/177da82b884da08495c1bf42eb22da4f2ba6ca10))
* **api:** fix api key name ([09f3e90](https://github.com/run-llama/llama-cloud-ts/commit/09f3e90fd7b164a0c3a809eb8c8a63adfc5a0533))
* **api:** fix readme example ([0e2f151](https://github.com/run-llama/llama-cloud-ts/commit/0e2f151bb0931aac69b198c7c6f025c2a56cdf7e))
* **api:** manual updates ([9bc7a62](https://github.com/run-llama/llama-cloud-ts/commit/9bc7a623e1c8c84b0f68cb3bf8a80fc95124e7d1))
* **api:** manual updates ([b1aca0f](https://github.com/run-llama/llama-cloud-ts/commit/b1aca0f73226c4ea5f99fb4378be9d2232f79871))
* **api:** update extract API endpoints ([485573f](https://github.com/run-llama/llama-cloud-ts/commit/485573f3f52b9f871bc938055248767d46272e5e))


### Chores

* **client:** fix logger property type ([2b784ef](https://github.com/run-llama/llama-cloud-ts/commit/2b784ef2f802af81470d37a74f4a000e2d634abd))

## 0.3.0 (2025-11-23)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.2.0...v0.3.0)

### Features

* **api:** Add missing api endpoints ([cf1d957](https://github.com/run-llama/llama-cloud-ts/commit/cf1d95707439140f4194e6352ce44a539c2ca12a))
* **api:** api update ([d97a3e8](https://github.com/run-llama/llama-cloud-ts/commit/d97a3e8f2c0bfcbf92d325a4ee5f734a6c8a9b55))
* **api:** api update ([3fc8ca5](https://github.com/run-llama/llama-cloud-ts/commit/3fc8ca5873817720f97d44bea99216c07b8dba5c))
* **api:** api update ([a50086a](https://github.com/run-llama/llama-cloud-ts/commit/a50086ad5581dfdfe48d3c34ed6469e166767b19))
* **api:** manual updates ([08e59a5](https://github.com/run-llama/llama-cloud-ts/commit/08e59a5803ab98fa27eeb0a869159568c7c11e1b))
* **api:** manual updates ([df65235](https://github.com/run-llama/llama-cloud-ts/commit/df652355d174968aeb162c729568badfd0b7b1d5))
* **api:** manual updates ([07c5cfa](https://github.com/run-llama/llama-cloud-ts/commit/07c5cfa3094a3a092868d8057e0f9e4f54c6e2cf))
* **api:** manual updates ([ad73aa2](https://github.com/run-llama/llama-cloud-ts/commit/ad73aa299c9d4ece0f3335655fcccf509ffd21a7))
* **api:** manual updates ([80cd9d8](https://github.com/run-llama/llama-cloud-ts/commit/80cd9d8b165de8f4dc44b2fd3449279b91203112))
* **api:** manual updates ([3d06c4f](https://github.com/run-llama/llama-cloud-ts/commit/3d06c4f299e7e579f7e593ea1559a8065b3b6ccb))
* **api:** manual updates ([4c5c5ed](https://github.com/run-llama/llama-cloud-ts/commit/4c5c5ed6bcba1d4379ac8200dd6ba1214e4da132))
* **api:** manual updates ([80e6dbd](https://github.com/run-llama/llama-cloud-ts/commit/80e6dbdba2208ef92078f4e1a103aac06b4f4f3c))
* **api:** manual updates ([ec1eb5d](https://github.com/run-llama/llama-cloud-ts/commit/ec1eb5d79a0ce9cd77c46ef04741fa572065e54a))
* **api:** manual updates ([421ddd6](https://github.com/run-llama/llama-cloud-ts/commit/421ddd60be606e59bd7bc83e5696a3dc7a0f7d0a))
* **api:** manual updates ([780cb09](https://github.com/run-llama/llama-cloud-ts/commit/780cb0911d132bfb78257aa455ecdb8ad960652e))
* **api:** manual updates ([46c5cae](https://github.com/run-llama/llama-cloud-ts/commit/46c5cae7e6e00fe0fb8fc91171c882efb7237735))
* **api:** manual updates ([5374b1d](https://github.com/run-llama/llama-cloud-ts/commit/5374b1de26a6a0b3e5391eaec14cdf51ec023deb))
* **api:** remove some agent items ([12ec7bd](https://github.com/run-llama/llama-cloud-ts/commit/12ec7bd41941a4c195e474378474a10f64909b93))

## 0.2.0 (2025-11-19)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.1.0...v0.2.0)

### Features

* **api:** api update ([41a4630](https://github.com/run-llama/llama-cloud-ts/commit/41a463002726dc0e42cc11b6d1406233d083b7b5))

## 0.1.0 (2025-11-07)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/run-llama/llama-cloud-ts/compare/v0.0.1...v0.1.0)

### Features

* **api:** add pagination config ([767cb71](https://github.com/run-llama/llama-cloud-ts/commit/767cb7128961d9cf8faa19dd7aa146cd933e8ab2))
* **api:** api update ([7256893](https://github.com/run-llama/llama-cloud-ts/commit/72568936744b7842c2f1cac4ea55a31cb07e11bc))
* **api:** api update ([a41c28e](https://github.com/run-llama/llama-cloud-ts/commit/a41c28e8e33f1ff0fb688997ec5b6d9a646b5be4))
* **api:** api update ([a7e04f6](https://github.com/run-llama/llama-cloud-ts/commit/a7e04f6e3378bc1d2e152325385bbbdf1519974c))
* **api:** api update ([ac1995f](https://github.com/run-llama/llama-cloud-ts/commit/ac1995f26ae176281e7bfdac37cf8bb0b79b36f5))
* **api:** api update ([11eaa79](https://github.com/run-llama/llama-cloud-ts/commit/11eaa79c5d47a7e5620cbe1ffc16e0fb287eba74))
* **api:** api update ([dfbdefe](https://github.com/run-llama/llama-cloud-ts/commit/dfbdefe92e76fdbaef99620087c12883f1c0cc1d))
* **api:** clean up schemas ([24669f5](https://github.com/run-llama/llama-cloud-ts/commit/24669f55f1e2a4a2b5e018a4e129fb11cb2fc60a))
* **api:** fix pagination example in readme ([03f0a92](https://github.com/run-llama/llama-cloud-ts/commit/03f0a923162cef97f4e6b3e976bd3d224af67be4))
* **api:** manual updates ([3e04c31](https://github.com/run-llama/llama-cloud-ts/commit/3e04c31abc367d601be6d7c53e1567069f4023b8))
* **api:** manual updates ([813ea80](https://github.com/run-llama/llama-cloud-ts/commit/813ea80f9f1a6edf77253b508af4b1f77d6c2d9e))
* **api:** manual updates ([a5b45f3](https://github.com/run-llama/llama-cloud-ts/commit/a5b45f35ef04dc94861d056ccf1c80b7771fa97a))
* **api:** manual updates ([b2d6e4b](https://github.com/run-llama/llama-cloud-ts/commit/b2d6e4b537f0468c516554a293e6ae05387d11a1))
* **api:** manual updates ([51620bb](https://github.com/run-llama/llama-cloud-ts/commit/51620bb412b1e4b83703ca8b03b95e257b0f5195))
* **api:** manual updates ([14fe363](https://github.com/run-llama/llama-cloud-ts/commit/14fe3638da70b67680ac322a88dab6f58c67a56c))
* **api:** more cleanup ([bcab42d](https://github.com/run-llama/llama-cloud-ts/commit/bcab42d85f78b2516f865a5a76c72e445407f099))
* **api:** update readme ([138b98b](https://github.com/run-llama/llama-cloud-ts/commit/138b98bfcb9385143a7ef71019b2b81e0f8cc95d))


### Chores

* update SDK settings ([35e761c](https://github.com/run-llama/llama-cloud-ts/commit/35e761c5625ce624af08955435bb1feb10798bc0))
