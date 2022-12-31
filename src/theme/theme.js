import { extendTheme } from "native-base";
export const myColors = {
    "primary": {
        "900": "#1f1f1f",
        "800": "#252525",
        "700": "#3d3d3d",
        "500": "#525252",
        "300": "#5c5c5c",
        "100": "#666666",
    },
    "secondary": {
        "900": "#ffffff",
        "800": "#f5f5f5",
        "700": "#ebebeb",
        "500": "#e0e0e0",
        "300": "#cccccc",
        "100": "#b8b8b8",
    },
    "danger": {
        "900": "#660000",
        "700": "#a30000",
        "500": "#cc0000",
    },
    "warning": {
        "900": "#fc0",
        "700": "#f5c400",
        "500": "#cca300",
    },
}
export default theme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: "Roboto-Light",
                italic: "Roboto-LightItalic",
            },
            200: {
                normal: "Roboto-Light",
                italic: "Roboto-LightItalic",
            },
            300: {
                normal: "Roboto-Light",
                italic: "Roboto-LightItalic",
            },
            400: {
                normal: "Roboto-Regular",
                italic: "Roboto-Italic",
            },
            500: {
                normal: "Roboto-Medium",
            },
            600: {
                normal: "Roboto-Medium",
                italic: "Roboto-MediumItalic",
            },
        },
        Montserrat: {
            600: {
                normal: 'Montserrat-Medium',
            },
        },

        Lacquer: {
            400: {
                normal: 'Lacquer-Regular',
            }
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "Roboto",
        body: "Roboto",
        mono: "Roboto",
        text: "Montserrat",
        Lacquer: "Lacquer"
    },

    components: {
        Center: {
            baseStyle: ({ colorMode }) => {
                return {
                    bg: colorMode === 'dark' ? myColors.primary["800"] : myColors.secondary["900"],
                }
            },
            defaultProps: {
                justifyContent: "center",
                alignItems: "center",
            }
        },
        View: {
            baseStyle: ({ colorMode }) => {
                return {
                    bg: colorMode === 'dark' ? myColors.primary["800"] : myColors.secondary["800"],
                }
            },
        },
        // Button: {
        //     // Can simply pass default props to change default behaviour of components.
        //     baseStyle: {
        //         rounded: 'md',
        //     },
        //     defaultProps: {
        //         colorScheme: 'red',
        //     },
        // },
        Heading: {
            // Can pass also function, giving you access theming tools
            baseStyle: ({ colorMode }) => {
                return {
                    //     _light: { color: myColors.primary["700"] },
                    //     _dark: { color: myColors.secondary["100"] },
                    color: colorMode === 'dark' ? myColors.secondary["100"] : myColors.primary["700"],
                    fontWeight: 'normal',
                };
            },
            defaultProps: {
                size: "xl",
                fontFamily: "Lacquer"
            }
        },
        Text: {
            // Can pass also function, giving you access theming tools
            baseStyle: ({ colorMode }) => {
                return {
                    //     _light: { color: myColors.primary["700"] },
                    //     _dark: { color: myColors.secondary["100"] },
                    color: colorMode === 'dark' ? myColors.secondary["100"] : myColors.primary["700"],
                    fontWeight: 'normal',
                };
            },
            defaultProps: {
                // size: "14",
                fontFamily: "Lacquer"
            }
        },
        Input: {
            baseStyle: ({ colorMode }) => {
                return {                  
                    backgroundColor:  colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["500"] ,
                    fontWeight: 'normal',
                    _focus:{
                        borderWidth:1,
                        borderColor: colorMode === 'dark'  ? myColors.danger["700"] : myColors.secondary["500"],
                        backgroundColor:colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["700"]
                    },
                    _input:{
                        selectionColor:colorMode === 'dark' ?myColors.secondary["900"] : myColors.primary["700"],
                    }
                };
            },
            defaultProps: {
                fontFamily: "Lacquer",
                borderWidth:1,
            }
        }
    },
});
