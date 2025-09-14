<template>
  <div>
    <div>
      <qrcode-stream
        :constraints="selectedConstraints"
        :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
        @camera-on="onCameraReady" />
    </div>
    <p class="font-bold text-error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { QrcodeStream } from "vue-qrcode-reader";

  /*** detection handling ***/

  const result = ref("");

  const props = defineProps({
    onReadCallback: {
      type: Function,
      required: false,
      default: () => {},
    },
  });

  watch(result, (result) => {
    result = JSON.parse(result);
    props.onReadCallback(result[0]);
  });

  function onDetect(detectedCodes) {
    console.log(detectedCodes);
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
  }

  /*** select camera ***/

  const selectedConstraints = ref({ facingMode: "environment" });
  const defaultConstraintOptions = [
    { label: "rear camera", constraints: { facingMode: "environment" } },
    { label: "front camera", constraints: { facingMode: "user" } },
  ];
  const constraintOptions = ref(defaultConstraintOptions);

  async function onCameraReady() {
    // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
    // camera access permission. `QrcodeStream` internally takes care of
    // requesting the permissions. The `camera-on` event should guarantee that this
    // has happened.
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label} (ID: ${deviceId})`,
        constraints: { deviceId },
      })),
    ];

    error.value = "";
  }

  /*** track functons ***/

  function paintOutline(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

      ctx.strokeStyle = "red";

      ctx.beginPath();
      ctx.moveTo(firstPoint.x, firstPoint.y);
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y);
      }
      ctx.lineTo(firstPoint.x, firstPoint.y);
      ctx.closePath();
      ctx.stroke();
    }
  }
  function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height },
      } = detectedCode;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#007bff";
      ctx.strokeRect(x, y, width, height);
    }
  }
  function paintCenterText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
      const { boundingBox, rawValue } = detectedCode;

      const centerX = boundingBox.x + boundingBox.width / 2;
      const centerY = boundingBox.y + boundingBox.height / 2;

      const fontSize = Math.max(
        12,
        (50 * boundingBox.width) / ctx.canvas.width
      );

      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#35495e";
      ctx.strokeText(detectedCode.rawValue, centerX, centerY);

      ctx.fillStyle = "#5cb984";
      ctx.fillText(rawValue, centerX, centerY);
    }
  }
  const trackFunctionOptions = [
    { text: "nothing (default)", value: undefined },
    { text: "outline", value: paintOutline },
    { text: "centered text", value: paintCenterText },
    { text: "bounding box", value: paintBoundingBox },
  ];
  const trackFunctionSelected = ref(trackFunctionOptions[1]);

  /*** barcode formats ***/

  const barcodeFormats = ref({
    aztec: false,
    code_128: false,
    code_39: false,
    code_93: false,
    codabar: false,
    databar: false,
    databar_expanded: false,
    data_matrix: false,
    dx_film_edge: false,
    ean_13: false,
    ean_8: false,
    itf: false,
    maxi_code: false,
    micro_qr_code: false,
    pdf417: false,
    qr_code: true,
    rm_qr_code: false,
    upc_a: false,
    upc_e: false,
    linear_codes: false,
    matrix_codes: false,
  });
  const selectedBarcodeFormats = computed(() => {
    return Object.keys(barcodeFormats.value).filter(
      (format) => barcodeFormats.value[format]
    );
  });

  /*** error handling ***/

  const errorMessages = {
    NotAllowedError: "you need to grant camera access permission",
    NotFoundError: "no camera on this device",
    NotSupportedError: "secure context required (HTTPS, localhost)",
    NotReadableError: "is the camera already in use?",
    OverconstrainedError: "installed cameras are not suitable",
    StreamApiNotSupportedError: "Stream API is not supported in this browser",
    InsecureContextError:
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.",
  };

  const error = ref("");

  function onError(err) {
    error.value = `[${err.name}]: `;
    error.value += errorMessages[err.name] ?? "Unkown error";
  }
</script>
