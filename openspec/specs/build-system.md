# Build System

## Scripts

### Development
- `npm run dev` - Build dev + start
- `npm run watch` - Nodemon + build + start
- `npm run build-dev` - Clean + webpack-dev + ln:buildjs

### Production
- `npm run build` - Clean + webpack prod
- `npm run zip` - Build + fusion zip (for deployment)

### Custom LN Scripts
- `npm run ln:copycss` - Copy @ln libs CSS files
- `npm run ln:buildjs` - Run esbuild scripts

## Build Process

1. `clean` - Remove resources/dist/
2. `webpack` - Bundle with config/webpack.config.js
3. `ln:buildjs` - Process scripts with esbuild
4. `ln:copycss` - Copy library styles (runs on postinstall)

## Output
- Built assets: `resources/dist/`
- Fusion bundle: `.fusion/dist/`

## Important
- Always run `npm run build-dev` before testing locally
- Use `npm run test` to verify changes
- DO NOT commit `resources/dist/` or `.fusion/dist/`
