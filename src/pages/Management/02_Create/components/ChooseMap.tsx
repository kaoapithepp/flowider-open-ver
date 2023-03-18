import React, { useState, useEffect } from "react";
import styled from "styled-components";

// const apiKey = "";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface ChooseMapProps {
    onLocationSelected: (lat: number, lng: number) => void;
}

const ChooseMap: React.FC<ChooseMapProps> = ({ onLocationSelected }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.onload = initMap;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initMap = () => {
        const mapOptions: google.maps.MapOptions = {
            center: { lat: 18.790034, lng: 98.9620896 },
            zoom: 16,
        };

        const map = new google.maps.Map(
            document.getElementById("map-container") as HTMLElement,
            mapOptions
        );
        setMap(map);

        const marker = new google.maps.Marker({
            position: mapOptions.center,
            map,
            draggable: true,
        });
        setMarker(marker);

        marker?.addListener("dragend", () => {
            const position = marker?.getPosition()?.toJSON?.();
            if (position) {
              const { lat, lng } = position;
              onLocationSelected(lat, lng);
            }
        });

        map.addListener("click", (event: { latLng: any }) => {
            const { latLng } = event;
            const lat = latLng.lat();
            const lng = latLng.lng();
            marker.setPosition({ lat, lng });
            onLocationSelected(lat, lng);
        });

        const geolocationButton = document.createElement("button");
        geolocationButton.classList.add("custom-map-control-button");
        geolocationButton.textContent = "Use my current location";
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(geolocationButton);

        geolocationButton.addEventListener("click", () => {
            if (navigator.permissions) {
                navigator.permissions.query({name:'geolocation'}).then((permissionStatus) => {
                    if (permissionStatus.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
                                const currentPosition = new google.maps.LatLng(latitude, longitude);
                                marker.setPosition(currentPosition);
                                map.setCenter(currentPosition);
                                onLocationSelected(latitude, longitude);
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    } else if (permissionStatus.state === 'prompt') {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
                                const currentPosition = new google.maps.LatLng(latitude, longitude);
                                marker.setPosition(currentPosition);
                                map.setCenter(currentPosition);
                                onLocationSelected(latitude, longitude);
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    } else {
                        alert("Geolocation permission has been denied. Please allow access in your browser settings.");
                    }
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    };

    return <Container id="map-container" />;
};

const Container = styled.div`
    height: 70vh;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;

    .gm-style {
        border-radius: 8px;
    }

    .custom-map-control-button {
        background-color: var(--white);
        color: var(--black);
        font-family: var(--brand-font);
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        padding: 8px 16px;
        border-radius: 24px;
        border: none;
        box-shadow: var(--shadow);
        position: absolute;
        justify-content: space-between;
        margin-bottom: 20px;
        margin-right: 10px;
        width: 60vw;
        z-index: 1;
        cursor: pointer;

        :hover{
            background-color: var(--grey-200);
        }
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) {
        height: 83vh;

        .custom-map-control-button {
            width: 50vw;
        }
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) {
        height: 80vh;

        .custom-map-control-button {
            width: 50vw;
        }
    }

    @media only screen and (min-width: 1024px) {
        height: 78vh;

        .custom-map-control-button {
            width: 25vw;
        }
    }
`;

export default ChooseMap;