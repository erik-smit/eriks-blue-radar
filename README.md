# eriks-blue-radar

# Development

```
npm i -g @ionic/cli

git clone https://github.com/erik-smit/eriks-blue-radar
cd eriks-blue-radar
npm install --omit=optional

set PATH=c:\temp\jdk-17.0.2\bin;%PATH%
set ANDROID_SDK_ROOT=c:\users\erik.smit\AppData\local\Android\Sdk
ionic build
ionic cap sync
ionic cap run android --livereload --external --public-host=192.168.18.237
```

# SVG

```
npx @svgr/cli --icon --typescript src\icons\ionic-icon-wifi-outline-eriks-blue-radar.svg > src\icons\ionic-icon-wifi-outline-eriks-blue-radar.tsx
```
when editing the .svg with inkscape, remove `shape-padding:0;`, `solid-color:#000000;` and `solid-opacity:1;` from the .svg to prevent TypeScript errors like `Object literal may only specify known properties, and 'solidOpacity' does not exist in type 'Properties<string | number, string & {}>'.`
