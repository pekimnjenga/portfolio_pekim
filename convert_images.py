import os
from PIL import Image

def convert_to_webp(directory="app/static/images"):
    """
    Iterates through the specified directory and converts all JPG/PNG images to WebP.
    Requires: pip install Pillow
    """
    if not os.path.exists(directory):
        print(f"Directory {directory} not found.")
        return

    for filename in os.listdir(directory):
        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            path = os.path.join(directory, filename)
            img = Image.open(path)
            
            # Define the new filename
            name = os.path.splitext(filename)[0]
            webp_path = os.path.join(directory, f"{name}.webp")
            
            # Save as WebP with optimization settings
            # quality=75 is the industry standard for web optimization
            # method=6 provides the slowest compression but best quality/size ratio
            img.save(webp_path, "WEBP", quality=75, method=4, lossless=False)
            print(f"Converted: {filename} -> {name}.webp")

if __name__ == "__main__":
    # Derive the target directory relative to this script's location.
    # This ensures it works on Windows, WSL, and Linux without modification.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_dir = os.path.join(script_dir, "app", "static", "images")
    convert_to_webp(target_dir)
    print("Conversion complete. Remember to update your HTML <img> tags to point to the .webp files!")