import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body {
        color: var(--black);
        /* background: none; */
        background-color: var(--background-color);
        
        display: flex;
        flex-direction: column;
        
        margin: 0;
        padding: 0;
        min-height: 100vh;
        
        font-family: 'IBM Plex Sans Thai', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;

        overscroll-behavior: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1,
    h2,
    h3,
    h4,
    p,
    span,
    a {
        margin: 0;
    }

    a {
        color: var(--black);
        font-weight: 500;
        text-decoration: underline;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    input[type="file"]{
        display: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    ::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
`;