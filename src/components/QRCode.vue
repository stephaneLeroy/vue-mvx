<template>
    <div v-if="qrcodeSvg" v-html="qrcodeSvg"></div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    name: 'QrCode',
    data () {
        return {
            qrcodeSvg: null,
        }
    },
    props: ['qrcode'],
    watch: {
        qrcode: {
            handler: function(content) {
                QRCode.toString(content, {
                    type: "svg",
                }).then((svg) => {
                    this.qrcodeSvg = svg;
                });
            }
        },
    }
}
</script>
