# eriks-blue-radar

# Development

```
npm install -g @ionic/cli
git clone https://github.com/erik-smit/eriks-blue-radar
cd eriks-blue-radar
npm install
ionic build
ionic cap sync
ionic cap run android --livereload --external --public-host=192.168.18.237
```

# SVG

```
npx @svgr/cli --icon --typescript src\icons\ionic-icon-wifi-outline-eriks-blue-radar.svg > src\icons\ionic-icon-wifi-outline-eriks-blue-radar.tsx
```
manually add id="dot", id="bar-1", id="bar-2", id="bar-3" to paths after conversion