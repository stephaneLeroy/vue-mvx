export default {
    width: 300,
    height: 300,
    image: "/vue-erdjs/elrond-logo.png",
    data: "https://elrondtrees.com",
    type: 'svg',
    margin: 0,
    qrOptions: {
        typeNumber: "0",
        mode: "Byte",
        errorCorrectionLevel: "Q"
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.35,
        margin: 0
    },
    dotsOptions: {
        type: "classy-rounded",
        color: "#3217B5"
    },
    backgroundOptions: {
        color: "#ffffff"
    },
    dotsOptionsHelper: {
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: "0"
        }
    },
    cornersSquareOptions: {
        type: "extra-rounded",
        color: "#3217B5"
    },
    cornersSquareOptionsHelper: {
        color: "#3217B5"
    },
    cornersDotOptions: {
        type: "",
        color: "#3217B5"
    },
    cornersDotOptionsHelper: {
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0"
        }
    },
    backgroundOptionsHelper: {
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#ffffff",
            color2: "#ffffff",
            rotation: "0"
        }
    }
}
