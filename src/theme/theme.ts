import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3961F8",
      dark: "#133BD3",
      light: "#B8DDFF",
    },
    secondary: {
      main: "#0091FF",
      dark: "#00457A",
      light: "#D7EEFF",
    },
    success: {
      main: "#00D15E",
    },
    warning: {
      main: "#FF8138",
    },
    error: {
      main: "#FF3B30",
    },
    notice: {
      main: "#F7B500",
      contrastText: "#ffffff",
    },
    grey: {
      900: "#222222",
      800: "#4D4D4D",
      700: "#656565",
      600: "#797979",
      500: "#8E8E8E",
      400: "#BCBCBC",
      300: "#E4E4E4",
      200: "#EFEFEF",
      100: "#F5F5F5",
      50: "#FAFAFA",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
    h1: {
      fontWeight: 300,
      fontSize: 96,
      letterSpacing: -1.5,
      lineHeight: "112px",
    },
    h2: {
      fontWeight: 300,
      fontSize: 60,
      letterSpacing: -0.5,
      lineHeight: "72px",
    },
    h3: {
      fontWeight: 400,
      fontSize: 48,
      letterSpacing: 0,
      lineHeight: "56px",
    },
    h4: {
      fontWeight: 600,
      fontSize: 34,
      letterSpacing: 0.25,
      lineHeight: "42px",
    },
    h5: {
      fontWeight: 600,
      fontSize: 24,
      letterSpacing: 0,
      lineHeight: "32px",
    },
    h6: {
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: 0.15,
      lineHeight: "32px",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: 0.15,
      lineHeight: "28px",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: 0.1,
      lineHeight: "22px",
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 0.15,
      lineHeight: "24px",
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      letterSpacing: 0.17,
      lineHeight: "20px",
    },
    button: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.4,
      lineHeight: "24px",
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: 0.4,
      lineHeight: "20px",
    },
    overline: {
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: 1,
      lineHeight: "32px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h7" },
          style: {
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 0.15,
            lineHeight: "28px",
          },
        },
        {
          props: { variant: "buttonLarge" },
          style: {
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: 0.46,
            lineHeight: "24px",
          },
        },
        {
          props: { variant: "buttonSmall" },
          style: {
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: 0.46,
            lineHeight: "22px",
          },
        },
        {
          props: { variant: "inputLabel" },
          style: {
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: 0.15,
            lineHeight: "12px",
          },
        },
        {
          props: { variant: "helperText" },
          style: {
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: 0.4,
            lineHeight: "20px",
          },
        },
        {
          props: { variant: "inputText" },
          style: {
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: 0.15,
            lineHeight: "24px",
          },
        },
        {
          props: { variant: "tooltip" },
          style: {
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: 0,
            lineHeight: "10px",
          },
        },
        {
          props: { variant: "tableTitle" },
          style: {
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 0.1,
            lineHeight: "20px",
          },
        },
        {
          props: { variant: "tableData" },
          style: {
            fontWeight: 400,
            fontSize: 12,
            letterSpacing: 0.1,
            lineHeight: "20px",
          },
        },
      ],
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    notice: Palette["primary"];
  }
  interface PaletteOptions {
    notice?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h7: React.CSSProperties;
    buttonLarge: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    inputLabel: React.CSSProperties;
    helperText: React.CSSProperties;
    inputText: React.CSSProperties;
    tooltip: React.CSSProperties;
    tableTitle: React.CSSProperties;
    tableData: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h7?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    inputLabel?: React.CSSProperties;
    helperText?: React.CSSProperties;
    inputText?: React.CSSProperties;
    tooltip?: React.CSSProperties;
    tableTitle?: React.CSSProperties;
    tableData?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h7: true;
    buttonLarge: true;
    buttonSmall: true;
    inputLabel: true;
    helperText: true;
    inputText: true;
    tooltip: true;
    tableTitle: true;
    tableData: true;
  }
}
