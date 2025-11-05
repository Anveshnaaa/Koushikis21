# How to Add Photos to Your Website

## Quick Guide

### Option 1: Local Images (Recommended)

1. **Create an `images` folder** in your project directory:
   - In your project folder (`/Users/anveshna/Desktop/Koushik`), create a new folder named `images`

2. **Add your photos to the `images` folder**:
   - Copy your photos into the `images` folder
   - Name them something simple like: `photo1.jpg`, `photo2.jpg`, etc.

3. **Update the HTML** in `card1.html`:
   ```html
   <div class="photo-item">
       <img src="images/photo1.jpg" alt="Description of photo">
   </div>
   ```
   Replace `photo1.jpg` with your actual filename.

### Option 2: Online Images (From URLs)

If your photos are already online (Instagram, Google Photos, etc.), you can use their URLs:

```html
<div class="photo-item">
    <img src="https://your-image-url-here.jpg" alt="Description">
</div>
```

## Step-by-Step Example

### For Card 1 (21 Photos):

1. Create the images folder:
   ```
   /Users/anveshna/Desktop/Koushik/images/
   ```

2. Add 21 photos to that folder:
   - photo1.jpg
   - photo2.jpg
   - photo3.jpg
   - ... (up to photo21.jpg)

3. Edit `card1.html` and add all 21 photo items:

```html
<div class="photo-gallery">
    <div class="photo-item">
        <img src="images/photo1.jpg" alt="Photo 1">
    </div>
    <div class="photo-item">
        <img src="images/photo2.jpg" alt="Photo 2">
    </div>
    <!-- Continue for all 21 photos -->
</div>
```

## Photo File Formats

Supported formats:
- `.jpg` or `.jpeg` (best for photos)
- `.png` (good for photos with transparency)
- `.webp` (modern, smaller file sizes)
- `.gif` (for animated images)

## Tips

- **File sizes**: Keep photos under 2MB each for faster loading
- **Naming**: Use simple names without spaces (use `-` or `_` instead)
- **Aspect ratios**: Photos will automatically fit in a square grid
- **Responsive**: The gallery works on all screen sizes

## For Other Cards

You can use the same photo gallery style for any card page that needs images. Just copy the `.photo-gallery` div structure!

