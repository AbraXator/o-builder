import { MapContainer, ImageOverlay, useMapEvent, Marker, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import Notification from './Notification';
import ConfirmationModal from './ConfirmationModal';

const imageUrl = '/maps/mapa.png';
const imageBounds = [[0, 0], [595, 842]];
const controlIcon = L.icon({
  iconUrl: '/symbols/control.png',
  iconSize: [256, 256],
  iconAnchor: [128, 128]
});

function ControlPlacer({ onPlace }) {
  useMapEvent({
    click(e) {
      const { lat, lng } = e.latlng;
      onPlace([lat, lng]);
    },
  });
}

function MapClickHandler({ controlState, setControlState }) {
  useMapEvent('click', () => {
    if (controlState.mode === 'selecting') {
      setControlState((prev) => ({ ...prev, selectedControl: undefined }));
    }
  });
  return null;
}

function CheckMarkers({ controlState, setControlState }) {
  const map = useMap();
  useMapEvent('click', () => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        console.log(layer.getElement);
      }
    });
  });
  return (
    <></>
  )
}

function ZoomAwareIcon({ index, controlState, setControlState, sortedControls }) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const control = sortedControls[index];
  //if(sortedControls.some((c) => c.type === "start")) index = index - 1
  useEffect(() => {
    const onZoom = () => {
      setZoom(map.getZoom());
    };

    map.on('zoom', onZoom);

    return () => {
      map.off('zoom', onZoom);
    }
  }, [map]);

  //const size = Math.max(24, 48 - (36 - zoom) * 4);
  const size = 32;

  const isControlSelected = controlState.selectedControl === index;
  //const size = 32;
  const startIcon = L.divIcon({
    className: '',
    html: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23.84 20.65"
      fill="none"
      className="w-6 h-6"
      style="pointer-events: none;"
    >
      <polygon
        points="1.73 19.65 11.92 2 22.11 19.65 1.73 19.65"
        stroke=${isControlSelected ? "#6a32ed" : "#ed3288"}
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </svg
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
  const controlIcon = L.divIcon({
    className: '',
    html: `
    <div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        style="pointer-events: none;"
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke=${isControlSelected ? "#6a32ed" : "#ed3288"}
          strokeMiterlimit="10"
          strokeWidth="3"
        />
      </svg>
      <h1 style="color: ${isControlSelected ? "#6a32ed" : "#ed3288"}; font-size: 2em"]">${index}</h1>
    </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
  const finishIcon = L.divIcon({
    className: '',
    html: `
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          style="pointer-events: none;"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke=${isControlSelected ? "#6a32ed" : "#ed3288"}
            strokeMiterlimit="10"
            strokeWidth="3"
          />
          <circle
            cx="12"
            cy="12"
            r="7"
            stroke=${isControlSelected ? "#6a32ed" : "#ed3288"}
            strokeMiterlimit="10"
            strokeWidth="3"
          />
        </svg>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  return (
    <Marker
      position={control.coords}
      icon={control.type === 'start' ? startIcon : control.type === 'control' ? controlIcon : finishIcon}
      interactive={controlState.mode !== 'placing'}
      eventHandlers={{
        click: () => {
          if (controlState.mode !== 'selecting') return;
          setControlState((prev) => ({ ...prev, selectedControl: index }));
        },
      }}
    />
  );
}

function getTrimRadius(control, zoom) {
  const pixelRadius = 32 / 2;
  const map = useMap();
  const scale = map.getZoomScale(zoom, 0);

  if (control.type === 'start') {
    const triPixelRadius = 10.325; // center to tip
    const triScale = 32 / 23.84;
    return (triPixelRadius / triScale) / scale;
  }

  return pixelRadius / scale; // normal circle
}

function ControlLines({ sortedControls }: {sortedControls: Control[]}) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const onZoom = () => {
      setZoom(map.getZoom());
    };

    map.on('zoom', onZoom);

    return () => {
      map.off('zoom', onZoom);
    }
  }, [map]);
  let linesList = [];
  //const pixelRadius = Math.max(24, 48 - (36 - zoom) * 4) / 2;

  const scale = map.getZoomScale(map.getZoom(), 0);
  for (let i = 0; i < sortedControls.length - 1; i++) {
    let list: [number, number][] = [];
    const currentControl = sortedControls[i];
    const nextControl = sortedControls[i + 1];

    if (currentControl.coords[0] === nextControl.coords[0] &&
      currentControl.coords[1] === nextControl.coords[1]) {
      continue; // skip drawing
    }


    const r1 = getTrimRadius(currentControl, zoom);
    const r2 = getTrimRadius(nextControl, zoom);
    if (nextControl !== null) {
      let dx = nextControl.coords[0] - currentControl.coords[0];
      let dy = nextControl.coords[1] - currentControl.coords[1]
      let lenght = Math.sqrt(dx * dx + dy * dy);
      if(lenght < 12) continue;
      let unitX = dx / lenght;
      let unitY = dy / lenght;
      let newAx = currentControl.coords[0] + unitX * r1
      let newAy = currentControl.coords[1] + unitY * r1
      let newBx = nextControl.coords[0] - unitX * r2;
      let newBy = nextControl.coords[1] - unitY * r2;
      list.push([newAx, newAy]);
      list.push([newBx, newBy]);
    }

    linesList.push(<Polyline key={`${i}-${list[0]}`} positions={list} color='#c01a6e' weight={1} smoothFactor={1} />);
  }
  return (
    <>
      {linesList}
    </>
  );
}

function StoreMapInstance() {
  const map = useMap();

  useEffect(() => {
    window.mapView = map;
  }, [map])

  return null;
}

export default function MapView({ controlState, setControlState, currentCourse, setCurrentCourse, notificationState, setNotificationState }) {
  const handleAddControl = (position) => {
    if (controlState.mode !== 'placing') return;

    if (controlState.selectedItemType === 'start' && currentCourse.controls.some(c => c.type === 'start')) {
      setNotificationState({
        show: true,
        message: 'Only one start control can be placed.',
        type: "error"
      });
      return;
    }

    if (controlState.selectedItemType === 'finish' && currentCourse.controls.some(c => c.type === 'finish')) {
      setNotificationState({
        show: true,
        message: 'Only one finish control can be placed.',
        type: "error"
      });
      return;
    }

    setCurrentCourse((prev) => ({
      ...prev,
      controls: [...prev.controls, { type: controlState.selectedItemType, coords: position }],
    }));
  };

  const sortedControls: Control[] = [
    ...currentCourse.controls.filter((c: Control) => c.type === 'start'),
    ...currentCourse.controls.filter((c: Control) => c.type === 'control'),
    ...currentCourse.controls.filter((c: Control) => c.type === 'finish')
  ]

  return (
    <div className='w-full h-full' id="map-container">
      <div style={{ backgroundColor: '#f56565', width: '40px', height: '40px', position: 'absolute', top: '40px', left: '40px', zIndex: 9999 }}></div>
      <MapContainer
        center={[500, 500]}
        zoom={0}
        crs={L.CRS.EPSG3857}
        className="w-full h-full"
      >
        <StoreMapInstance />
        <ImageOverlay url={currentCourse.map} bounds={imageBounds} className='cursor-default'/>
        <ControlPlacer onPlace={handleAddControl} />
        <CheckMarkers controlState={controlState} setControlState={setControlState} />
        <MapClickHandler controlState={controlState} setControlState={setControlState} />
        {sortedControls.map(({ coords }, index) => (
          <ZoomAwareIcon key={`${index}-${controlState.mode}`} index={index} controlState={controlState} setControlState={setControlState} sortedControls={sortedControls} />
        ))}
        <ControlLines sortedControls={sortedControls} />

      </MapContainer>
    </div>
  );
}
