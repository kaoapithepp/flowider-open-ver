import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --background-color: #FFFFFF;
        --primary: #DF4646;
        --secondary: #EC9090;
        --pale-red: #FFCDD2;
        --dark-red: #CC1414;
        --pale-dark-red: #d16b6b;
        --button-color: #DF4646; // Button color
        --disabled: #DE5858; // disabled
        --hover: #A11F1F;

        --white: #FFFEFF;
        --pure-white: #FFFFFF;

        --green: #008000;
        --blue: #0047ab;
        --brown: #AF6D37;
        
        --black: #000000; // Everything which is black
        --pale-black: #9e9e9e;

        --red-notion: #FCD6D5;
        --purple-notion: #E1D2F8;
        --pink-notion: #FBD3E9;
        --green-notion: #CDE7E2;
        --yellow-notion: #F9EED7;
        --blue-notion: #A3BCF7;

        --form-grey: #B6B6B6; // Form placeholder, border
        --error: #FE0044; // Error red

        --grey-100: #f5f5f5;
        --grey-200: #EEEEEE;
        --grey-300: #E0E0E0;
        --grey-400: #BDBDBD; 
        --grey-600: #757575;
        --grey-800: #424242;
        --grey-900: #333333;

        --shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        --pop-shadow: 0px 10px 40px rgba(0, 0, 0, 0.5);

        --brand-font: "IBM Plex Sans Thai", sans-serif;
    }
`;