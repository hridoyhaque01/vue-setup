<template>
  <div>
    <div id="pdf-content">
      <h1>hellow world</h1>
    </div>
    <button @click="downloadPDF">Download PDF</button>
  </div>
</template>

<script>
import jsPDF from "jspdf";

export default {
  methods: {
    downloadPDF() {
      const doc = new jsPDF();

      doc.html(document.getElementById("pdf-content"), {
        callback: function (pdf) {
          try {
            pdf.save("myfile.pdf");
          } catch (error) {
            console.error("Error saving PDF:", error);
            // Handle the error, e.g., display a message to the user
          }
        },
      });
    },
  },
};
</script>

<style scoped></style>
