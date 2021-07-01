# eriks-blue-radar

# Development

```
yarn global add @ionic/cli
git clone https://github.com/erik-smit/eriks-blue-radar
cd eriks-blue-radar
yarn
ionic build
ionic cap sync
ionic cap run android --livereload --external --public-host=192.168.18.237
```

# SVG

```
npx @svgr/cli --icon --typescript src\icons\ionic-icon-wifi-outline-eriks-blue-radar.svg > src\icons\ionic-icon-wifi-outline-eriks-blue-radar.tsx
```
when editing the .svg with inkscape, remove `shape-padding:0;`, `solid-color:#000000;` and `solid-opacity:1;` from the .svg to prevent TypeScript errors like `Object literal may only specify known properties, and 'solidOpacity' does not exist in type 'Properties<string | number, string & {}>'.`
