import html2canvas from 'html2canvas';
import { map } from 'leaflet';
import { useState } from 'react';

export function ExportDialog() {
  const [exportOptions, setExportOptions] = useState({
    orientation: "",
    filetype: ""
  })

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Image size: <input name="Image size" type=''></input>
          </label>
        </form>
      </div>
    </div>
  )
}

export async function exportAsImage({ courseToExport, width = 842, height = 595, filetype = "png", paperSize = "A4", scale = 4000, dpi = 300 } = {}) {
  const paperSizes = {
    A4: {widthCm: 21, heightCm: 29.7 },
    A5: {widthCm: 14.8, heightCm: 21 },
  }
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  const controls = document.querySelectorAll('.leaflet-control')
  const oldDisplay = [];
  controls.forEach((c, i) => {
    oldDisplay[i] = c.style.display;
    c.style.display = 'none';
  })

  const map = window['map'];
  const originalWidth = mapContainer.style.width;
  const originalHeight = mapContainer.style.height;
  const originalZoom = map.getZoom();
  
  const pixelsPerCm = dpi / 2.54;
  const pixelsPerMeter = pixelsPerCm * 100 / scale;

  const widthPx = Math.round(width * pixelsPerMeter);
  const heightPx = Math.round(height * pixelsPerMeter);

  mapContainer.style.width = `${widthPx}px`;
  mapContainer.style.height = `${heightPx}px`;

  //const { width: imageWidth, height: imageHeight } = await getBase64ImageDimensions(courseToExport.map);
  //const zoomX = Math.log2(width / imageWidth);
  //const zoomY = Math.log2(height / imageHeight);
  //const zoom = Math.min(zoomX, zoomY);

  map.invalidateSize();
  map.once('moveend', () => {
    setTimeout(() => {
      html2canvas(mapContainer).then((canvas) => {
        mapContainer.style.width = originalWidth;
        mapContainer.style.height = originalHeight;

        controls.forEach((c, i) => {
          c.style.display = oldDisplay[i];
        })

        //map.setZoom(originalZoom);

        const link = document.createElement('a');
        link.download = `course-export.${filetype}`;
        link.href = canvas.toDataURL(`image/${filetype}`);
        link.click();
      });
    }, 1000)
  })

  map.setZoom(originalZoom);
}
