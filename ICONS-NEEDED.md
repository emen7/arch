# PWA Icons Needed

The bluecircle.jpg needs to be converted to PNG and resized to these dimensions:

## Required Icons:
1. **icon-192.png** - 192x192 pixels (Android)
2. **icon-512.png** - 512x512 pixels (Android, splash screen)
3. **favicon.ico** - 32x32 pixels (browser tab)
4. **apple-touch-icon.png** - 180x180 pixels (iOS home screen)

## Source File:
`public/images/bluecircle.jpg`

## Options to Generate:

### Option 1: Online Tool
Use https://realfavicongenerator.net/
- Upload bluecircle.jpg
- Download the generated icon pack
- Place files in /public/ directory

### Option 2: PWA Asset Generator
```bash
npx pwa-asset-generator public/images/bluecircle.jpg public --icon-only
```

### Option 3: Manual (using image editor)
- Convert JPG to PNG with transparency
- Resize to each required size
- Save with exact filenames above

## Temporary Workaround:
The app will work without icons, but browsers won't show install prompt properly until icons are added.

Once icons are generated, delete this file.
