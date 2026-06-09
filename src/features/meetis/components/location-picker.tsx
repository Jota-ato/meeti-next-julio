import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from 'leaflet';
import type { Marker as TMarker, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FieldWLabel } from '@/shared/components/forms/field-w-label';
import type { UseFormRegister, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type { MeetiType } from '../schemas/meeti-schema';

function CenterMap({ coordinates }: { coordinates: LatLngTuple }) {
    const map = useMap()
    useEffect(() => {
        map.setView([coordinates[0], coordinates[1]]);
    }, [coordinates, map]);
    return null;
}

type LocationPickerProps = {
    register: UseFormRegister<MeetiType>
    getValues: UseFormGetValues<MeetiType>
    setValue: UseFormSetValue<MeetiType>
}

export default function LocationPicker({ register, getValues, setValue }: LocationPickerProps) {

    const [coordinates, setCoordinates] = useState<LatLngTuple>([
        getValues('location.lat'),
        getValues('location.lng'),
    ]);

    const markerIcon = useMemo(() => new Icon({
        iconUrl: "/img/marker-icon.png",
        shadowUrl: "/img/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    }), [])

    const markerRef = useRef<TMarker>(null);
    const ZOOM = 16;
    const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=ES&location=";

    const reverseGeocoding = useCallback(async (positionTuple: LatLngTuple) => {
        const url = GEOCODE_URL + `${positionTuple[1]},${positionTuple[0]}`
        const data = await (await fetch(url)).json()

        setValue('location.address', data.address.Match_addr, { shouldValidate: true })
        setValue('location.city', data.address.City, { shouldValidate: true })
        setValue('location.country', data.address.CountryCode, { shouldValidate: true })
        setValue('location.lat', positionTuple[0], { shouldValidate: true })
        setValue('location.lng', positionTuple[1], { shouldValidate: true })
        console.log(getValues());
    }, [setValue, getValues])

    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker !== null) {
                const latLng = marker.getLatLng();
                const positionTuple: LatLngTuple = [latLng.lat, latLng.lng];
                setCoordinates(positionTuple);
                reverseGeocoding(positionTuple)
            }
        },
    }), [reverseGeocoding]);

    return (
        <>
            <MapContainer
                key="meeti-location-picker"
                center={coordinates}
                zoom={ZOOM}
                scrollWheelZoom={true}
                className='h-96 w-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={true}
                    position={coordinates}
                    icon={markerIcon}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                >
                    <Popup>Dirección aquí</Popup>
                </Marker>
                <CenterMap coordinates={coordinates} />
            </MapContainer>

            <FieldWLabel
                label="Dirección:"
                id="location.address"
                type="text"
                placeholder="Dirección Evento"
                className="disabled:opacity-50"
                disabled
                {...register('location.address')}  // ← registrado en el form
            />
        </>
    )
}