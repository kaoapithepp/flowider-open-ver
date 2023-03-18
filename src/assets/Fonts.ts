import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @font-face {
        font-family: "IBM Plex Sans Thai";
        font-style: normal;
        font-weight: 200;
        src: url("/fonts/IBMPlexSansThai-ExtraLight.ttf") format("truetype");
    }
    @font-face {
        font-family: "IBM Plex Sans Thai";
        font-style: normal;
        font-weight: 300;
        src: url("/fonts/IBMPlexSansThai-Light.ttf") format("truetype");
    }
    @font-face {
        font-family: "IBM Plex Sans Thai";
        font-style: normal;
        font-weight: 400;
        src: url("/fonts/IBMPlexSansThai-Regular.ttf") format("truetype");
    }
    @font-face {
        font-family: "IBM Plex Sans Thai";
        font-style: normal;
        font-weight: 500;
        src: url("/fonts/IBMPlexSansThai-Medium.ttf") format("truetype");
    }
    @font-face {
        font-family: "IBM Plex Sans Thai";
        font-style: normal;
        font-weight: 600;
        src: url("/fonts/IBMPlexSansThai-SemiBold.ttf") format("truetype");
    }
`;